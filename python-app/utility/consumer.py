from kafka import KafkaConsumer
from bson.json_util import loads


KAFKA_IP = '34.106.95.122'
TOPIC_NAME = 'posts'

consumer = KafkaConsumer(TOPIC_NAME,
                         bootstrap_servers=KAFKA_IP, 
                         group_id=None,
                         auto_offset_reset='earliest',                         
                         )


for message in consumer:
    if message is not None:
        print (loads(message.value.decode('ascii')))
