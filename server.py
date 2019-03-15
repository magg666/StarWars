from flask import Flask, render_template, request, redirect, session, url_for, jsonify
from functools import wraps

import user as user
import vote as vote

app = Flask(__name__)
app.secret_key = 'uuu'


# wrapper to verified if user is not logged
def login_forbidden(func):
    @wraps(func)
    def wrap(*args, **kwargs):
        if 'username' not in session:
            return func(*args, **kwargs)
        else:
            return jsonify({'error': 'You are already logged!'})

    return wrap


@app.route('/')
def index():
    return render_template('planet_table.html')


@app.route('/login', methods=['POST'])
@login_forbidden
def login():
    username = request.form['username']
    password = request.form['password']

    if user.exists_already(username) and user.verify_password(username, password):
        session['username'] = username
        session['id'] = user.get_id_by_username(username)
        return jsonify({'username': username})

    else:
        return jsonify({'error': 'Wrong username or password!'})


@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('id', None)
    return redirect(url_for('index'))


@app.route('/registration', methods=['POST'])
@login_forbidden
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


@app.route('/test', methods=['POST', 'GET'])
def test():
    a = jsonify({'a': 'abd'})
    return a + 'uuu'


if __name__ == '__main__':
    app.run(debug=True)
