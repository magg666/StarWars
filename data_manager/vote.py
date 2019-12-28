from database import db_vote as vote_manager


class VoteProblem(Exception):
    """ If there is problem with voting data"""
    pass


def get_by_planet(planet_name):
    return vote_manager.get_data_by_planet(planet_name)


def vote_planet(planet_data):
    return vote_manager.add_vote(planet_data)


def get_for_planets():
    return vote_manager.count_vote_for_planets()


def get_voted_planets_for_user(username):
    voted_planet = vote_manager.find_voted_planet(username)
    return list(voted_planet['counted'])
