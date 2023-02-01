#This file handles our communication between the app 

import requests as r

#Handles the communication from the app to the python script
#Todo: Add catch statements in case the server is down
#Todo: Add loop to wait for new post 
class communication():

    def __init__(self):
        self.ip = 'http://128.164.192.122:8080/'
    
    def getLoc(self):
        #Try to establish connection and get user location
        lat = 38.899630
        lon = -77.048900
        locData = [lat, lon]
        try:
            userLocation=r.get(self.ip + 'user')
            userLocation = userLocation.json()
            locData = [userLocation['lat'], userLocation['lon']]
            return locData

        #We'll just fill this with example data for now if no connection is made:
        except:
            return locData

    def getPref(self):
        #Try to establish connection to get user preferences
        elevation = 0
        PoI = 1
        paved = 1
        lit = 1
        distance = -1
        prefData = [elevation, PoI, paved, lit, distance]

        try:
            prefData=r.get(self.ip + 'preferences')
            return prefData

        #We'll just fill this with example data for now if no connection is made:
        except:
            print("No connection established")
        return prefData

    def postRoute(self, route):

        r.post(self.ip + 'route', json=route)


