import bcrypt

from database import db_user as user_manager


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(user_name, plain_text_password):
    hashed_password = user_manager.get_password_for_user(user_name)
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


def exists_already(username):
    result = user_manager.if_username_exist(username)
    if int(result) == 1:
        return True
    else:
        return False


def validate(data):
    if not data.isspace() and data != '':
        return True


def is_passwords_equal(first_password, verified_password):
    if first_password == verified_password:
        return True
    else:
        return False


def is_all_data_validate(user_name, first_password, verified_password):
    if validate(user_name) \
            and validate(first_password) \
            and validate(verified_password):
        return True
    else:
        return False


def registration(user_name, password):
    hashed_password = hash_password(password)
    user_data = user_manager.add_user(user_name, hashed_password)
    return user_data


def get_id_by_username(username):
    if exists_already(username):
        user_id = user_manager.get_id_for_user(username)
        return user_id['id']
    else:
        return 0


def is_id_correct(username, session_user_id):
    user_id = get_id_by_username(username)
    if user_id == session_user_id:
        return True
    else:
        return False
