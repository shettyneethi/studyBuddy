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
    # print(data["user_name"])
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

# start flask app
app.run(host="0.0.0.0", port=5000)