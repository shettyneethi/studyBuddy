import unittest
import os
import json
import sys
from flask import Flask
from unittest.mock import Mock, patch
sys.path.append("..")
import main

class UsersTest(unittest.TestCase):
  def setUp(self):
    self.client = main.app.test_client
    self.success_post = {
      'course': 'CSCI 5828',
      'skill': 'GCP',
      'msg': 'Looking for a study buddy',
      'tag': 'Assignment'
    }

    self.failed_post = {
      'course': 'CSCI 5828',
      'skill': 'GCP',
      'msg': 'Looking for a study buddy'
    }
    self.id = {"id":{'$oid':'1225666777776'}}

    self.post_update_success = {
      'interested_people': ['test'],
     'interested_count': 1, 
     'id': {'$oid': '5e9657ffff088ab6993504f8'}
     }

    self.post_update_fail = {
      'interested_people': ['test'],
     'id': {'$oid': '5e9657ffff088ab6993504f8'}
     }

  @patch('main.pymongo.MongoClient')
  def test_mongo(self, mock_client):
    print(mock_client['test-db']['sample-requests'].insert_one.return_value.acknowledged)
    mock_client()['test-db']['sample-requests'].insert_one.return_value.acknowledged = True
    expected = True
    data = {"key1":"1", "key2":"2"}

    self.assertEqual(expected, main.insertToMongo(data))

  @patch('main.pymongo.MongoClient')
  def test_update_mongo(self, mock_client):
    print(mock_client()['test-db']['sample-requests'].update_one.return_value.modified_count)
    mock_client()['test-db']['sample-requests'].update_one.return_value.modified_count = 1
    expected = 1
    data = {
     'interested_count': 2,
     'interested_people':['test','test'],
     'post_id':{"id":{'$oid':'1225666777776'}}
    }

    self.assertEqual(expected, main.updatePostMongo(data,self.id))

  @patch('main.pymongo.MongoClient')
  def  test_success_post_creation(self, mock_client):

    response = self.client().get('/suggest')
    self.assertEqual(response.status, '200 OK')

  @patch('main.pymongo.MongoClient')
  def  test_success_post_creation(self, mock_client):

    response = self.client().post('/requests/create', headers={'Content-Type': 'application/json'}, data=json.dumps(self.success_post))
    self.assertEqual(response.status, '200 OK')
    self.assertEqual(response.data, b'{"status_code":200,"sucess":true}\n')

  @patch('main.pymongo.MongoClient')
  def  test_failed_post(self, mock_client):

    response = self.client().post('/requests/create', headers={'Content-Type': 'application/json'}, data=json.dumps(self.failed_post))
    self.assertEqual(response.status, '200 OK')
    self.assertEqual(response.data, b'{"status_code":404,"sucess":false}\n')
    
  @patch('main.pymongo.MongoClient')
  def  test_success_post_update(self, mock_client):

    response = self.client().put('/requests/update/'+str(json.dumps(self.id)), headers={'Content-Type': 'application/json'}, data=json.dumps(self.post_update_success))
    self.assertEqual(response.status, '200 OK')
    self.assertEqual(response.data, b'{"status_code":200,"sucess":true}\n')

  @patch('main.pymongo.MongoClient')
  def  test_fail_post_update(self, mock_client):

    response = self.client().put('/requests/update/'+str(json.dumps(self.id)), headers={'Content-Type': 'application/json'}, data=json.dumps(self.post_update_fail))
    self.assertEqual(response.status, '200 OK')
    self.assertEqual(response.data, b'{"status_code":404,"sucess":false}\n')

if __name__ == "__main__":
    
    unittest.main()

