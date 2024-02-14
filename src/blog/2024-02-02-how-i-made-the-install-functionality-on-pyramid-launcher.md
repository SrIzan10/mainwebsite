---
title: How I made the install functionality on Pyramid Launcher
description: ""
date: 2024-02-02T19:13:07.791Z
preview: ""
draft: true
tags: []
categories: []
---

# Introduction

Hey everyone! Back here with a random post about how I added the minecraft installation functionality to Pyramid Launcher.

Pyramid Launcher is yet another electron launcher I've been working on with [my buddies](https://github.com/pyramidmc/people).

# The problem

For some reason `@xmcl/installer` hasn't worked for me. It'd just get stuck downloading stuff. So I wanted to make my own installer.

# Minecraft's files

## Assets

Minecraft's assets are stored in a folder called `assets`. Inside it, there are two folders: `indexes` and `objects`. The `indexes` folder contains a JSON file with a list of all the assets and their hashes and the `objects` folder contains all the assets.

This last folder has all game files, and its layout was a bit confusing at first. It's a bit like this:
    
```
.
├── 00
├── 01
├── 02
├── 03
├── 04
├── 05
├── 06
├── 07
├── 08
├── 09
├── 0a
├── 0b
├── 0c
├── 0d
├── 0f
(...)
```

It looks a bit confusing, but when you notice that each folder is a hash of the file, it makes sense. This is a way to avoid having a lot of files in a single folder, which would make it slow to read, but also I don't think that's good for the filesystem read and writes! ;D

## Libraries

This one is probably the easiest one. It's just a folder with a bunch of `.jar` files inside the normal IDs that java packages use.

It's also the easiest one to query, as inside the [https://piston-meta.mojang.com/v1/packages/d546f1707a3f2b7d034eece5ea2e311eda875787/1.8.9.json](version metadata JSON file), there's a list of all the libraries, paths and their hashes.

## Versions

Finally, the versions folder, which has the client files and the metadata JSON file which is the same one as the one we pull the libraries from.

# The package

After starting off a new Typescript package project using [my ts-lib-boilerplate github repo](https://github.com/SrIzan10/ts-lib-boilerplate), I started off by creawting a new class called `Installer`.  
This class would be responsible for downloading and installing the game files.

```typescript

```