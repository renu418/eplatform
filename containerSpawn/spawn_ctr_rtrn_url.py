from kubernetes import client, config

def list_node_port_data():
    # config.load_incluster_config()
    config.load_kube_config()
    v1 = client.CoreV1Api()
    list_my_services_data = v1.list_namespaced_service("default")
    # print(list_my_services_data)
    info = str(list_my_services_data)
    file1 = open("IP.txt","a") 
    file1.writelines(info)


def fetech_node_port_from_file():
    f2 = open("outf.txt",'a')
    fopen = open('IP.txt',mode='r')
    fread = fopen.readlines()
    spec = "spec"
    gotty = "'gottyservice'"
    node = "'node_port'"

    for line in fread:
        if gotty in line:
            print(line)
            f2.write(line)
        if node in line:
            print(line)
            f2.write(line)
            break


def get_node_port_value():
    f = open("outf.txt")
    node_port_value =""
    fread = f.readlines()
    for line in fread:
        if "'node_port'" in line:
            line.strip()
            port_no = line
            # print(type(port_no))
            a=port_no.lstrip()
            # print(a)
            for i in a:
                if i.isdigit():
                    node_port_value += i
            # print("This is ur port == ",node_port_value)
    feteched_node_port = node_port_value
    return node_port_value
#################################################################################
# USING THE ABOVE CODE I HAVE FOUND THE NODE_PORT AND STORED IN STRING VARIABLE

def list_host_ip_data():
    # config.load_incluster_config()
    config.load_kube_config()
    v1 = client.CoreV1Api()
    # print("Listing pods with their IPs:")
    # ret = v1.list_pod_for_all_namespaces(watch=False)
    list_namespace_podS = v1.list_namespaced_pod(namespace="default")
    # print(list_namespace_podS)
    host_ip_file = open("host_ip.txt",'a')
    host_ip_file.write(str(list_namespace_podS))
    # et = v1.list_namespaced_service("namespace-3")
    # print(et)
    # info = str(et)
    # file1 = open("IP.txt","w") 
    # file1.writelines(info)


def get_host_ip():
    host_ipS_file = open("filtered_host_ip.txt",'a')
    host_ip_read = open("host_ip.txt").readlines()
    for line in host_ip_read:
        if "'host_ip'" in line:
            host_ip = line
            # print("this is host_ip ",host_ip)
            host_ipS_file.write(line)

def storing_host_ip():
    host_ipS_file = open("filtered_host_ip.txt")
    fread = host_ipS_file.readlines()
    final_host_ip =""
    for line in fread:
        if "'host_ip'" in line:
            IP = line
            dot = 0
            # print(type(port_no))
            a=IP.lstrip()
            # print(a)
            for i in a:
                if i.isdigit():
                    final_host_ip += i
                elif i==".":
                    dot+=1
                    final_host_ip+= i
            if dot==3:
                break
            else:
                continue

    return final_host_ip
    # print("This is ur port ",final_host_ip)


# def get_host_ip():
#     f = open("filtered_host_ip.txt")
#     fread = f.readlines()
#     final_host_ip =""
#     for line in fread:
#         if "'host_ip'" in line:
#             IP = line
#             dot = 0
#             # print(type(port_no))
#             a=IP.lstrip()
#             # print(a)
#             for i in a:
#                 if i.isdigit():
#                     final_host_ip += i
#                 elif i==".":
#                     dot+=1
#                     final_host_ip+= i
#             if dot==3:
#                 break
#             else:
#                 continue
#     print("This is ur port ",final_host_ip)

def main():
    url = "http://"
    list_node_port_data()
    fetech_node_port_from_file()
    list_host_ip_data()
    get_host_ip()
    var1 = storing_host_ip()
    url += var1
    var2 = get_node_port_value()
    url+= ":"+var2
    print(url)
    return url



# if __name__ == "__main__":
    # url = "http://"
    # list_node_port_data()
    # fetech_node_port_from_file()
    # list_host_ip_data()
    # get_host_ip()
    # var1 = storing_host_ip()
    # url += var1
    # var2 = get_node_port_value()
    # url+= ":"+var2
    # print(url)
    # main()
    



    