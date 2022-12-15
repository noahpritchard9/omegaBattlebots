from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import math
import time

class shadowCalc():
    def __init__(self, path_lat, path_long, build_lat, build_long):
        self.path_lat = path_lat
        self.path_long = path_long
        self.build_lat = build_lat
        self.build_long = build_long

    def shade(self, path_lat, path_long, build_lat, build_long):
        
        #will get height from elevation map 
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

        url = 'https://www.suncalc.org/#/{la},{lo},17/null/09:30/{h}/2'
        driver.get(url.format(la=build_lat, lo = build_long, h = build_height))
        # time.sleep(30)

        elem = float(driver.find_element(By.ID, "schatten").text)
        print("shadow length:",elem)
        driver.close()

        #does building shadow reach path point?
        if elem > distance:
            print("Shady path?: YES")
            return 1
        else:
            print("Shady path?: NO")
    
    def height(self, build_lat, build_long):
        if build_lat == 38.900595794515404 and build_long == -77.04650672345407:
            return 39.23
        if build_lat == 38.899460294503704 and build_long == -77.04651482482335:
            return 25.98
        if build_lat == 38.899102660183694 and build_long == -77.04518617678218:
            return 28.17
        
        if build_lat == 38.8993785861396 and build_long == -77.04460756230469:
            return 50.41
        else: 
            return 0
        

        














#input 3/4 lat long sidewalk lat long
#need building height, lat and long
# 130 feet (39.624) (commercial streets) and 
# 90 feet (27.432) (residential streets), and 
# 160 feet (48.768)for parts of Pennsylvania Avenue, NW.
# if between is N
# so check buldings north
#  else
#  
# 
# what if we get azimuth depending on time and check buildings down that line . 
#import function create object
# show suncalc
# 1 connect scripts
# work back
# height
# writing2
# create method shade calc and call inside for loop``.
# ask about height

