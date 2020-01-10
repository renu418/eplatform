import flask
import time
import os
import subprocess
import create_deploy
app = flask.Flask(__name__)

@app.route('/get/<string:lang>',methods =['GET'])
def fetech_data(lang):
    if lang == "python":
        create_deploy.create_my_delploy()
        print("deployement creates rahees")
        time.sleep(5)
        create_deploy.create_my_service()
        print("service creates rahees")
        # time.sleep(5)
    ur_url = subprocess.getoutput("minikube service k8gotty1-service --url")
    print("this is url ",ur_url.strip('*'))

    return ur_url,"Hello Sultan Mirza This container 2 flask !!!!!!!!!!!!"

# @app.route('/get/make_ssh',methods =['GET'])
# def make_ssh_con():
#     os.system("mkdir flask_dir")
#     # os.system("sshpass -p gslab@123 ssh gslab@192.168.1.106")
#     os.system("python3 ssh_w_python.py")
#     return "Your python code for ssh is running...... "



if __name__ == "__main__":
    app.run(debug=True,port=5005,host='0.0.0.0')