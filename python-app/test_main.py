import unittest
import os
import json
import main
from flask import Flask
from unittest.mock import Mock, patch


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

  @patch('main.pymongo.MongoClient')
  def test_mongo(self, mock_client):
    print(mock_client['test-db']['sample-posts'].insert_one.return_value.acknowledged)
    mock_client()['test-db']['sample-posts'].insert_one.return_value.acknowledged = True
    expected = True
    data = {"key1":"1", "key2":"2"}

    self.assertEqual(expected, main.insertToMongo(data))
  
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
    
    

if __name__ == "__main__":
    unittest.main()

