from os import path

import yaml

from kubernetes import client, config


def create_my_delploy():
    # Configs can be set in Configuration class directly or using helper
    # utility. If no argument provided, the config will be loaded from
    # default location.
    config.load_kube_config()
    # config.load_incluster_config()
    with open(path.join(path.dirname(__file__), "gottydeploy.yaml")) as f:
        dep = yaml.safe_load(f)
        k8s_apps_v1 = client.AppsV1Api()
        resp = k8s_apps_v1.create_namespaced_deployment(
            body=dep, namespace="default")
        print("Deployment created. status='%s'" % resp.metadata.name)

def create_my_service():
    config.load_kube_config()
    # config.load_incluster_config()
    with open(path.join(path.dirname(__file__), "gottyservice.yaml")) as f:
            dep = yaml.safe_load(f)
            k8s_apps_v1 = client.CoreV1Api()
            # resp = k8s_apps_v1.create_namespaced_deployment(body=dep, namespace="default")
            resp = k8s_apps_v1.create_namespaced_service(namespace="default", body=dep)
            print("Deployment created. status='%s'" % resp.metadata.name)


            