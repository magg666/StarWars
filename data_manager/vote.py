import db_vote as vote_manager


class VoteProblem(Exception):
    """ If there is problem with voting data"""
    pass


def get_by_planet(planet_name):
    return vote_manager.get_data_by_planet(planet_name)


def vote_planet(planet_data):
    return vote_manager.add_vote(planet_data)

