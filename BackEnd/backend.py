import json
from flask import Flask, jsonify, request
from flask_restful import Resource, Api, reqparse, abort, marshal, fields
from pyduino import *
import time
import numpy as np
import requests
#import request
#import geopandas
import geopy


# Initialize Flask
app = Flask(__name__)
api = Api(app)
@app.route('/address', methods=['POST'])
def generateLatitudeAndLongitude():
    addy = ''



    if request.method == 'POST':
        #print('It receives the post request')
        addy = request.form['addy']
        #print(addy)

    #print(addy)

    locator = geopy.Nominatim(user_agent='myGeocoder')
    location = locator.geocode(addy)

    print(str(location.latitude) + ' ' + str(location.longitude))

    return str(location.latitude) + ' ' + str(location.longitude)

@app.route('/servo')
def index():

    #a = Arduino()
    # if your arduino was running on a serial port other than '/dev/ttyACM0/'
    # declare: a = Arduino(serial_port='/dev/ttyXXXX')

    #time.sleep(3)
    # sleep to ensure ample time for computer to make serial connection

    # initialize the digital pin as output

    #time.sleep(1)
    # allow time to make connection
    #a.analog_write(1,1)

    #return jsonify({'name': 'Natalie The National Park Worker',
    #                'email': 'natalie@outlook.com'})

    #return jsonify(requests.get('https://api.opentopodata.org/v1/test-dataset?locations=56.0000,123.0000').json()['results'][0]['elevation'])

    lat1 = 30
    long1 = -110

    lat2 = 40
    long2 = -100

    #return generateLatitudeAndLongitude('156 Acton Road, Annapolis, Maryland')

    #return generateCoordinateArray([(lat1, long1), (lat2, long2)])

    coords, arr_print = generateCoordinateArray([(lat1, long1), (lat2, long2)])

    #Tester Script 11/08/2022
    a = Arduino()
    # if your arduino was running on a serial port other than '/dev/ttyACM0/'
    # declare: a = Arduino(serial_port='/dev/ttyXXXX')

    time.sleep(3)
    # sleep to ensure ample time for computer to make serial connection

    # allow time to make connection
    motorNumber = 1
    maxPulse = 0.00225
    percent = 50

    for i in range(0,4):
        for j in range(0,4):
            a.analog_write(motorNumber, coords[i,j])
            time.sleep(1)
            motorNumber += 1

    return arr_print

#Function to generate the coordinates of an NxN array from four corner coordinates
#The coordinate pairs should be passed in as [(A,B), (C,D)]
#where the coordinates are the bottom left, the bottom right, the top left, and the top right respectively
def generateCoordinateArray(corners):
    #bottom_left_lat = corners[0][0]
    #top_left_lat = corners[2][0]
    #bottom_left_long = corners[0][1]
    #bottom_right_long = corners[1][1]


    bottom_left_lat = corners[0][0]
    top_left_lat = corners[1][0]
    bottom_left_long = corners[0][1]
    bottom_right_long = corners[1][1]

    print(bottom_left_lat, top_left_lat, bottom_left_long, bottom_right_long)

    N = 4

    lat = []
    longi = []

    for i in range(0, N):
        lat.append(bottom_left_lat + ((top_left_lat - bottom_left_lat)/(N-1)) * i)
        longi.append(bottom_left_long + ((bottom_right_long - bottom_left_long)/(N-1)) * i)

    lat,longi = np.meshgrid(lat, longi)

    #system_array = [[0] * N] * N

    system_array = np.zeros((N,N))
    arr_print = ''

    for i in range(0,N):
        for j in range(0,N):
            #system_array[i][j] = (lat[i][j], longi[i][j])

            temp_lat = np.round(lat[i][j],3)
            temp_long = np.round(longi[i][j],3)

            '''
            temp_temp = str((temp_lat, temp_long))

            arr_print += temp_temp + ' '
            '''

            #
            result = requests.get('https://api.opentopodata.org/v1/test-dataset?locations=' + str(temp_lat) + ',' + str(temp_long)).json()['results'][0]['elevation']

            #Can perform an API call with temporary latitude and longitude system[i][j][0] and system[i][j][1]
            #system_array[i][j] = result.json()['results'][0]['elevation']


            #print(i,j)
            system_array[i,j] = result

            arr_print += str(np.round(system_array[i][j], 2)) + ' '

            time.sleep(1)
            #



        arr_print += '<br>'


    #system_array = [[1, 2, 3, 4], [0.25, 1, 3, 2], [1, 3, 5, 3], [1, 2, 2, 1]]


    min_el = system_array[0][0]
    max_el = system_array[0][0]

    test_arr = ''

    for i in range(0,N):
        for j in range(0,N):
            #test_arr += str(np.round(system_array[i][j],2)) + ' '
            test_arr += str(system_array[i][j]) + ' '
        #print(test_arr)
        test_arr = ''

    for i in range(0, N):
        for j in range(0,N):
            #print(system_array[i][j])
            if system_array[i][j] > max_el:
                max_el = system_array[i][j]
            if system_array[i][j] < min_el:
                min_el = system_array[i][j]
            #print(min_el, max_el)




    normalized_arr = np.add(system_array, - min_el)
    normalized_arr = np.multiply(normalized_arr, 1/(max_el - min_el))

    arr_print += '<br><br><br>'


    for i in range(0,N):
        for j in range(0,N):
            arr_print += str(np.round(normalized_arr[i][j], 2)) + ' '

        arr_print += '<br>'

    #Just need to do np.multiply(normalized_arr, max_angle rotation) to get the servo values in an array
    #Can convert array to list by normalized_arr.tolist()
    #Then this can be used with the pyduino to set the values of the individual servo motors
    normalized_arr = np.multiply(normalized_arr, 0.00175)
    normalized_arr = np.add(normalized_arr, 0.00075)

    normalized_arr = np.round(normalized_arr, 5)

    return normalized_arr, arr_print





app.run(debug=True)