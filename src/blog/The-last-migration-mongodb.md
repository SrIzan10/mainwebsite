---
id: 2
title: My tales of MongoDB migration
description: Here I ramble about the last service migration I did, MongoDB, and all the difficulties that came with it.
date: 12/11/2023
---

# The last service migration: MongoDB

## Introduction

So, the last few months I've been migrating services from my good old Raspberry Pi into my new HP server and the last service I migrated was MongoDB.

I've been using MongoDB for a while now and I've been using it for a few things, like my discord bots, [webhooks-ui](https://github.com/SrIzan10/webhooks-ui) and probably other projects I don't remember right now.

So, let's get started!

## Testing the plan

My database instance is on Docker with a replica set of 1 node (itself) so [Prisma](https://www.prisma.io/) works.

My idea is to add the HP server as a secondary replica and then promote it to be the primary one, but I don't know if that will work, so we need to test some stuff.

I first created 2 docker containers on my [main `Ryzen` machine](https://gist.github.com/SrIzan10/50bc2ba689a4cc43bcbac2799cc733c9)'s WSL Ubuntu instance.

I created a `docker-compose.yml` file with the following content:

```yml
version: "3.8"
services:
  mongo1:
    image: mongo:4.4.17-rc0-focal
    container_name: mongo1
    restart: always
    ports:
      - 27017:27017
    volumes:
      - ./mongo1:/data/db
    command: mongod --replSet mongoset
    networks:
      - mongo
  mongo2:
    image: mongo:4.4.17-rc0-focal
    container_name: mongo2
    restart: always
    ports:
      - 27018:27017
    volumes:
      - ./mongo2:/data/db
    command: mongod --replSet mongoset
    networks:
      - mongo
networks:
  mongo:
```

and ran it with `docker compose up -d`.

I went to connect with MongoDB Compass and it didn't work for some reason. I asked GPT and nothing. It looks like it accepted the connection but it won't connect, so I installed `mongosh` and tried to connect with that.

```bash
$ mongosh mongodb://localhost:27017
```
...and it worked! That didn't make any sense, but okay, we can work with it.

I then connected to the `mongo1` instance and ran the following commands:

```bash
> rs.initiate()
```
and it worked, but only that same database connected. Before adding the second database to the replica, I went ahead and pinged it from the first container (just to check if the network configuration worked):

```bash
docker exec mongo1 sh -c "rm /bin/ping;apt update;apt install inetutils-ping -y;ping mongo2"
```

I removed /bin/ping because I tried to transfer the binary from WSL to the container but it still needed some libraries and I didn't want to bother, so I just installed the package.

It worked, so I went ahead and added the second database to the replica set:

```bash
> rs.add("mongo2")
```

After waiting for it, the second database connected and everything was working fine. Let's create a collection and some documents on the primary replica (mongo1):

```bash
> use test
> db.createCollection("test")
> db.test.insertOne({ name: "test" })
```

and then, let's check if it's on the second replica (mongo2):

```bash
$ mongosh mongodb://localhost:27017
```

```bash
> use test
> db.getMongo().setReadPref("secondaryPreferred")
> db.test.find()
```
and, yeah, that worked.

I don't really know if ORMs will read when connecting to the second replica, but for now it's fine as the main plan is on track.  
So, to promote I connected to the primary replica (mongo1) and ran the following command:

```bash
> rs.stepDown()
```
And that worked! Woo! The second replica is now the primary one. We can now start *drum rolls please*:

## The migration

This is it. We're doing it.

I went ahead and created a new docker-compose file on my server with the following content:

```yml
version: "3.8"
services:
    mongo:
        image: mongo:4.4.17-rc0-focal
        container_name: mongodb
        restart: unless-stopped
        ports:
            - 27017:27017
        volumes:
            - ./mongo:/data/db
        command: mongod --replSet rs0
```
After deploying the stack, I connected using mongosh to the primary db and ran the following command:
```bash
> rs.add("ip")
```
and after waiting for a while it looked like it worked. I then connected to the new database and ran the following command to check if the replica cloned fine:
```bash
> db.getMongo().setReadPref("secondaryPreferred")
```
and let's just let the results speak for themselves:
```bash
rs0 [direct: secondary] test> show dbs
# author's note: some dbs are redacted for privacy reasons 
admin         80.00 KiB
api           80.00 KiB
ava           40.00 KiB
bask         168.00 KiB
config       144.00 KiB
local        348.00 KiB
vinci        428.00 KiB
rs0 [direct: secondary] test> use vinci
switched to db vinci
rs0 [direct: secondary] vinci> show tables
afk
birthdays
chatgpt
giveaways-enters
giveaways-message
padyama
suggestions
twitter
warns
youtube
rs0 [direct: secondary] vinci> db.afk.find()
[
  {
    _id: ObjectId("sadfsad fsadfsdf"),
    id: 'redacted',
    reason: 'redacted',
    __v: 0
  },
  {
    _id: ObjectId("asdfsadfadf"),
    id: 'redacted',
    reason: 'readacted',
    __v: 0
  }
]
rs0 [direct: secondary] vinci>
```
Nice. let's now try to write something to the database from Vinci:  
![](https://img.srizan.dev/Discord_a2iXkWYxwn.png)  
That just worked and we can see it on the secondary replica:
```bash
rs0 [direct: secondary] vinci> db.afk.find({ id: '703974042700611634' })
[
  {
    _id: ObjectId("6550eccc6154a8c9030fe76a"),
    id: '703974042700611634',
    reason: 'test',
    __v: 0
  }
]
```

Let's now edit all .envs and change the database url to the new secondary one. For this I checked all dbs that I have and then go from top to bottom editing the secrets.

After that was done I needed to deploy all changes. I went ahead and created too many tabs on my terminal and ran the all deployment commands on each tab. At the same time.  
I really hope that doesn't make my server run out of ram, because I'm really short on that.

After executing all the commands I `rs.stepDown()`'ed the primary Raspberry Pi replica and, as expected, the HP Server took over.

The last command of the day:
```bash
> rs.remove("ip")
```

...SIKE! I needed to check the logs of the containers to see if everything was working fine. The `api` and `vinci` to be exact.  
This is because `api` runs Prisma and `vinci` runs the now defunct in my stack, [mongoose](https://mongoosejs.com/).

Luckily enough, both were fine, so I was free. Yay!

## Conclusion

Welp, that was a lot of work. I'm glad it's over. I got my HP server on July and it's now November and I just finished migrating.  
Could I have done it in less time? Yes.  
Was I lazy? Also yes.

So that answers all your questions.

I hope you enjoyed this my first blog post, and thankfully it was a big one.  
This took 3 hours in total, but at the end of the day, it was worth it.

I'll see you in the next one!