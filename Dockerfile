# Base Image
FROM python:3
# Getting Required Dependencies
RUN apt-get update && apt-get -y dist-upgrade

# RUN apt-get install -y curl


# FROM python:3.6-alpine
WORKDIR /todo

COPY . /todo

# RUN apt install -y python3-pip
RUN pip3 install Flask requests
RUN pip install -U flask-cors
# RUN apt-get install -y wget
VOLUME ["/data/newfolder"]

# RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
# RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install
ENV FILEPATH /data/newfolder/
ENTRYPOINT ["python3"]
CMD ["run.py"]