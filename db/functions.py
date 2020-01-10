import random

def Rand(x, y):
    rand_num = []
    for i in random.sample(range(x,y),5):
        rand_num.append(str(i))
    return rand_num

