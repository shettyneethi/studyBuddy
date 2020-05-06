from flask import Flask, Response
from flask_cors import CORS, cross_origin
from flask_caching import Cache
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
import atexit
import pymongo
import sys
from collections import Counter
from bson.json_util import dumps
import json 
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
# from multiexit import register
# import time

# create flask app
app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'rishitha'  # Change this!
jwt = JWTManager(app)

DATABASE = "test-db"
DATABASE_USERS = "STUDYBUDDY"
POSTS_COLLECTION = "sample-requests"
USERS_COLLECTION = "user_details"


skill_res = {}


@app.route('/analysis/<skill>', methods=["GET"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
@jwt_required
def analyse_user_skills(skill):
    print('In analyze user skills')
    print("skill", skill)
    print('Skill res', skill_res)

    data = {}
    
    if skill.lower() not in skill_res:
        return data

    backgroundColor = ['#E38627','#C13C37', '#6A2135', '#f00', '#0f0']
    data = {'backgroundColor': backgroundColor}
    
    for tup in skill_res[skill.lower()]:
        if 'skill' in data:
            data['skill'].append(tup[0])
        else:
            data['skill'] = [tup[0]]

        if 'data' in data:
            data['data'].append(tup[1])
        else:
            data['data'] = [tup[1]]
    
    print("DATA", data)
    
    return data
    

def analyze_skills(post_details, database=DATABASE_USERS, collection=USERS_COLLECTION):
    skill_users = {}
    
    for post in post_details:
        skill_interested = []
        for interested_user in post['interested_people']:
            mongoClient = pymongo.MongoClient(
            "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")


            skill_user = [x for x in mongoClient[database][collection].find({"name":interested_user}, {"skills": 1, "_id": 0})]

            if len(skill_user)>0:
                skill_interested.extend(skill_user[0]['skills'].split(', '))

        # print("INTERSTED",skill_interested)

        if post['skill'] in skill_users:
            skill_users[post['skill']].extend(skill_interested)
        else:
            skill_users[post['skill']] = skill_interested

        # print('SKILL_USERS', skill_users)

        

    for skill in skill_users:
        l = Counter(skill_users[skill])
        
        # l = [(i, l[i] / len(l) * 100.0) for i in l]
        # print(l)
        if len(l)>=5:
            skill_res[skill] = l.most_common(5)
        else:
            skill_res[skill] = l.most_common(len(l))

    
    # return skill_res
        
def getPostsFromMongo(query, database=DATABASE, collection=POSTS_COLLECTION):
    mongoClient = pymongo.MongoClient(
        "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
    posts = [x for x in mongoClient[database]
             [collection].find(query, {"skill": 1, "interested_people": 1, "_id": 0})]
    print("pulled {} posts from MongoDB, total size: {} bytes".format(
        len(posts), str(sys.getsizeof(posts))))

    mongoClient.close()
    return posts


#### ANALYZING SKILLS EVERY 10 SEC ##############
def collect_skills():
    print("Hello")
    myQuery = { "isCompleted" : True,  'interested_people': {'$not': {'$size': 0}}}
    post_details = getPostsFromMongo(query = myQuery)
    return analyze_skills(post_details) 
    
  

# create schedule for printing time
scheduler = BackgroundScheduler()
scheduler.start()
scheduler.add_job(
    func=collect_skills,
    trigger=IntervalTrigger(seconds=10),
    id='printing_time_job',
    max_instances=1,
    name='Print time every 2 seconds',
    replace_existing=True)

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())

# run Flask app in debug mode
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8082, debug=True)
