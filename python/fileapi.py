from flask import Flask, url_for, render_template, redirect, request
from pymongo import MongoClient as mongoDB
import os
from flask_cors import CORS, cross_origin
import shutil

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/moveFile')
def get_data():
    shutil.move("/data/my-app/src/main/java/com/mycompany/app/", "/user")
    return "done"
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)