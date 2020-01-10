from flask import Flask,render_template, request
import requests
import webbrowser
import os
from flask_cors import CORS, cross_origin
from os import listdir
import time
import os
import pymongo
import subprocess
import create_deploy
import random
# import db.functions

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# filepath = os.environ['FILEPATH']
try:
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    # client = pymongo.MongoClient("mongodb://mongoservice")
    print("________________DATABASE CONNECTED____________________")
except:
    print("________________DATABASE NOT CONNECTED____________________")

c = True
dataDict = dict()
randomNum =[]
db = client.questions
collection = db.questionpool
Gfiles=[]


@app.route("/randomnum",methods=["GET"])
def Rand(x, y):
    for i in random.sample(range(x,y),5):
        randomNum.append(str(i))
    


@app.route("/getDict",methods=["GET"])
def getDict():
    # randomNum=Rand(1,10)
    # randomNum.clear()
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
    # files= []
    print("random: ",randomNum)
    for i in randomNum:
        # files.append('app'+str(i)+'.py')
        Gfiles.append('app'+str(i)+'.java')
    # print("files:", files)
    # return files
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
    # return render_template('index.html', collection = dataDict, randomNum = randomNum)

#saving the content of ace in file based on question
@app.route('/getvalue', methods=['POST'])
@cross_origin()
def set_name():
    print("hello")
    rf=request.get_json()
    print(rf)
    data=rf['val']
    fileName=rf['file']
    print(data)
    path=os.path.join('/home/gslab/Documents/',fileName)
    # path=os.path.join(filepath,fileName)
    with open(path,"w+") as f:
        # print(f)
        f.write(str(data))
        return data
    return "hello"

#for showing content in ace of a file on clicking show button 
@app.route('/getfile',methods=['POST'])
@cross_origin()
def get_file_by_name():
    rf=request.get_json()
    print(rf)
    data=rf['val']
    print(data)
    path=os.path.join('/home/gslab/Documents/',data)
    # path=os.path.join(filepath, data)
    print(path)
    text = open(path, 'r')
    content = text.read()
    print(content)
    text.close()
    print(content)
    return {"response": content}


@app.route('/get',methods =['POST'])
@cross_origin()
def fetech_data():
    rf=request.get_json()
    print(rf)
    lang=rf['lang']
    print(lang)
    if lang == "Python":
        print("deployement creates rahees")
        create_deploy.create_my_delploy()
        print("deployement creates rahees")
        time.sleep(5)
        create_deploy.create_my_service()
        print("service creates rahees")
        time.sleep(5)
    ur_url = subprocess.getoutput("minikube service k8gotty1-service --url")
    # print("this is url ",ur_url.strip('*'))
    # url=ur_url.strip('*')
    return {"response": ur_url}     

#login by validating email and password
@app.route('/emailValidation',methods =['POST'])
@cross_origin()
def emailValidate():
    rf=request.get_json()
    print(rf)
    password=rf['password']
    user = client['user']['userInfo'].find_one({'email':rf['email']})
    print(user)
    if not user:
        return {'success':"false",'statuscode':404}
    if user['password'] != password:
        return {'success':"false",'statuscode':401}
    # else:
    #     res=updateUserInfo(rf)
    return {'success':"true",'statuscode':200}    
  

#if the user is valid then user data will be updated in the db
@app.route('/updateUserInfo',methods=['POST'])
@cross_origin()
def updateUserInfo(rf):
    print(rf)
    print("in update function")
    # db=client['user']['userInfo']
    client['user']['userInfo'].update_one(
        {"email":rf['email']},
        {"$set":{
        "name":rf['name'],"college":rf['college'],"language":rf['language'],"CGPA":rf['CGPA']}})
    return "True"


#admin will insert the data of user
@app.route("/userDataInsert",methods=['POST'])
@cross_origin()
def dataInsertion():
    n=request.get_json()
    print("-------------------",n)
    print("---data----",n)
    ff=client['user']['userInfo'].insert_one(n)
    print(ff.acknowledged)
    return  {'success':"true",'statuscode':200}   

#admin will insert the questions
@app.route("/questionsInsert",methods=["POST"])
@cross_origin()
def questionsInsert():
    return "done"

# @app.route("/testing",methods=['GET'])
# @cross_origin()
# def test():
#     os.system('javac data/Main.java && java -cp data/ Main')
#     return "done"

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="5031")