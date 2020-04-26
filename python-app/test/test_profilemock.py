import unittest
import os
import json

from flask import Flask
import sys
from unittest.mock import Mock, patch
sys.path.append("..")
import main

class UsersTest(unittest.TestCase):
    def setUp(self):
        self.client = main.app.test_client
        self.success_post = {
            'name': 'Test_Name',
            'skills': 'Test_Skills',
            'courses': 'Test_Courses',
            'department': 'Test_Department',
            '_id': '5e9657ffff088ab6993504f8'
        }

        self.failed_post = {
            'skills': 'Test_Skills',
            'courses': 'Test_Courses',
            'department': 'Test_Department'
        }

    @patch('main.pymongo.MongoClient')
    def test_update_mongo(self, mock_client):
        mock_client()['test-db']['user_details'].update_one.return_value.modified_count = 1
        expected = 1
        data = {
            'name': 'Test_Name',
            'skills': 'Test_Skills',
            'courses': 'Test_Courses',
            'department': 'Test_Department',
            '_id': '5e9657ffff088ab6993504f8'
        }

        self.assertEqual(expected, main.updateProfileToMongo(data))

    @patch('main.pymongo.MongoClient')
    @patch('flask_jwt_extended.view_decorators.verify_jwt_in_request')
    def test_success_profile_creation(self, mock_client, mock_jwt):

        response = self.client().put('/api/profile',
                                      headers={'Content-Type': 'application/json'}, data=json.dumps(self.success_post))
        self.assertEqual(response.status, '200 OK')
        self.assertEqual(
            response.data, b'{"status_code":200,"success":true}\n')

    @patch('main.pymongo.MongoClient')
    @patch('flask_jwt_extended.view_decorators.verify_jwt_in_request')
    def test_failed_profile(self, mock_client, mock_jwt):

        response = self.client().put('/api/profile',
                                      headers={'Content-Type': 'application/json'}, data=json.dumps(self.failed_post))
        self.assertEqual(response.status, '200 OK')
        self.assertEqual(
            response.data, b'{"status_code":404,"success":false}\n')

    @patch('main.pymongo.MongoClient')
    @patch('flask_jwt_extended.view_decorators.verify_jwt_in_request')
    def test_success_get_profile(self, mock_client, mock_jwt):
        response = self.client().get('/api/profile')
        self.assertEqual(response.status, '200 OK')


if __name__ == "__main__":
    unittest.main()
