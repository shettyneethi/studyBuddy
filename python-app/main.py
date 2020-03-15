## Starter code
## intended to test out react auto-suggest feature
## 

from flask import Flask
from flask_cors import CORS, cross_origin
from flask_caching import Cache
import pymongo
import sys
from bson.json_util import dumps

cache = Cache(config = {
    "DEBUG": True,          # some Flask specific configs
    "CACHE_TYPE": "simple", # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 300
})

app = Flask(__name__)
CORS(app)
cache.init_app(app)

DATABASE = "test-db"
COLLECTION = "posts" 

# Load up posts from mongoDB on startup
def getPostsFromMongo(database = DATABASE, collection = COLLECTION):
    mongoClient = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    posts = [x for x in mongoClient[database][collection].find()]
    print("pulled {} posts from MongoDB, total size: {} bytes".format(len(posts), str(sys.getsizeof(posts))))
    return posts

@app.route('/status', methods=["GET"])
@app.route('/', methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def status():
    return "app is running!"

@app.route('/suggest', methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
@cache.cached(timeout=50)
def suggest():
    return dumps(getPostsFromMongo())

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)


