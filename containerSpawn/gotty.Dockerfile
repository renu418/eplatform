# FROM python:slim
FROM python:3.6-slim
RUN apt upgrade
RUN apt update
RUN pip3 install flask
RUN pip3 install kubernetes

WORKDIR  /spawning_nested_ctr
COPY  . /spawning_nested_ctr

EXPOSE  5011
CMD [ "python3","flak4_nesed_gotty.py" ]