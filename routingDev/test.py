import requests as r

user_location = r.get("http://161.253.78.224:5000/user")

print(f"{user_location.json()=}")

new_location = {"location": {"lat": 1, "lon": 1}}

update_user_location = r.post(url="http://161.253.78.224:5000/user", json=new_location)

print(f"{update_user_location.json()=}")

new_route = {"route": [{"lat": 0, "lon": 0}, {"lat": 1, "lon": 1}]}

update_route = r.post("http://161.253.78.224:5000/route", json=new_route)

print("updated route: " + update_route.text)

route = r.get("http://161.253.78.224:5000/route")

print("current route: " + route.text)
