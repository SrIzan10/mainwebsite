---
id: 4
title: Install osu! on Endeavour OS
description: A guide on how to install osu! on Endeavour OS
date: 17/12/2023
---

Alright, so you want to install osu! on Endeavour OS. I just reinstalled my system. Two birds with one stone!
Based on https://wiki.archlinux.org/title/User:Katoumegumi

# Backstory

My Windows installation has been unstable since year 1 of my computer, and it even went to the point that when I open osu! sometimes it would just not work, black out my screen and play the last sound it was playing (see audio when a BSOD happens)  
Yesterday I went to install [the latest update](https://osu.ppy.sh/home/changelog/stable40/20231217.1), click on restart, yadiyadiyada and unfortunately my computer CRASHED. I didn't feel nervous until I opened up the game to play a bit and find out that my skin was the default one.

Okay, strange, lemme open up the game...

It starts importing all beatmaps.

Okay then, a bit understandable because the update is all about difficulty calculator.

When it finishes, I go to my most recent plays.  
Nothing.  
Never played.  
What?

I go into my collections.  
They're still there.  
Okay, but are the scores there?  
NO!

Thus, after recovering my replays using a batch scripts that opens all `.osr` files in my `Data\r` folder, I just moved to linux, and this is a writeup on how I've been installing the game since my first time in April.

Enjoy!

# Installation

## Installing Wine

We first need to install wine and winetricks, to do so run:
```sh
sudo pacman -S wine
wget https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks
chmod +x winetricks
sudo mv ./winetricks /usr/local/bin/winetricks
```

## Preparing wineprefix

We now need to install dependencies like fonts or dotnet to make osu! run correctly
```sh
WINEARCH=win32 WINEPREFIX=~/.wineosu winetricks dotnet40 cjkfonts gdiplus
```

## Installing osu!

Skipping this part, but basically download the installer and run it.  
I already have my own 3-year-old installation with all my everything on it, so I'm bind-mounting it.

Create a directory:
```sh
mkdir ~/.wineosu/osu
```
And then I added the following fstab line:
```sh
/mnt/HDD/osu! /home/srizan/.wineosu/osu none defaults,bind 0 0
```

## Trying to open it up

Running `WINEARCH=win32 WINEPREFIX=~/.wineosu wine ~/.wineosu/osu/osu\!.exe` twice leads us in the osu! installer with no network connection found.

This is a bit easy to fix, as Wine itself yields this error if you scroll up a bit:
```sh
01b0:err:winediag:process_attach Failed to load libgnutls, secure connections will not be available.
```
Looking the package up in the [Arch Linux repos](https://archlinux.org/packages/?q=libgnutls), a package called `lib32-gnutls` shows up which looks to be exactly what we want.

After installing it, the SSL connection worked and the game is going to sta- too bad!
![](/blog/img/osu-eOS/graphicsContext.png)  
You thought that was gonna be IT!

It wants a GL context, which we don't have, so installing [`lib32-mesa`](https://archlinux.org/packages/multilib-testing/x86_64/lib32-mesa/) fixes it. Easy!

Now, the window is... dark? WHEN ARE WE DONE MAN?  
Welp, when going to almost the top of the file, we can see this:
```sh
0024:err:winediag:create_gl_drawable XComposite is not available, using GLXPixmap hack.
```
"GLXPixmap hack"?  
The game is, according to peppy, held with duct tape, so no hacks are really going to work.

Here we go, [yet ANOTHER lib32 package](https://archlinux.org/packages/multilib/x86_64/lib32-libxcomposite/) should fix it.

It opens up!  
![](/blog/img/osu-eOS/noaudio.mp4)

Yeah. Nice. No audio.  
Browsing through the Arch forums I found ![this post](https://bbs.archlinux.org/viewtopic.php?id=135032), and I installed the three `lib32-alsa-plugins lib32-libpulse lib32-openal` packages.

And it started up! (too lazy to screenshot)

## Setting up the start script

edit a file in `~/.wineosu/osu/start.sh` with the following contents:
```sh
#!/usr/bin/env bash

# props to Katoumegumi for the original script, this is exactly the same one and it works wonders.
#export PATH="$HOME/.wineosu/osuwine/bin:$PATH" #Use custom WINE version to run osu!
export WINEARCH=win32
export WINEPREFIX="$HOME/.wineosu"
#export WINEFSYNC=1

#VSync. For some reason, some people had been getting input latency issues and for some reason, the fix is to set VSync to off.
export vblank_mode=0 #For AMD, Intel and others
export __GL_SYNC_TO_VBLANK=0 #For NVIDIA proprietary and open source >=500

#export STAGING_AUDIO_PERIOD=10000

#start osu!
wine osu\!.exe
```

## Setting up the freedesktop entry

Download the osu! logo:
```sh
wget --output-document ~/.wineosu/osu/icon.png https://github.com/ppy/osu-wiki/raw/master/wiki/Brand_identity_guidelines/img/usage-full-colour.png
```
and finally edit a new file in the path `~/.local/share/applications/osu.desktop`
```
[Desktop Entry]
Type=Application
Comment=A free-to-play rhythm game inspired in Osu! Tataekae! Ouendan!
Icon=/home/<username>/.wineosu/osu/icon.png
Exec=/home/<username>/.wineosu/osu/start.sh
Path=/home/<username>/.wineosu/osu
GenericName=osu!
Name=osu!
StartupNotify=true
```

# that's it

Way harder than I thought. If you want the command with all dependencies, type in:
```sh
sudo pacman -S lib32-gnutls lib32-mesa lib32-alsa-plugins lib32-libpulse lib32-openal
```