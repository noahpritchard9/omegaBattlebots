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
import geopy


path_lat = 38.90050
path_long =-77.04670

#get azimuth (angle)
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("headless")
driver = webdriver.Chrome(options=chrome_options)
url = 'https://www.suncalc.org/#/{la},{lo},17/null/08:30/130/2'

driver.get(url.format(la=path_lat, lo = path_long))

elem = driver.find_element(By.ID, "azimuth").text
print("Azimuth:",elem)
driver.close()

bear = float(elem.replace('°', ''))


pt = distance(meters=50).destination((path_lat,path_long), bearing=bear)
    
print("Building point:", pt[0], pt[1])
print("Path point:", path_lat, path_long )


        
        
    


