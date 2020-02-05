from ConfigFile import runIT
import os, sys
from os import listdir
import shutil
from os.path import isfile, join
import re
import message_rep as mr
from flask import Flask,render_template, request,jsonify, make_response,json,Response
import requests
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# Get User Output in Admin deirectory

@app.route('/tesing', methods=['POST'])
@cross_origin()
def testing():
    rf=request.get_json()
    reg=rf['reg']
    shutil.move('/data/' + reg, '/User')
    runIT()

    folders = [x[0] for x in os.walk('./Admin/user_out')]

    is_present = set()

    reg_file = open('registration_number.txt', 'r+')
    reg_num = reg_file.readlines()

    for id in reg_num:
        is_present.add(id[ : id.index('\n')])

    print('set is : ', is_present)

    if(len(folders) > 0):
        curr_passed_testcase = 0
        total_testcases = 0
        for Currfolder in range(1, len(folders)):
            is_calculation_done = False
            fol = folders[Currfolder]
            rev = fol[: : -1]
            regNum = rev[ : rev.index('_')][: : -1]
            if(regNum not in is_present):
                is_calculation_done = True
                reg_file.write(regNum + '\n') # Add the Registration Number in the set
                files = [f for f in listdir(folders[Currfolder]) if isfile(join(folders[Currfolder], f))]
                print('folder: ', folders[Currfolder])
                print('file name: ', files)
                for Currfile in files:
                    OutFile_Admin = open("./Admin/output.in/" + Currfile, "r")
                    OutFile_User = open(folders[Currfolder] + "/" + Currfile, "r")
                    print('matching ' + "./Admin/output.in/" + Currfile + " ---- with ---- " + folders[Currfolder] + "/" + Currfile)
                    Question_Number = list(map(int, re.findall(r'\d+', Currfile)))[0]
                    f = open("./Admin/input.in/inp" + str(Question_Number) + ".txt", "r")
                    line = f.readline()
                    TOTAL_TC = int(line[ : line.index('\n')])
                    f.close()
                    TC_PASSED = 0
                    file1 = OutFile_Admin.readlines()
                    file2 = OutFile_User.readlines()
                    for ans_num in range(len(file2)):
                        if(file2[ans_num][-2] == ' '):
                            file2[ans_num] = file2[ans_num][ : -2] + file2[ans_num][-1]
                    hold = file2[-1]
                    if(hold[-1] == '\n'):
                        file2[-1] = hold[ : hold.index('\n')]
                    print(file1)
                    print(file2)

                    for answer in range(len(file1)):
                        if(file1[answer] == file2[answer]):
                            TC_PASSED += 1

                    OutFile_Admin.close()
                    OutFile_User.close()
                    print('total TC: ', TOTAL_TC)
                    print('passed TC: ', TC_PASSED)

                    curr_passed_testcase += TC_PASSED
                    total_testcases += TOTAL_TC
                os.system('rm -rf ' + folders[Currfolder])
            else:
                print('Already done!')
                os.system('rm -rf ./Admin/user_out')
        if(is_calculation_done):
            percentage = "{:.2f}".format((curr_passed_testcase / total_testcases) * 100.00)
            print('percentage = ' + percentage)

            attach_msg = open("./Admin/message.pdf", "a")
            attach_msg.seek(0)
            attach_msg.truncate()
            if(float(percentage) > 75.0):    # Criteria is set to >= 75% (This is an example)
                attach_msg.write(mr.success_msg() + percentage + ' %')
            else:
                attach_msg.write(mr.failure_msg())
            attach_msg.close()

            os.system('python3 email_user.py')
            os.system('rm ./Admin/message.pdf')
            os.system('rm -rf ./Admin/user_out')
    return "job done!"

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5000, debug = True)