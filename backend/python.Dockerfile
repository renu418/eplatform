# Base Image
FROM python:3
# Getting Required Dependencies
RUN apt-get update && apt-get -y dist-upgrade


# FROM python:3.6-alpine
WORKDIR /todo

COPY . /todo

# RUN apt install -y python3-pip
RUN pip3 install Flask requests pyyaml kubernetes pymongo pyjwt pydash
RUN pip3 install -U flask-cors
RUN apt-get install -y nano
# RUN apt-get install -y wget
# VOLUME ["/data"]
EXPOSE 5031

# RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
# RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install
ENV FILEPATH /data/my-app/src/main/java/com/mycompany/app/

ENTRYPOINT ["python3"]
CMD ["run.py"]
