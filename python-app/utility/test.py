from time import sleep
from json import dumps
from kafka import KafkaProducer
import logging
logging.basicConfig(level=logging.INFO)


# produce json messages
producer = KafkaProducer(bootstrap_servers=['34.106.95.122'], value_serializer=lambda m: dumps(m).encode('ascii'))
producer.send('test', {"key":"value"})
producer.flush()