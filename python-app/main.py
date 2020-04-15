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


cache = Cache(config={
    "DEBUG": True,          # some Flask specific configs
    "CACHE_TYPE": "simple",  # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 300
})

app = Flask(__name__)
CORS(app)
cache.init_app(app)

DATABASE = "test-db"
COLLECTION = "sample-requests"


def insertToMongo(data):
    myclient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient[DATABASE]
    mycollections = mydb[COLLECTION]
    x = mycollections.insert_one(data)

    return x.acknowledged


def updateProfileToMongo(data):
    myclient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient["STUDYBUDDY"]
    mycollections = mydb["user_details"]
    myquery = {"_id": ObjectId(data["_id"])}
    newvalues = {"$set": {"name": data["name"], "skills": data["skills"],
                          "courses": data["courses"], "department": data["department"]}}
    x = mycollections.update_one(myquery, newvalues)

    return x.acknowledged


def updatePostMongo(data, post_id):
    myclient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient[DATABASE]
    mycollections = mydb[COLLECTION]
    new_data = {"$set": data}
    res = mycollections.update_one({"_id": post_id}, new_data)

    return res.modified_count


def getPostsFromMongo(database=DATABASE, collection=COLLECTION):
    mongoClient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    posts = [x for x in mongoClient[database]
             [collection].find().sort('_id', -1)]
    print("pulled {} posts from MongoDB, total size: {} bytes".format(
        len(posts), str(sys.getsizeof(posts))))
    return posts


@app.route('/status', methods=["GET"])
@app.route('/', methods=["GET"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
def status():
    return "app is running!"


@app.route('/suggest', methods=["GET"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
@cache.cached(timeout=50)
def suggest():
    print("In suggest")
    return dumps(getPostsFromMongo())

##### POST ######
@app.route('/requests/create', methods=["POST"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
def create_post():
    req = request.json
    data = {}

    try:
        data["username"] = "test"
        data["course"] = req["course"]
        data["skill"] = req["skill"]
        data["msg"] = req["msg"]
        data["tag"] = req["tag"]
        data["interested_count"] = 0
        data["interested_people"] = []
        data["post_time"] = datetime.datetime.now()

        x = insertToMongo(data)
        logging.info("Succesfully pushed to MongoDB")

        send_to_kafka(data)
        logging.info("Succesfully pushed to Kafka queue")

        response_data = {
            "sucess": True,
            "status_code": 200
        }

    except:
        response_data = {
            "sucess": False,
            "status_code": 404
        }

    return jsonify(response_data)


@app.route('/requests/update/<id>', methods=["PUT"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
def update_post(id):
    req = request.json
    print(id)
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
            "status_code": 200
        }

    except:

        response_data = {
            "sucess": False,
            "status_code": 404
        }

    # for x in mycollections.find({ "_id":post_id }):
    #     print('After',x)

    return jsonify(response_data)


@app.route('/requests/delete/<id>', methods=["DELETE"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
def delete_post(id):
    post_id = ObjectId(id)

    myclient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient[DATABASE]
    mycollections = mydb[COLLECTION]
    res = mycollections.delete_one({"_id": post_id})

    return 'Success'


@app.route('/api/profile', methods=["GET"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'application/json'])
def getProfileFromMongo(database="STUDYBUDDY", collection="user_details"):
    mongoClient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    profiles = [x for x in mongoClient[database][collection].find()]
    return dumps(profiles[0])


@app.route('/api/profile', methods=["PUT"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'application/json'])
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
