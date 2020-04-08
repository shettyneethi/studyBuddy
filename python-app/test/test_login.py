import unittest
import os
import json
import sys
from flask import Flask
from unittest.mock import Mock, patch
sys.path.append("..")
import login

class LoginAPITest(unittest.TestCase):
  def setUp(self):
    self.client = login.app.test_client
    self.login_request_success = {
        "user_name" : "admin",
        "password" : "password"
    }
    self.login_request_fail = {
        "user_name" : "admin",
        "password" : "admin"
    }
    self.signup_request_success = {
        "user_name" : "guest",
        "password" : "password",
        "email" : "guest@gmail.com"
    }
    self.signup_request_fail = {
        "user_name" : "admin",
        "password" : "password",
        "email" : "admin@gmail.com"
    }

  @patch('login.pymongo.MongoClient')
  def  test_success_login(self, mock_client):
    mock_client()["STUDYBUDDY"]["user_details"].find(self.login_request_success).count.return_value = 1
    # print("here"+str(mock_client()["STUDYBUDDY"]["user_details"].find(self.login_request_success)))
    response = self.client().post('/api/login', headers={'Content-Type': 'application/json'}, data=json.dumps(self.login_request_success))
    print(response)
    self.assertEqual(response.status, '200 OK')
    self.assertEqual(response.data, b'{"status": "SUCCESS"}')

  @patch('login.pymongo.MongoClient')
  def  test_fail_login(self, mock_client):
      mock_client()["STUDYBUDDY"]["user_details"].find(self.login_request_fail).count.return_value = 0
      # print("here"+str(mock_client["STUDYBUDDY"]["user_details"].find(self.login_request_fail)))
      response = self.client().post('/api/login', headers={'Content-Type': 'application/json'}, data=json.dumps(self.login_request_fail))
      print(response)
      self.assertEqual(response.status, '200 OK')
      self.assertEqual(response.data, b'{"status": "FAIL"}')

  @patch('login.pymongo.MongoClient')
  def  test_success_signup(self, mock_client):
        mock_client()["STUDYBUDDY"]["user_details"].find({ "user_name": "guest"}).count.return_value = 0
        mock_client()["STUDYBUDDY"]["user_details"].find({ "email": "guest@gmail.com"}).count.return_value = 0

        response = self.client().post('/api/signup', headers={'Content-Type': 'application/json'}, data=json.dumps(self.signup_request_success))
        # print(response)
        self.assertEqual(response.status, '200 OK')
        self.assertEqual(response.data, b'{"message": "Sign Up Successful", "status": "SUCCESS"}')

  @patch('login.pymongo.MongoClient')
  def  test_fail_signup(self, mock_client):
        mock_client()["STUDYBUDDY"]["user_details"].find({ "user_name": "guest"}).count.return_value = 1
        response = self.client().post('/api/signup', headers={'Content-Type': 'application/json'}, data=json.dumps(self.signup_request_success))
        # print(response)
        self.assertEqual(response.status, '200 OK')
        self.assertEqual(response.data, b'{"message": "Account with this username already exists", "status": "FAIL"}')

    

if __name__ == "__main__":
    unittest.main()

