FROM node:12.2.0

# install chrome for protractor tests
WORKDIR /app
COPY . /app

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable && apt-get -y dist-upgrade

# RUN apt install -y python3-pip
# # set working directory
# RUN pip3 install Flask requests pyyaml kubernetes
# RUN pip3 install -U flask-cors 
# RUN python3 run.py


ENV PATH /app/node_modules/.bin:$PATH
# add `/app/node_modules/.bin` to $PATH


# install and cache app dependencies
# COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9
 

# RUN apt install -y python3-pip

# RUN apt-get install -y wget
VOLUME ["my-app/src/main/java/com/mycompany/app"]

# RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
# RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install
ENV FILEPATH my-app/src/main/java/com/mycompany/app

# add app


# start app
CMD npm run -- ng serve --host 0.0.0.0 --disable-host-check