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

    PIN = 13
    a.set_pin_mode(PIN, 'O')
    # initialize the digital pin as output

    time.sleep(1)
    # allow time to make connection

    for i in range(0, 1000):
        if i % 2 == 0:
            a.digital_write(PIN, 1)  # turn LED on
        else:
            a.digital_write(PIN, 0)  # turn LED off

        time.sleep(1)

    return jsonify({'name': 'Natalie The National Park Worker',
                    'email': 'natalie@outlook.com'})


app.run(debug=True)