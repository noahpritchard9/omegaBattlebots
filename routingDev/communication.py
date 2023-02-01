#This file handles our communication between the app 

import requests as r

#Handles the communication from the app to the python script
#Todo: Add catch statements in case the server is down
#Todo: Add loop to wait for new post 
class communication():

    def __init__(self):
        self.ip = 'http://128.164.194.96:5000/'
    
    def getLoc(self):
        #Try to establish connection and get user location
        try:
            userLocation=r.get(self.ip + 'user')
            return userLocation

        #We'll just fill this with example data for now if no connection is made:
        except:
            lat = 38.899630
            lon = -77.048900
            locData = [lat, lon]
            return locData

    def getPref(self):
        #Try to establish connection to get user preferences
        try:
            userPreferences=r.get(self.ip + 'preferences')
            return userPreferences

        #We'll just fill this with example data for now if no connection is made:
        except:
            elevation = 0
            PoI = 1
            paved = 1
            lit = 1
            distance = -1
            prefData = [elevation, PoI, paved, lit, distance]
            return prefData

    def postRoute(self, route):

        r.post(self.ip + 'route', json=route)


