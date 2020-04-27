import unittest
import os
import json
import sys
from flask import Flask
from unittest.mock import Mock, patch
sys.path.append("..")
import main
import datetime
from bson.objectid import ObjectId
from flask_jwt_extended import create_access_token, create_refresh_token
# from tests.utils import get_jwt_manager, make_headers
import jwt


class UsersTest(unittest.TestCase):

  def setUp(self):
    self.client = main.app.test_client
    self.DATABASE = "test_mongo"
    self.POSTS_COLLECTION = "test_posts"
   
    
    self.post_id = ObjectId()
    
    
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
    self.id = {"id":{'$oid':'5e9657ffff088ab6993504f8'}}
    self.invalid_id = '123456789'

    self.post_update_success = {
      'interested_people': ['test'],
     'interested_count': 1
     }

    self.post_update_fail = {
      'interested_people': ['test']
     }

    self.create_post_mongo_data = {
      'username': '',
      'course': 'CSCI 5828',
      'skill': 'GCP',
      'msg': 'Looking for a study buddy',
      'tag': 'Assignment',
      'interested_count':0,
      'interested_people':[],
      'post_time': datetime.datetime.now(),
      'isCompleted': False
    }

    self.access_token = ""
    self.fresh_access_token = ""
    

  
  def test_mongo_flask(self):
    x = main.insertToMongo(self.create_post_mongo_data, self.DATABASE, self.POSTS_COLLECTION)
    self.post_id = x[1]
    expected = 1
    data_update = {
     'interested_count': 2,
     'interested_people':['test','test'],
     'post_id':self.post_id
    }

    self.assertEqual(True, x[0])
    self.assertEqual(expected, main.updatePostMongo(data_update,self.post_id, self.DATABASE, self.POSTS_COLLECTION))
    self.assertEqual(expected, main.deletePostMongo(self.post_id, self.DATABASE, self.POSTS_COLLECTION))

  def make_headers(self,jwt):
    return {'Content-Type': 'application/json','Authorization': 'Bearer {}'.format(jwt)}

  def test_jwt_required(self):
    with main.app.test_request_context():
        self.access_token = create_access_token('username')
        self.refresh_token = create_refresh_token('username')

    response = self.client().get('/suggest', headers=None)
    self.assertEqual(response.status_code, 401)

    response = self.client().get('/suggest', headers=self.make_headers(self.refresh_token))
    self.assertEqual(response.status_code, 422)

    response = self.client().get('/suggest', headers=self.make_headers(self.access_token))
    self.assertEqual(response.status_code, 200)

    response = self.client().post('/requests/create', headers=None, data=json.dumps(self.success_post))
    self.assertEqual(response.status_code, 401)

    response = self.client().post('/requests/create', headers=self.make_headers(self.refresh_token), data=json.dumps(self.success_post))
    self.assertEqual(response.status_code, 422)

    response = self.client().post('/requests/create', headers=self.make_headers(self.access_token), data=json.dumps(self.success_post))
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data, b'{"message":"Successful Post creation","sucess":true}\n')


    response = self.client().post('/requests/create', headers=None, data=json.dumps(self.failed_post))
    self.assertEqual(response.status_code, 401)

    response = self.client().post('/requests/create', headers=self.make_headers(self.refresh_token), data=json.dumps(self.failed_post))
    self.assertEqual(response.status_code, 422)

    response = self.client().post('/requests/create', headers=self.make_headers(self.access_token), data=json.dumps(self.failed_post))
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data, b'{"message":"Invalid data","sucess":false}\n')

    x = main.insertToMongo(self.create_post_mongo_data)
    self.post_id = x[1]

    response = self.client().put('/requests/update/'+str(self.post_id), headers=self.make_headers(self.access_token), data=json.dumps(self.post_update_success))
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data, b'{"message":"Successful Post updation","sucess":true}\n')

    response = self.client().put('/requests/update/'+str(self.post_id), headers=self.make_headers(self.access_token), data=json.dumps(self.post_update_fail))
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data, b'{"message":"Invalid data","sucess":false}\n')

    response = self.client().delete('/requests/delete/'+str(self.post_id),headers=self.make_headers(self.access_token))
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data, b'{"message":"Successful post deletion","sucess":true}\n')

    response = self.client().delete('/requests/delete/'+str(self.invalid_id),headers=self.make_headers(self.access_token))
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data,  b'{"message":"Invalid post_id","sucess":false}\n')
  
if __name__ == "__main__":   
    unittest.main()
