from flask import Flask, render_template, request, redirect, session, url_for, jsonify
from functools import wraps

import user as user
import vote as vote_

app = Flask(__name__)
app.secret_key = 'uuu'


@app.route('/')
def index():
    return render_template('planet_table.html')


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    if user.exists_already(username) and user.verify_password(username, password):
        session['username'] = username
        session['id'] = user.get_id_by_username(username)

        return jsonify({'state': 'success'})

    else:
        return jsonify({'state': 'error'})


@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    if not session:
        return jsonify({'state': 'success'})
    else:
        return jsonify({'state': 'error'})


@app.route('/registration', methods=['POST'])
def registration():
    username = request.form['login']
    first_password = request.form['pass']
    validation_password = request.form['secondpass']

    if not user.is_all_data_validate(username, first_password, validation_password):
        return jsonify({'error': 'Please provide all data'})

    if user.exists_already(username):
        return jsonify({'error': 'This user already exists'})

    if not user.is_passwords_equal(first_password, validation_password):
        return jsonify({'error': 'Passwords must be equals'})

    else:
        user.registration(username, first_password)
        return jsonify({'login': username})


@app.route('/vote', methods=['GET', 'POST'])
def vote():
    planet_data = request.get_json()
    username = planet_data['username']
    user_id = session['id']
    planet_vote_data = {'planet_name': planet_data['planet_name'],
                        'planet_id': planet_data['planet_id'],
                        'user_id': user_id
                        }
    if user.is_id_correct(username, user_id):
        planet_name = vote_.vote_planet(planet_vote_data)
        return jsonify({'state': planet_name['planet_name']})


if __name__ == '__main__':
    app.run(debug=True)
