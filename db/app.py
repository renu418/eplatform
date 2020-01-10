from flask import Flask, url_for, render_template, redirect, request
from pymongo import MongoClient as mongoDB
import os
from flask_cors import CORS, cross_origin
import functions as randomGen

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

client = mongoDB('mongodb://localhost:27017/')

db = client.questions
collection = db.questionpool

randomNum = randomGen.Rand(1,10)

dataDict = dict()

for i in randomNum:
    dataDict["q" + i] = collection.find({'q' + i: {'$exists': 1}},{'_id':0})[0]

@app.route('/getData')
def get_data():
    print(dataDict)
    print(randomNum)
    return {"data":dataDict,"random":randomNum}
    # return render_template('index.html', collection = dataDict, randomNum = randomNum)

#admin will insert the data of user
@app.route("/userDataInsert",methods=['POST'])
def dataInsertion():
    n=request.get_json()
    print("-------------------",n)
    print("---data----",n)
    ff=client['user']['userInfo'].insert_one(n)
    print(ff.acknowledged)
    return "inserted"

#admin will insert the questions
@app.route("/questionsInsert",methods=["POST"])
def questionsInsert():
    return "done"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)