from kafka import KafkaConsumer
from flask import Flask, Response
from flask_cors import CORS, cross_origin
from flask_caching import Cache


app = Flask(__name__)
CORS(app)
KAFKA_IP = '34.106.95.122'
TOPIC_NAME = 'posts'

@app.route('/status', methods=["GET"])
@app.route('/', methods=["GET"])
@cross_origin(origins='*', allow_headers=['Content-Type', 'Authorization'])
def status():
    return "app is running!"


def getConsumer(TOPIC_NAME,readLatest=False):
    if (readLatest):
         return KafkaConsumer(TOPIC_NAME,
                         bootstrap_servers=KAFKA_IP, 
                         group_id=None,
                         auto_offset_reset='latest',
                         enable_auto_commit=False
                         )
    else:
        return KafkaConsumer(TOPIC_NAME,
                         bootstrap_servers=KAFKA_IP, 
                         group_id=None
                        )



@app.route('/api/posts', methods=["GET"])
@cross_origin(origins='*',allow_headers=['Content-Type','Authorization'])
def subcribe_to_kafka():
    print('Message')
    consumer = getConsumer('posts',readLatest=True) 
    def events():
        for message in consumer:
            if message is not None:
                print(message)
                yield 'data: {0}\n\n'.format(message.value.decode('ascii'))
        consumer.close()
    res = Response(events(), mimetype="text/event-stream") 
    print(res.headers)
    return res

@app.route('/api/updated/posts', methods=["GET"])
@cross_origin(origins='*',allow_headers=['Content-Type','Authorization'])
def subcribe_to_kafka_updated_posts():
    print('Message')
    consumer = getConsumer('updated_posts', readLatest=True) 
    def events():
        for message in consumer:
            if message is not None:
                print(message)
                yield 'data: {0}\n\n'.format(message.value.decode('ascii'))
        consumer.close()
    res = Response(events(), mimetype="text/event-stream") 
    print(res.headers)
    return res
            
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081, ssl_context='adhoc')

