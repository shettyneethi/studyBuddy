from flask import Flask, request, Response
import pymongo
import jsonpickle
import io
import hashlib
import secrets

# Initialize the Flask application
app = Flask(__name__)

# route http posts to this method
@app.route('/api/login', methods=['POST'])
def login():
    myclient = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient["STUDYBUDDY"]
    usrDetails = mydb["user_details"]
    data = request.get_json()
    hashed_pwd = hashlib.md5(data["password"].encode()).hexdigest()

    myquery = { "user_name": data["user_name"], "password" : hashed_pwd }

    response = {
        "status" : "FAIL",
        "token" : ""
    }

    status=200
    print(myquery)

    try:
        if(usrDetails.find(myquery).count() == 1):
            token = secrets.token_hex(16)
            response["status"] = "SUCCESS"
            response["token"] = token
            usrDetails.update(myquery, {"$set": {"token": token}})
    except:
            response["status"] = "ERROR"
            status = 400

    response_pickled = jsonpickle.encode(response)
    return Response(response=response_pickled,
           status=status , mimetype="application/json")

@app.route('/api/signup', methods=['POST'])
def signup():
    myclient = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient["STUDYBUDDY"]
    usrDetails = mydb["user_details"]
    data = request.get_json()
    hashed_pwd = hashlib.md5(data["password"].encode()).hexdigest()

    row = { "user_name": data["user_name"], "password" : hashed_pwd , "email": data["email"]}
    myquery1 = { "user_name": data["user_name"] }
    myquery2 = { "email": data["email"] }

    response = {
        "status" : "SUCCESS",
        "message" : "Sign Up Successful"
    }
    print(row)
    status=200
    try:
        if(usrDetails.find(myquery1).count() > 0):
            response["status"] = "FAIL"
            response["message"] = "Account with this username already exists"
        elif(usrDetails.find(myquery2).count() > 0):
            response["status"] = "FAIL"
            response["message"] = "Account with this Email ID already exists"
        else:
            usrDetails.insert_one(row)
    except:
            response["status"] = "ERROR"
            status = 400

    response_pickled = jsonpickle.encode(response)
    return Response(response=response_pickled,
           status=status , mimetype="application/json")

# start flask app
app.run(host="127.0.0.1", port=5000)