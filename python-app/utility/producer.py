# Extended from original documentation at:
# https://kafka-python.readthedocs.io/en/master/usage.html#kafkaproducer

from kafka import KafkaProducer
from bson.json_util import dumps
import logging
logging.basicConfig(level=logging.INFO)

KAFKA_IP = '34.106.95.122'
TOPIC_NAME = 'posts'

producer = KafkaProducer(bootstrap_servers=[KAFKA_IP], value_serializer=lambda m: dumps(m).encode('ascii'))
test ='{"_id":{"$oid":"5e780494e79c2ce922c888e1"},"username":"Kafka","course":"Kafka Test","skill":"Kafka Test","msg":"This is a test message","tag":"Project","post_time":{"$date":{"$numberLong":"1584902196429"}}}'


def on_send_success(record_metadata):
    print(record_metadata.topic)
    print(record_metadata.partition)
    print(record_metadata.offset)

def on_send_error(excp):
    logging.error('Failed to push to Kafka', exc_info=excp)

# produce json messages
def send_to_kafka(msg, topic=TOPIC_NAME):
    logging.info(msg)
    producer.send(TOPIC_NAME, msg)
    producer.flush()


if __name__ == '__main__':
    send_to_kafka(test)
