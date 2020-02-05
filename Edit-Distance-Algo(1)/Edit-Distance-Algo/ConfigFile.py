import os, sys
from os import listdir
from os.path import isfile, join
import re

# print(onlyfiles)

def runIT():
    #Create a folder where user's output will be stored. Lets call it user_out
    os.system('mkdir ./Admin/user_out')
    folders = [x[0] for x in os.walk('./User')]
    for i in range(1, len(folders)):
        onlyfiles = [f for f in listdir(folders[i]) if isfile(join(folders[i], f))]

        #Create the folder for each users in the Admin folder
        userName = folders[i][folders[i].index('/', 2) + 1 : ]
        os.system('mkdir ./Admin/user_out/output_' + userName)

        # print(onlyfiles)
        if(len(onlyfiles) > 0):
            for files in onlyfiles:
                Question_Number = list(map(int, re.findall(r'\d+', files)))[0]
                if(files[files.index('.') + 1 : ] == 'py'):
                    if (os.stat(folders[i] + '/' + files).st_size == 0):
                        continue
                    else:
                        os.system('python3 ' + folders[i] + '/' + files + ' < ' + './Admin/input.in/inp' + str(Question_Number) + '.txt' + ' > ' + './Admin/user_out/output_' + userName + '/out' + str(Question_Number) + '.txt')
                if(files[files.index('.') + 1 : ] == 'java'):
                    if (os.stat(folders[i] + '/' + files).st_size == 0):
                        continue
                    else:
                        os.system('javac ' + folders[i] + '/' + files)
                        os.system('java -cp ' + folders[i] + '/ ' + files[ : files.index('.')] + ' < ' + './Admin/input.in/inp' + str(Question_Number) + '.txt' + ' > ' + './Admin/user_out/output_' + userName + '/out' + str(Question_Number) + '.txt')
                if(files[files.index('.') + 1 : ] == 'cpp'):
                    if (os.stat(folders[i] + '/' + files).st_size == 0):
                        continue
                    else:
                        os.system('g++ ' + folders[i] + '/' + files)
                        os.system('./a.out ' + ' < ' + './Admin/input.in/inp' + str(Question_Number) + '.txt' + ' > ' + './Admin/user_out/output_' + userName + '/out' + str(Question_Number) + '.txt')