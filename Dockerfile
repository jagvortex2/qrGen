FROM ubuntu:latest
LABEL authors="jarcg"

ENTRYPOINT ["top", "-b"]