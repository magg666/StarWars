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
