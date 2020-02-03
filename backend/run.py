from flask import Flask,render_template, request,jsonify, make_response,json,Response
import requests
import webbrowser
import os
from flask_cors import CORS, cross_origin
from os import listdir
import time
import os
import pymongo
import subprocess
from bson.json_util import dumps
import random
# import deploy_k8s
import sys
import shutil
# from EPlatform.deploy_k8s import create_gotty_deployment
# from EPlatform.deploy_k8s import -create_gotty_service
# sys.path.append('./Eplatform/') 
sys.path.append('./')
import deploy_k8s
import spawn_ctr_rtrn_url
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import jwt
import datetime
import pydash
from functools import wraps
# import db.functions
# password="Renugslab"
# import db.functions
sender_email = os.environ['SECRET_EMAIL']
password = os.environ['SECRET_PASSWORD']
# sender_email="renumanhas418@gmail.com"

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


app.config['SECRET_KEY'] = 'thisissecret'
filepath = os.environ['FILEPATH']
try:
    # client = pymongo.MongoClient("mongodb://localhost:27017/")
    client = pymongo.MongoClient("mongodb://mongoservice")
    print("________________DATABASE CONNECTED____________________")
except:
    print("________________DATABASE NOT CONNECTED____________________")

c = True
dataDict = dict()
randomNum =[]
db = client.questions
collection = db.questionpool
Gfiles=[]
msg = MIMEMultipart()
random_password=""
f=open('copy.txt',"r")
tt = int(f.readlines()[0])
f.close()
charlist = "qwertyuioplkjhgfdsazxcvbnm1234567890!@#$%^&*()PLMNKOIHVGYTFCXDRESZAQW"
passwd_len = 10

def randPasswordGenerator(len):
    rand_pass = ''
    for c in range(len):
        rand_pass+=random.choice(charlist)
    return rand_pass

@app.route("/randomnum",methods=["GET"])
def Rand(x, y):
    for i in random.sample(range(x,y),5):
        randomNum.append(str(i))
    


@app.route("/getDict",methods=["GET"])
def getDict():
    global c
    global Gfiles
    if (c):
        c = False
        Rand(1,10)
        print("randomNum: ",randomNum)
        Gfiles=genFile()
        for i in randomNum:
            dataDict["q" + i] = collection.find({'q' + i: {'$exists': 1}},{'_id':0})[0]
    return Gfiles

@app.route("/randomnum",methods=["GET"])
def genFile():
    global Gfiles
    print("random: ",randomNum)
    for i in randomNum:
        Gfiles.append('app'+str(i)+'.java')
    return Gfiles


#generating random number
@app.route('/getData')
@cross_origin()
def get_data():
    files=getDict()
    print("genfile : ",files)
    print(dataDict)
    print(randomNum)
    return {"data":dataDict,"random":randomNum,"files":files}
    

#saving the content of ace in file based on question
@app.route('/getvalue', methods=['POST'])
@cross_origin()
def set_name():
    rf=request.get_json()
    print(rf)
    data=rf['val']
    fileName=rf['file']
    print(data)
    # path=os.path.join('/home/gslab/Documents/',fileName)
    path=os.path.join(filepath,fileName)
    with open(path,"w+") as f:
        f.write(str(data))
        return data
    return "done"

#for showing content in ace of a file on clicking show button 
@app.route('/getfile',methods=['POST'])
@cross_origin()
def get_file_by_name():
    rf=request.get_json()
    print(rf)
    data=rf['val']
    print(data)
    # path=os.path.join('/home/gslab/Documents/',data)
    path=os.path.join(filepath,data)
    print(path)
    text = open(path, 'r')
    content = text.read()
    print(content)
    text.close()
    print(content)
    return {"response": content}


@app.route("/changeGottyFiles", methods = ['POST'])
@cross_origin()
def svc():
    n = request.get_json()
    print(n['service_filepath'])
    # os.system("rm " + n['py_filepath'] + " " + n['service_filepath'] + " " + n['deploy_filepath'])
    global tt
    regex_deply = n['deploy']
    regex_service = n['service']
    py_filepath = n['py_filepath']
    service_filepath = n['service_filepath']
    deploy_filepath = n['deploy_filepath']
    cnt = tt
    try:
        with open(service_filepath, "r+") as f:
            new_f = f.readlines()
            f.seek(0)
            rm_line = ""
            for line in new_f:
                if (regex_deply not in line and regex_service not in line):
                    f.write(line)
                else:
                    rm_line = line
                    f.truncate()
                    if(regex_deply in line):
                        idx1 = rm_line.index(regex_deply)
                        idx = idx1 + len(regex_deply)
                        if(idx < len(rm_line) - 1):
                            f.write(rm_line[:idx] + str(cnt) + "\n")
                        else:
                            f.write(rm_line[:idx] + str(cnt) + rm_line[idx : ])
                    else:
                        idx1 = rm_line.index(regex_service)
                        idx = idx1 + len(regex_service)
                        if(idx < len(rm_line) - 1):
                            f.write(rm_line[:idx] + str(cnt) + "\n")
                        else:
                            f.write(rm_line[:idx] + str(cnt) + rm_line[idx : ])
        cnt = tt
        with open(deploy_filepath, "r+") as f:
            new_f = f.readlines()
            f.seek(0)
            rm_line = ""
            for line in new_f:
                if regex_deply not in line:
                    f.write(line)
                else:
                    rm_line = line
                    f.truncate()
                    idx1 = rm_line.index(regex_deply)
                    idx = idx1 + len(regex_deply)
                    if(idx < len(rm_line) - 1):
                        f.write(rm_line[:idx] + str(cnt) + "\n")
                    else:
                        f.write(rm_line[:idx] + str(cnt) + rm_line[idx : ])
        cnt = tt
        with open(py_filepath, "r+") as f:
            new_f = f.readlines()
            f.seek(0)
            rm_line = ""
            for line in new_f:
                if regex_service not in line:
                    f.write(line)
                else:
                    rm_line = line
                    f.truncate()
                    idx1 = rm_line.index(regex_service)
                    idx = idx1 + len(regex_service)
                    if(idx < len(rm_line) - 1):
                        f.write(rm_line[:idx] + str(cnt) + "\'\"" + "\n")
                    else:
                        f.write(rm_line[:idx] + str(cnt) + rm_line[idx : ])
        with open('copy.txt', "r+") as f:
            new_f = f.readlines()
            f.seek(0)
            rm_line = ""
            rm_line = new_f[0]
            f.truncate()
            f.write(str(int(rm_line) + 1))
        # os.system("cp ../data/javagottyservice.yaml ./todo")
        # os.system("cp ../data/javagottydeploy.yaml ./todo")
        # os.system("cp ../data/spawn_ctr_rtrn_url.py ./todo")
    except:
        return  {'success':"false",'statuscode':404}
    shutil.copy("../data/javagottyservice.yaml",".")
    shutil.copy("../data/javagottydeploy.yaml",".")
    shutil.copy("../data/spawn_ctr_rtrn_url.py" ,".")
    return {'success':"true",'statuscode':200}

