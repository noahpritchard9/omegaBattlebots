from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from geopy import distance
from geopy import units
from geopy import point
# from geopy.distance import geodesic 
from geopy.distance import distance, Distance
from geopy.distance import lonlat, distance
from geopy.point import Point
import math
import time
import geopy
from shadeCalc import shadowCalc
from webdriver_manager.chrome import ChromeDriverManager

class buildings():
    def __init__(self,path_lat, path_long):
        self.path_lat = path_lat
        self.path_long = path_long
    def shade(self,path_lat, path_long):
        #get azimuth (angle) 
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("headless")
        driver = webdriver.Chrome(options=chrome_options)
        # driver = webdriver.Chrome(ChromeDriverManager().install())
        url = 'https://www.suncalc.org/#/{la},{lo},17/null/08:30/130/2'

        driver.get(url.format(la=path_lat, lo = path_long))
        # time.sleep(15)
        elem = driver.find_element(By.ID, "azimuth").text
        print("Shade angle:",elem)
        driver.close()

        bear = float(elem.replace('°', ''))

        print("Path point:", path_lat, path_long )

        count = 1
        # iterate through buildings down the line of the shadow
        for i in range(10,130,15):
            
            print("\nBuilding #",count, "")
            print("--------------")
            pt = distance(meters=i).destination((path_lat,path_long), bearing=bear)
            print("Building point:", pt[0], pt[1])
            shadow = shadowCalc(path_lat, path_long, pt[0], pt[1])
            shadeId = shadow.shade(path_lat, path_long, pt[0], pt[1]) 
            if shadeId == 1:
                break
            count=count+1
            
                


