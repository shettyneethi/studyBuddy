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
from utility.producer import send_to_kafka
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
COLLECTION = "sample-posts"


def insertToMongo(data):
    myclient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient[DATABASE]
    mycollections = mydb[COLLECTION]
    x = mycollections.insert_one(data)

    return x.acknowledged


def insertProfileToMongo(data):
    myclient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    mydb = myclient["STUDYBUDDY"]
    mycollections = mydb["user_details"]
    x = mycollections.insert_one(data)

    return x.acknowledged


def getPostsFromMongo(database=DATABASE, collection=COLLECTION):
    mongoClient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    posts = [x for x in mongoClient[database][collection].find()]
    print("pulled {} posts from MongoDB, total size: {} bytes".format(
        len(posts), str(sys.getsizeof(posts))))
    return posts


@app.route('/status', methods=["GET"])
@app.route('/', methods=["GET"])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def status():
    return "app is running!"


@app.route('/suggest', methods=["GET"])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
@cache.cached(timeout=50)
def suggest():
    return dumps(getPostsFromMongo())

##### POST ######
@app.route('/requests/create', methods=["POST"])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
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


@app.route('/requests/delete', methods=["DELETE"])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def delete_post():
    req = request.json
    # username = req["username"]
    course = req["course"]
    skill = req["skill"]
    msg = req["message"]
    tag = req["tag"]


@app.route('/api/profile', methods=["GET"])
@cross_origin(origin='*', headers=['Content-Type', 'application/json'])
def getProfileFromMongo(database="STUDYBUDDY", collection="user_details"):
    mongoClient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    profiles = [x for x in mongoClient[database][collection].find()]
    return dumps(profiles[0])


@app.route('/api/profile', methods=["POST"])
@cross_origin(origin='*', headers=['Content-Type', 'application/json'])
def edit_profile():
    req = request.json
    data = {}
    try:
        data["name"] = req["name"]
        data["skills"] = req["skills"]
        data["courses"] = req["courses"]
        data["department"] = req["department"]

        x = insertProfileToMongo(data)
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
