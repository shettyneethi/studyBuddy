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
            'name': 'Test_Name',
            'skills': 'Test_Skills',
            'courses': 'Test_Courses',
            'department': 'Test_Department'
        }

        self.failed_post = {
            'skills': 'Test_Skills',
            'courses': 'Test_Courses',
            'department': 'Test_Department'
        }

    @patch('main.pymongo.MongoClient')
    def test_success_profile_creation(self, mock_client):

        response = self.client().post('/api/profile',
                                      headers={'Content-Type': 'application/json'}, data=json.dumps(self.success_post))
        self.assertEqual(response.status, '200 OK')
        self.assertEqual(
            response.data, b'{"status_code":200,"success":true}\n')

    @patch('main.pymongo.MongoClient')
    def test_failed_profile(self, mock_client):

        response = self.client().post('/api/profile',
                                      headers={'Content-Type': 'application/json'}, data=json.dumps(self.failed_post))
        self.assertEqual(response.status, '200 OK')
        self.assertEqual(
            response.data, b'{"status_code":404,"success":false}\n')

    def test_success_get_profile(self):
        response = self.client().get('/api/profile')
        self.assertEqual(response.status, '200 OK')


if __name__ == "__main__":
    unittest.main()
