# HOW TO IMPROVE API

# have user send {latitude, longitude, id} and server stores these in a list

# server goes through list, doesn't care which one it chooses

# server generates a route for a user with a given id
# and sends back to a route "/api/route/[id]"

# user gets their location by calling to api/route/[id]

from flask import Flask
from flask_restful import Api, Resource, reqparse
from run import run
from setup import setup


app = Flask(__name__)
api = Api(app)

#user_location = {"latitude": 38.899630, "longitude": -77.048900}

#final_route = [{"latitude": -1, "longitude": -1}, {"latitude": 0, "longitude": 0}]

# user_parser = reqparse.RequestParser()
# user_parser.add_argument("location", type=dict)

route_parser = reqparse.RequestParser()
route_parser.add_argument("location", type=dict) #, action="append", type=dict)
route_parser.add_argument('preferences', type = dict)


# class UserLocation(Resource):
#     #from app 
#     def get(self):
#         return user_location

#     #from routeMaker
#     def post(self):
#         data = user_parser.parse_args()
#         user_location.clear()
#         user_location.update(data["location"])
#         print(user_location)
#         return data, 201


class Route(Resource):
    #gets route from route maker
    def post(self):
        data = route_parser.parse_args()
        print(data)
        user_location = data['location']
        locData = [user_location['latitude'], user_location['longitude']]

        user_preferences = data['preferences']
        prefData = [user_preferences['shade'], user_preferences['PoI'], user_preferences['paved'], user_preferences['lit'], user_preferences['distance']]
        return run.run(locData, prefData, footwaysSimplified)

    #posts route to api
    # def post(self):
    #     data = route_parser.parse_args()
    #     print(f"{data=}")
    #     final_route.clear()
    #     for route in data["route"]:
    #         final_route.append(route)
    #     return data, 201


#api.add_resource(UserLocation, "/user")
api.add_resource(Route, "/route")

if (__name__) == "__main__":
    #Here we have setup, dependent on whether we really need it or not
    #footwaysSimplified = setup().completeSetup("dc.osm", "finalSimplified.osm")
    footwaysSimplified = setup().loadSetup()
    app.run(debug=True, port=9090, host="0.0.0.0")
