import json
from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse, abort, marshal, fields

# Initialize Flask
app = Flask(__name__)
api = Api(app)
@app.route('/servo')
def index():

    return jsonify({'name': 'Natalie The National Park Worker',
                    'email': 'natalie@outlook.com'})


app.run(debug=True)