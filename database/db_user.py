import db_connection as con


@con.connection_handler
def add_user(cursor, login, password):
    str_sql = """
    INSERT INTO users(username, password)
    VALUES (%(login)s, %(password)s)
    RETURNING username
    """
    cursor.execute(str_sql, {'login': login,
                             'password': password})
    user_data = cursor.fetchone()
    return user_data


@con.connection_handler
def get_password_for_user(cursor, username):
    str_sql = """
    SELECT password FROM users
    WHERE username = %(username)s
    """
    cursor.execute(str_sql, {'username': username})
    password = cursor.fetchone()
    return password['password']


@con.connection_handler
def if_username_exist(cursor, username):
    str_sql = """
    SELECT CASE WHEN EXISTS (SELECT 1
                         FROM users
                         WHERE username = %(username)s)
            THEN CAST (1 AS bit)
            ELSE CAST (0 AS bit)

            END
    AS bit


    """
    cursor.execute(str_sql, {'username': username})
    exist = cursor.fetchone()
    return exist['bit']
