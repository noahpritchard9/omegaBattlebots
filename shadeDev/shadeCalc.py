from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import math
import time
import requests


class shadowCalc():
    def __init__(self, path_lat, path_long, build_lat, build_long):
        self.path_lat = path_lat
        self.path_long = path_long
        self.build_lat = build_lat
        self.build_long = build_long

    def shade(self, path_lat, path_long, build_lat, build_long):
        
        build_height = shadowCalc.height(self, build_lat,build_long)
        
        #Harversine Formula to get distance between the two points
        path_lat2 = math.radians(path_lat)
        path_long2 = math.radians(path_long)
        build_lat2 = math.radians(build_lat)
        build_long2 = math.radians(build_long)

        num = math.sin((build_lat2 - path_lat2) / 2)**2 + math.cos(path_lat2) * math.cos(build_lat2) * math.sin((build_long2 - path_long2) / 2)**2
        sq_num = math.sqrt(num)
        distance = 2 * math.asin(sq_num) * 6371000
        print("distance path-building:", distance)

        #get shadow length (m)
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("headless")
        driver = webdriver.Chrome(options=chrome_options)
        # driver = webdriver.Chrome(ChromeDriverManager().install())
        
        

        url = 'https://www.suncalc.org/#/{la},{lo},17/null/08:30/{h}/2'
        driver.get(url.format(la=build_lat, lo = build_long, h = build_height))
        # time.sleep(30)
        elem = float(driver.find_element(By.ID, "schatten").text)
        print("shadow length:",elem)
        print("height :",build_height)
        driver.close()

        #does building shadow reach path point?
        if elem > distance:
            print("Shady path?: YES")
            return 1
        else:
            print("Shady path?: NO")
            return 0
    

    
    def height(self, build_lat, build_long):
        url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
        params = {
            'location': '{},{}'.format(build_lat, build_long),
            'radius': 3,
            'type': 'building',
            'key': 'AIzaSyCiMraK7ZuO-eaRLSekK_9Ag-1sa30KGZ4'
        }
        response = requests.get(url, params=params)
        results = response.json()['results']
        if results:
            print("Building found at specified location.")
            print(results)
            first_building = results[0]
            height = first_building.get("height")
            print("height", height)
            # if height 
            return height
        else:
            print("No building found at specified location.")
            return 0



      

