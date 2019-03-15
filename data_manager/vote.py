import db_vote as vote_manager


def get_by_planet(planet_name):
    return vote_manager.get_data_by_planet(planet_name)
