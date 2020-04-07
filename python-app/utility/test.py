from time import sleep
from json import dumps
from kafka import KafkaProducer
import logging
logging.basicConfig(level=logging.INFO)


import unittest
import os
import json
import producer
from unittest.mock import Mock, patch


from flask import Flask


class UsersTest(unittest.TestCase):
  """
  Users Test Case
  """
#   def setUp(self):
#     """
#     Test Setup
#     """
  @patch('producer.KafkaProducer')
  def  test_kafka_producer(self,mock_producer):
    test ='{"_id":{"$oid":"5e780494e79c2ce922c888e1"},"username":"test","course":"Kafka Test","skill":"Kafka Test","msg":"This is a test message","tag":"Project","post_time":{"$date":{"$numberLong":"1584902196429"}}}'
    expected_topic = 'posts'
    mock_producer.return_value.send.return_value.get.return_value.topic = 'posts'
    actual = producer.send_to_kafka(test)
    self.assertEqual(expected_topic, actual)
    

      
if __name__ == "__main__":
    unittest.main()




# produce json messages
# producer = KafkaProducer(bootstrap_servers=['34.106.95.122'], value_serializer=lambda m: dumps(m).encode('ascii'))
# producer.send('test', {"key":"value"})
# producer.flush()