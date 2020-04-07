import pytest
from flask_cors import CORS, cross_origin
import pymongo
from flask import request


data = {}
myclient = pymongo.MongoClient(
    "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
mydb = myclient["STUDYBUDDY"]
mycollections = mydb["user_details"]

data["name"] = "Test_Name"
data["skills"] = "Test_Skills"
data["courses"] = "Test_Courses"
data["department"] = "Test_Department"


def test_post_profile():
    mycollections.test.insert_one(data)
    assert mycollections.test.find_one()['name'] == "Test_Name"


def test_get_profile():

    assert mycollections.test.find_one()['name'] == "Test_Name"
    mycollections.test.drop()
