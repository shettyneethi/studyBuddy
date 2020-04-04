from flask import Flask, request, Response
import pymongo
import jsonpickle
import io


# Initialize the Flask application
app = Flask(__name__)
myclient = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
mydb = myclient["STUDYBUDDY"]


# route http posts to this method
@app.route('/api/login', methods=['POST'])
def login():
    usrDetails = mydb["user_details"]
    data = request.get_json()
    myquery = { "user_name": data["user_name"], "password" : data["password"] }

    response = {
        "status" : "FAIL"
    }

    status=200
    print(myquery)

    try:
        if(usrDetails.find(myquery).count() == 1):
            response["status"] = "SUCCESS"
    except:
            response["status"] = "ERROR"
            status = 400

    response_pickled = jsonpickle.encode(response)
    return Response(response=response_pickled,
           status=status , mimetype="application/json")

@app.route('/api/signup', methods=['POST'])
def signup():
    usrDetails = mydb["user_details"]
    data = request.get_json()
    row = { "user_name": data["user_name"], "password" : data["password"] , "email": data["email"]}
    myquery1 = { "user_name": data["user_name"] }
    myquery2 = { "email": data["email"] }

    response = {
        "status" : "SUCCESS",
        "message" : "Sign Up Successful"
    }

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
app.run(host="0.0.0.0", port=5000)