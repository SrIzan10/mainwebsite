---
title: Releasing sern Automata v2
description: ""
date: 2024-05-08T18:46:01.405Z
preview: ""
draft: false
tags: []
categories: []
type: default
---

As once our lord and savior Terry A. Davis said, ["An idiot admires complexity, a genius admires simplicity."](https://www.goodreads.com/quotes/10480697-an-idiot-admires-complexity-a-genius-admires-simplicity-a-physicist)  
And, welp, that's what I just did with my github bot Automata.

# v1

Automata v1 was a real mess. We were supposed to publish a next.js website, a jobs system to make our lives easier, and a large etc.

Now, I've been working on this for quite a while (about a year) and I felt like I wasn't going anywhere. So I just thought about it we could run the automation scripts on Github Actions, right?

# So I got to work

And in 4 days I got the whole thing working. I'm really proud of it.

We send API requests to Github whenever we want to trigger a workflow, on demand, by using the webhook system and handling everything from there.  
As a bonus I also added a command, so we could merge on a more controlled way, specially on larger PRs.

## Unexpected bugs on prod just after the PR merge

There were some bugs on launch.
- I didn't have a start script nor a license [(commit)](https://github.com/sern-handler/automata/commit/05c6ac3b81740ab9dcf86155b16afc84e7c850c8)
- I forgot to change some environment variable names on index.ts [(commit)](https://github.com/sern-handler/automata/commit/6e5d21ce548db04e9926ef7dfc3c1a5945d61aed)
- A day later, forgot to listen on the `PORT` environment variable [(commit)](https://github.com/sern-handler/automata/commit/622d6e72ded4330e06e802432677855a5397cedc)
- Squash and merge by default (ended up regretting it, see below) [(commit)](https://github.com/sern-handler/automata/commit/65ccede477f509c2e2de27be40a78281b79cda18)
- I FORGOT TO CHECK IF THE COMMAND MENTIONED @SERNBOT [(commit)](https://github.com/sern-handler/automata/commit/a5e58a415423eace3a8b0d6fbc4fe43e050c0624)

That last one was a real pain, as I detected the bug in production, on the most important PR of the week, if not the month: the website's move to starlight docs.
![](/blog/img/sernAutomataV2/prMerge1.png)  
![](/blog/img/sernAutomataV2/prMerge2.png)

# Conclusion

Wow, a project with good DevEx? SIGN ME UP!

PD: I created a next.js template with my preferred tech stack, make sure to check it out! [link](https://stack.srizan.dev)