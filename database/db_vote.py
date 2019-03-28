import db_connection as con


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

