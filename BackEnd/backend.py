import json
from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse, abort, marshal, fields
from pyduino import *
import time
import numpy as np

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


def generateCoordinateArray(corners):
    bottom_left_lat = corners[0][0]
    top_left_lat = corners[2][0]
    bottom_left_long = corners[0][1]
    bottom_right_long = corners[1][1]

    N = 4

    lat = []
    longi = []

    for i in range(0, N):
        lat.append(bottom_left_lat + ((top_left_lat - bottom_left_lat)/(N-1)) * i)
        longi.append(bottom_left_long + ((bottom_right_long - bottom_left_long)/(N-1)) * i)

    lat,longi = np.meshgrid(lat, longi)

    system_array = [[0] * N] * N

    for i in range(0,N):
        for j in range(0,N):
            #system_array[i][j] = (lat[i][j], longi[i][j])

            #Can perform an API call with temporary latitude and longitude system[i][j][0] and system[i][j][1]
            system_array[i][j] = (lat[i][j], longi[i][j])


app.run(debug=True)