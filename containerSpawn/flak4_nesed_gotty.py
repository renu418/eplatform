import flask
import subprocess
import kubernetes
import os
import deploy_k8s
import spawn_ctr_rtrn_url

app = flask.Flask(__name__)

@app.route('/spawn_gotty_cntr',methods =['GET'])
def spawn_nested_container():
    print("inside the spawn_nested container methiod insise the api")
    deploy_k8s.create_gotty_deployment()  #creating deployment for the gottyservice
    deploy_k8s.create_gotty_service()      #creating service for the gottyservice
    print("Return url for the gotty container")
    new_url = spawn_ctr_rtrn_url.main()
    return new_url," this is your URL "

# @app.route('/get_url',methods=['GET'])
# def return_url():
#     print("Return url for the gotty container")

#     new_url = spawn_ctr_rtrn_url.main()
#     return new_url," this is your URL "


if __name__ == "__main__":
    app.run(debug=True,port=5011,host='0.0.0.0')
    