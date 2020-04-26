# Starter code
# intended to test out react auto-suggest feature
##

from flask import Flask, Response
from flask_cors import CORS, cross_origin
from flask_caching import Cache
import pymongo
import sys
from bson.json_util import dumps
from flask import request
import json
import datetime
from flask import jsonify
from utility.producer import send_to_kafka, send_to_kafka_updated_posts
from bson.objectid import ObjectId
import logging
logging.basicConfig(filename='main-service.out', level=logging.INFO)
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
import jsonpickle
import io
import hashlib
import json 


cache = Cache(config={
    "DEBUG": True,          # some Flask specific configs
    "CACHE_TYPE": "simple",  # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 300
})

app = Flask(__name__)
CORS(app)
cache.init_app(app)

app.config['JWT_SECRET_KEY'] = 'rishitha'  # Change this!
jwt = JWTManager(app)

DATABASE = "test-db"
POSTS_COLLECTION = "sample-requests"
USERS_COLLECTION = "user_details"


def insertToMongo(data):
    myclient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient[DATABASE]
    mycollections = mydb[POSTS_COLLECTION]
    x = mycollections.insert_one(data)

    myclient.close()

    return x.acknowledged


def updateProfileToMongo(data):
    myclient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient["STUDYBUDDY"]
    mycollections = mydb[USERS_COLLECTION]
    myquery = {"_id": ObjectId(data["_id"])}
    newvalues = {"$set": {"name": data["name"], "skills": data["skills"],
                          "courses": data["courses"], "department": data["department"]}}
    x = mycollections.update_one(myquery, newvalues)

    myclient.close()

    return x.modified_count


def updatePostMongo(data, post_id):
    myclient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient[DATABASE]
    mycollections = mydb[POSTS_COLLECTION]
    new_data = {"$set": data}
    res = mycollections.update_one({"_id": post_id}, new_data)

    myclient.close()

    return res.modified_count


