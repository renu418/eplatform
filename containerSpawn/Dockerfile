# Base Image
FROM ubuntu
# Getting Required Dependencies
RUN apt-get update && apt-get -y dist-upgrade && apt-get -y install gedit

RUN apt-get install -y golang git curl
# Setting Environmental Variables
ENV GOPATH /usr/go

RUN mkdir $GOPATH

ENV PATH $GOPATH/bin:$PATH

# ENV BASIC_AUTH_USER user

# ENV BASIC_AUTH_PASS pass

ENV DISPLAY :0

ENV TERM xterm
# Running goTTY
RUN go get github.com/yudai/gotty

COPY script.sh /script.sh

RUN chmod 755 /script.sh


ENTRYPOINT ["/script.sh"]