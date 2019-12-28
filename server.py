from flask import Flask, render_template, request, session, jsonify
import os


import logging_rules as log
import user as user
import vote as vote_

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')


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
    data = request.get_json()
    username = data['username']
    first_password = data['password']
    validation_password = data['confirmPassword']

    if not user.is_all_data_validate(username, first_password, validation_password):
        return jsonify({'state': 'empty'})

    if user.exists_already(username):
        return jsonify({'state': 'in_base'})

    if not user.is_passwords_equal(first_password, validation_password):
        return jsonify({'state': 'not_equal'})

    else:
        user.registration(username, first_password)
        return jsonify({'state': 'success'})


@app.route('/vote', methods=['POST'])
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


@app.route('/user-vote', methods=['POST'])
def user_vote():
    data = request.get_json()
    username = data['username']
    voted_planets = vote_.get_voted_planets_for_user(username)
    return jsonify({'planetsId': voted_planets})


@app.route('/statistic')
def statistic():
    planet_votes = vote_.get_for_planets()
    return jsonify({'planet_votes': planet_votes})


@app.route('/error', methods=['POST'])
def log_js_errors():
    error = request.get_json()
    log.logger.critical('%s', error)


if __name__ == '__main__':
    app.run(debug=True)
