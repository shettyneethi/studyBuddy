from __future__ import print_function
import requests
import json
import time
import sys, os

host = sys.argv[1]
cmd = sys.argv[2]

addr = 'http://{}:5000'.format(host)

if cmd == 'login':
    user_name = sys.argv[3]
    password = "password"

    req = {
        "user_name" : user_name,
        "password" : password
    }
    req_url = addr + '/api/login' 
    headers = {'content-type': 'application/json'}
    response = requests.post(req_url, json=req, headers=headers)
    print("Response is", response)
    print(json.loads(response.text))
    if((json.loads(response.text))['status'] == 'SUCCESS' ):
        print("TEST RES: PASS")
    else:
        print("TEST RES: FAIL")
elif(cmd == 'signup'):
    user_name = sys.argv[3]
    password = "password"
    email = sys.argv[4]
    req = {
        "user_name" : user_name,
        "password" : password,
        "email" : email
    }
    req_url = addr + '/api/signup' 
    headers = {'content-type': 'application/json'}
    response = requests.post(req_url, json=req, headers=headers)
    print("Response is", response)
    print(json.loads(response.text))

else:
    print("Unknown option", cmd)                