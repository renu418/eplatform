from flask import Flask
import os
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def show_data():
    return ("Hello World!")

@app.route("/testing",methods=['GET'])
@cross_origin()
def test():
    
    os.system('javac data/Main.java && java -cp data/ Main')
    return "done"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)