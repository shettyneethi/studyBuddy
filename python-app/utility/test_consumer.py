import unittest
import os
import json
import consumer
from unittest.mock import Mock, patch

from flask import Flask


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
  def  test_post_updation(self, mock_consumer):
    response = self.client().get('/posts')
    self.assertEqual(response.status, '200 OK')


if __name__ == "__main__":
    unittest.main()