#for spawning language specific gotty container
@app.route('/get',methods =['POST'])
@cross_origin()
def fetech_data():
    rf=request.get_json()
    print(rf)
    lang=rf['lang']
    print(lang)
    if lang == "Java":
        # try:
        print("inside the spawn_nested container methiod insise the api")
        deploy_k8s.create_gotty_deployment()  #creating deployment for the gottyservice
        deploy_k8s.create_gotty_service()      #creating service for the gottyservice
        print("Return url for the gotty container")
        new_url = spawn_ctr_rtrn_url.main()
        print("###########newurl##########",new_url)
        return {'response': new_url,'success':"true",'statuscode':200}
       

#login by validating email and password
@app.route('/emailValidation',methods =['POST'])
@cross_origin()
def emailValidate():
    rf=request.get_json()
    print(rf)
    password=rf['password']
    user = client['user']['userInfo'].find_one({'email':rf['email']})
    # print(user)
    if not user:
        return {'success':"false",'statuscode':404}
    if user['password'] != password:
        return {'success':"false",'statuscode':401}
    # else:
    #     res=updateUserInfo(rf)
    print(user['name'])
    token = jwt.encode({'username' : str(user['name']), 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=2)}, app.config['SECRET_KEY'])
    return {'success':"true",'statuscode':200,'token' : token.decode('UTF-8')}    


#inserting the data of user on successfull registration
@app.route("/userDataInsert",methods=['POST'])
@cross_origin()
def dataInsertion():
    n=request.get_json()
    global random_password
    print("-------------------",n)
    print("---data----",n)
    status=validate(n)
    print(status)
    # _,status=validate(n)
    # print(status)
    # s=status
    s=status.status_code
    if s==200:
        random_password=randPasswordGenerator(passwd_len)
        n['password']=random_password
        ff=client['user']['userInfo'].insert_one(n)
        print(ff.acknowledged)
        return  {'success':"true",'statuscode':200}
    else:
        return  {'success':"false",'statuscode':404}

#admin will insert the questions
# @app.route("/questionsInsert",methods=["POST"])
# @cross_origin()
# def questionsInsert():
#     return "done"

#to check if the user is valid or not
@app.route('/validatefunct',methods=['GET'])
@cross_origin()
def validate(n):
    n=request.get_json()
    print("before insertion",n)
    print("______________________in validate function__________________")
    user = client['user']['userInfo'].find_one({'email':n['email']})
    print(user)
    if user:
       return "false",404
    return "true",200
    

#sending a mail with randomly generated password
@app.route('/sendEmail',methods=['POST'])
@cross_origin()
def mail():
    print("______________________in mail function__________________")
    global password
    global random_password
    n=request.get_json()
    username=n['name']
    reciever_email=n['email']
    print("receiver:",reciever_email)
    rand_passwd = random_password
    print("++++++++++++++++Password+++++", rand_passwd)
    msg['From'] = sender_email
    msg['To'] = reciever_email
    msg['Subject'] = "Password"
    msg['reply-to']='no-reply@gmail.com'
    message = "Dear "+username+" Your Login Details are as Follow\nEmail : "+reciever_email+"\nPassword : "+rand_passwd
    print("message: ",message)
    msg.attach(MIMEText(message, 'plain'))
    try:
        server = smtplib.SMTP('smtp.gmail.com: 587')
        print(server)
        server.starttls()
        server.login(msg['From'], password)
        # send the message via the server.
        server.sendmail(msg['From'], msg['To'], msg.as_string())
        server.quit()
        print ("successfully sent email to %s:" % (msg['To']))
        print("-----------------mail sent-------------")
        return {"success":"true","statuscode":200}
    except:
        print("--------------mail not sent---------------")
        return {"success":"false","statuscode":404}




if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="5031")