import json
from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse, abort, marshal, fields
from pyduino import *
import time

# Initialize Flask
app = Flask(__name__)
api = Api(app)
@app.route('/servo')
def index():

    a = Arduino()
    # if your arduino was running on a serial port other than '/dev/ttyACM0/'
    # declare: a = Arduino(serial_port='/dev/ttyXXXX')

    time.sleep(3)
    # sleep to ensure ample time for computer to make serial connection

    # initialize the digital pin as output

    time.sleep(1)
    # allow time to make connection
    a.analog_write(1,1)

    return jsonify({'name': 'Natalie The National Park Worker',
                    'email': 'natalie@outlook.com'})


app.run(debug=True)