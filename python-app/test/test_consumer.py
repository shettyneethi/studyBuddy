import unittest
import os
import json
from unittest.mock import Mock, patch
from flask import Flask
import sys
sys.path.append("../utility")
import consumer
import logging
logging.basicConfig(level=logging.DEBUG, stream=sys.stdout)


class UsersTest(unittest.TestCase):
  """
  Users Test Case
  """
  def setUp(self):
    """
    Test Setup
    """
    self.client = consumer.app.test_client

  @patch('consumer.KafkaConsumer')
  def  test_post_creation(self, mock_consumer):
    response = self.client().get('/api/posts')
    self.assertEqual(response.status, '200 OK')

  @patch('consumer.KafkaConsumer')
  def  test_post_updation(self, mock_consumer):
    response = self.client().get('/api/updated/posts')
    self.assertEqual(response.status, '200 OK')

  @patch('consumer.KafkaConsumer')
  def  test_post_deletion(self, mock_consumer):
    response = self.client().get('/api/deleted/posts')
    self.assertEqual(response.status, '200 OK')


if __name__ == "__main__":
    unittest.main()

