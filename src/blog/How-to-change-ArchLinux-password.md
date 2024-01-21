---
id: 3
title: How to change the user password in Arch if you forgot it
description: This post was made for a certain person who loves to lose passwords
date: 2023-11-23T00:00:00Z
---

Alright, let's do this. Fast.  
Disclaimer: this only works when the /home directory is on the same partition, which is the default option if you don't specify.

# Step 1: Boot up a live environment.

For the sake of simplicity, I'll be using the Endeavour OS Galileo installation media, but [any linux distro should work](https://command-not-found.com/arch-chroot)

When you're in, open the terminal:  
![](https://img.srizan.dev/vmware_zCwt9ac9KE.png)

# Step 2: Mounting the linux distro

Type in `lsblk`. This will show all mounted drives.  
![](https://img.srizan.dev/vmware_LPBNlTo9BI.png)

Locate the drive and partition where your installation is.  
It's usually the partition with the most space. The space is on the size row (duh)  
If you have multiple drives with the same size and want more info about the volumes, type in `fdisk -l`.

In my case it's `/dev/sda1`.

So let's mount the partition to the `/mnt` directory with `sudo mount /dev/sda1 /mnt`.  

# Step 3: Chrootin'

Chroot is a linux tool which basically changes the root directory to whatever directory you specify. This will be used to run the `passwd` command inside your installation's context.

Arch Linux has it's own chroot command which does some magic in the background to make it useable on this distro's environments.

```sh
sudo arch-chroot /mnt
```
should chroot into your installation and after a few seconds a shell will show up!  
![](https://img.srizan.dev/vmware_nyyqOA9ELo.png)

And now one last command, the one that actually changes the password:

```sh
passwd yourusername
```

and boom! that's it! impressive, right? `exit` off the console and then reboot.

# The end

That was quick.