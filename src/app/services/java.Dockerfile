FROM ubuntu
# Getting Required Dependencies
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get -y install gedit

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
# ==================================================================================
# Install any needed packages specified in requirements.txt
WORKDIR /javacont
COPY . /javacont
RUN apt install -y python-pip
RUN pip install flask


# Copy the current directory contents into the container at /app

# Install OpenJDK-8
RUN apt-get install -y openjdk-8-jdk && \
    apt-get install -y ant && \
    apt-get clean;

# Fix certificate issues
RUN apt-get update && \
    apt-get install ca-certificates-java && \
    apt-get clean && \
    update-ca-certificates -f;

# Setup JAVA_HOME -- useful for docker commandline
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOME
EXPOSE 8080
# CMD [ "echo "This is my container2" | wc -" ]
# CMD [ "python","flask_app_con2.py" ]
# ================================================================
RUN chmod 755 /script.sh
ENTRYPOINT ["/script.sh"]