def deletePostMongo(post_id):
    myclient = pymongo.MongoClient(
            "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient[DATABASE]
    mycollections = mydb[POSTS_COLLECTION]
    res = mycollections.delete_one({"_id": post_id})

    myclient.close()

    return res.deleted_count


def getPostsFromMongo(database=DATABASE, collection=POSTS_COLLECTION):
    mongoClient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    query = { "isCompleted" : False }
    posts = [x for x in mongoClient[database]
             [collection].find(query).sort('_id', -1)]
    print("pulled {} posts from MongoDB, total size: {} bytes".format(
        len(posts), str(sys.getsizeof(posts))))
    
    mongoClient.close()
    return posts


def getEmailIDofInterested(post_id):
    mongoClient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = mongoClient[DATABASE]
    mycollection = mydb[POSTS_COLLECTION]
    result = []
    
    query = {"_id": post_id}
    post =  mycollection.find(query)
    if(post.count() == 1):
        usr_names = set(post[0]["interested_people"])
        for usr in usr_names:
            try :
                result.append(mongoClient["STUDYBUDDY"][USERS_COLLECTION].find({ "user_name": usr })[0]["email"])
            except:
                continue
    
    mongoClient.close()
    return result


@app.route('/api/getContactDetails/<id>', methods=["GET"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
@jwt_required
def getContactDetails(id):
    post_id = ObjectId(id)
    contacts = getEmailIDofInterested(post_id)

    return Response(response=dumps(contacts),
           status=200 , mimetype="application/json")


@app.route('/api/login', methods=['POST'])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
def login():
    
    myclient = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient["STUDYBUDDY"]
    usrDetails = mydb[USERS_COLLECTION]
    data = request.get_json()
    hashed_pwd = hashlib.md5(data["password"].encode()).hexdigest()

    myquery = { "user_name": data["user_name"], "password" : hashed_pwd }

    response = {
        "status" : "FAIL",
        "token" : "",
        "user_name": ""
    }

    status=200
    try:
        if(usrDetails.find(myquery).count() == 1):
            token = create_access_token(identity=data["user_name"])
            response["status"] = "SUCCESS"
            response["token"] = token
            response["user_name"] = data["user_name"]
            # usrDetails.update(myquery, {"$set": {"token": token}})

    except:
            response["status"] = "ERROR"
            status = 400

    response_pickled = jsonpickle.encode(response)
    resp = Response(response=response_pickled,
           status=status , mimetype="application/json")

    myclient.close()
   
    return resp


@app.route('/api/signup', methods=['POST'])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
def signup():
    myclient = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient["STUDYBUDDY"]
    usrDetails = mydb[USERS_COLLECTION]
    data = request.get_json()
    
    hashed_pwd = hashlib.md5(data["password"].encode()).hexdigest()

    row = { "user_name": data["user_name"], "password" : hashed_pwd , "email": data["email"] , "skills": "", "courses": "", "department":""}
    myquery1 = { "user_name": data["user_name"] }
    myquery2 = { "email": data["email"] }

    response = {
        "status" : "FAIL",
        "messagpost_ide" : "Sign Up Failed!",
        "user_name": "",
        "token" : "" 
    }
    
    status = 200
    
    try:
        if(usrDetails.find(myquery1).count() > 0):
            response["message"] = "Account with this username already exists"

        elif(usrDetails.find(myquery2).count() > 0):
            response["message"] = "Account with this Email ID already exists"

        else:
            token = create_access_token(identity=data["user_name"])
            # row['token']= token
            usrDetails.insert_one(row)
            response["status"] = "SUCCESS"
            response["message"] = "Sign Up Success!"
            response["token"] = token
            response["user_name"] = data["user_name"]

    except:
            response["status"] = "ERROR"
            status = 400
            
    response_pickled = jsonpickle.encode(response)
    
    resp = Response(response=response_pickled,
           status=status , mimetype="application/json")
    print(resp)

    myclient.close()
    
    return resp


@app.route('/api/logout', methods=['POST'])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
def logout():
    myclient = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient["STUDYBUDDY"]
    usrDetails = mydb[USERS_COLLECTION]
    data = request.get_json()
    myquery = { "token": data["token"] }

    response = {
        "status" : "FAIL"
    }
    status=200

    try:
        if(usrDetails.find(myquery).count() == 1):
            # usrDetails.update(myquery, {"$unset": {"token":1} } )
            response["status"] = "SUCCESS"
    except:
            response["status"] = "ERROR"
            status = 400

    response_pickled = jsonpickle.encode(response)
    resp =  Response(response=response_pickled,
           status=status , mimetype="application/json")

    myclient.close()
    
    return resp


@app.route('/status', methods=["GET"])
@app.route('/', methods=["GET"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
def status():
    return "app is running!"


@app.route('/suggest', methods=["GET"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
@cache.cached(timeout=50)
@jwt_required
def suggest():
    print("In suggest")
    current_user = get_jwt_identity()
    print(current_user)
    return dumps(getPostsFromMongo())


##### POST ######
@app.route('/requests/create', methods=["POST"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
@jwt_required
def create_post():
    req = request.json
    data = {}

    current_user = get_jwt_identity()

    try:
        data["username"] = current_user
        data["course"] = req["course"]
        data["skill"] = req["skill"]
        data["msg"] = req["msg"]
        data["tag"] = req["tag"]
        data["interested_count"] = 0
        data["interested_people"] = []
        data["post_time"] = datetime.datetime.now()
        data["isCompleted"] = False

        x = insertToMongo(data)
        logging.info("Succesfully pushed to MongoDB")

        send_to_kafka(data)
        logging.info("Succesfully pushed to Kafka queue")

        response_data = {
            "sucess": True,
            "message": "Successful Post creation"
        }

    except:
        response_data = {
            "sucess": False,
            "message": "Invalid data"
        }

    return jsonify(response_data)


@app.route('/requests/update/<id>', methods=["PUT"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
def update_post(id):
    req = request.json
    data = {}
    try:

        data["interested_count"] = req["interested_count"]
        data["interested_people"] = req["interested_people"]
        post_id = ObjectId(req["id"].get('$oid'))

        res = updatePostMongo(data, post_id)

        updated_data = data
        updated_data['_id'] = req["id"]
        send_to_kafka_updated_posts(updated_data)

        response_data = {
            "sucess": True,
            "message": "Successful Post updation"
        }

    except:

        response_data = {
            "sucess": False,
            "message": "Invalid data"
        }

    return jsonify(response_data)

@app.route('/requests/delete/<id>', methods=["DELETE"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization', "credentials"])
def delete_post(id):
    try:
        post_id = ObjectId(id)
        res = deletePostMongo(post_id)
        send_to_kafka_updated_posts({'_id':id})
    
        response_data = {
                "sucess": True,
                "message": "Successful post deletion"
            }
    except:

        response_data = {
            "sucess": False,
            "message": "Invalid post_id"
        }

    return jsonify(response_data)


@app.route('/api/profile/<user_name>', methods=["GET"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
@jwt_required
def getProfileFromMongo(user_name):
    print("In profile")
    print(user_name)
    mongoClient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")

    res = mongoClient["STUDYBUDDY"][USERS_COLLECTION].find({ "user_name": user_name})
    resp =  Response(response=dumps(res),
           status=200 , mimetype="application/json")

    mongoClient.close()
    
    return resp


@app.route('/api/profile', methods=["GET"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
@jwt_required
def get_profile():
    print("In changed profile")
    user_name = get_jwt_identity()
    print(user_name)
    mongoClient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    res = mongoClient["STUDYBUDDY"][USERS_COLLECTION].find({ "user_name": user_name})

    resp =  Response(response=dumps(res),
           status=200 , mimetype="application/json")

    print(resp)

    mongoClient.close()
    return resp


@app.route('/api/profile', methods=["PUT"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
@jwt_required
def edit_profile():
    req = request.json
    data = {}
    try:
        data["name"] = req["name"]
        data["skills"] = req["skills"]
        data["courses"] = req["courses"]
        data["department"] = req["department"]
        data["_id"] = req["_id"]
        x = updateProfileToMongo(data)
        logging.info("Profile succesfully pushed to MongoDB")

        response_data = {
            "success": True,
            "status_code": 200
        }

    except:
        response_data = {
            "success": False,
            "status_code": 404
        }

    return jsonify(response_data)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
