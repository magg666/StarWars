from db_connect import db_connection as con


@con.connection_handler
def get_data_by_planet(cursor, planet_name):
    sql_str = """
    SELECT * FROM planet_votes
    WHERE planet_name = %(planet_name)s
    """
    cursor.execute(sql_str, {'planet_name': planet_name})
    planet_info = cursor.fetchone()
    return planet_info


@con.connection_handler
def add_vote(cursor, planet_data):
    sql_str = """
    INSERT INTO planet_votes(planet_id, planet_name, user_id, submission_time)
    VALUES (%(planet_id)s, %(planet_name)s, %(user_id)s, DATE_TRUNC('minute', now()))
    RETURNING planet_name
    """
    cursor.execute(sql_str, {'planet_id': planet_data['planet_id'],
                             'planet_name': planet_data['planet_name'],
                             'user_id': planet_data['user_id']})
    planet_name = cursor.fetchone()
    return planet_name


@con.connection_handler
def count_vote_for_planets(cursor):
    sql_str = """
    SELECT planet_name, count(planet_name) FROM planet_votes
    GROUP BY planet_name"""
    cursor.execute(sql_str)
    planet_votes = cursor.fetchall()
    return planet_votes


@con.connection_handler
def find_voted_planet(cursor, username):
    sql_str = """
    SELECT array_agg(planet_id) as counted FROM planet_votes
    JOIN users u on planet_votes.user_id = u.id
    WHERE u.username = %(username)s
    """
    cursor.execute(sql_str, {'username': username})
    voted_planets = cursor.fetchone()
    return voted_planets
