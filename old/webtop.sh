docker run -d \
  --name=ubuntu \
  --privileged `#optional` \
  --security-opt seccomp=unconfined `#optional` \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/Madrid \
  -e SUBFOLDER=/ `#optional` \
  -p 3000:3000 \
  -v /home/srizan/dockerdata:/config \
  -v /var/run/docker.sock:/var/run/docker.sock `#optional` \
  --shm-size="1gb" `#optional` \
  --restart unless-stopped \
  lscr.io/linuxserver/webtop:ubuntu-xfce
