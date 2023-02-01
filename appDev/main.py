from flask import Flask
from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
api = Api(app)

user_location = {"lat": 38.899630, "lon": -77.048900}

final_route = [{"lat": -1, "lon": -1}]

user_parser = reqparse.RequestParser()
user_parser.add_argument("location", type=dict)

route_parser = reqparse.RequestParser()
route_parser.add_argument("route", action="append", type=dict)


class UserLocation(Resource):
    def get(self):
        return user_location

    def post(self):
        data = user_parser.parse_args()
        user_location.clear()
        user_location.update(data["location"])
        print(user_location)
        return data, 201


class Route(Resource):
    def get(self):
        return final_route

    def post(self):
        data = route_parser.parse_args()
        print(f"{data=}")
        final_route.clear()
        for route in data["route"]:
            final_route.append(route)
        return data, 201


api.add_resource(UserLocation, "/user")
api.add_resource(Route, "/route")

if (__name__) == "__main__":
    app.run(debug=True, port=8080, host='0.0.0.0')
