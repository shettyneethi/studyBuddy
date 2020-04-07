import unittest
import pymongo
import logging
import sys
logging.basicConfig(level=logging.DEBUG, stream=sys.stdout)

class UsersTest(unittest.TestCase):
    data = {}
    collection = None

    def setUp(self):
        print("Setting up")
        myclient = pymongo.MongoClient(
            "mongodb+srv://admin:admin@cluster0-jacon.gcp.mongodb.net/test?retryWrites=true&w=majority")
        mydb = myclient["STUDYBUDDY"]
        self.collection = mydb["user_details"]

        self.data["name"] = "Test_Name"
        self.data["skills"] = "Test_Skills"
        self.data["courses"] = "Test_Courses"
        self.data["department"] = "Test_Department"


    def test_post_profile(self):
        print(self.collection)
        self.collection.test.insert_one(self.data)
        assert self.collection.test.find_one()['name'] == "Test_Name"

    def tearDown(self):
        print("tearing down")
        self.collection.test.drop()

if __name__ == "__main__":
    unittest.main()