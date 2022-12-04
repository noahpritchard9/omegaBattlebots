from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import math

#numbers imported from points script
path_lat = 38.89046
path_long = -77.03211
build_lat = 38.89035
build_long = -77.03195
build_height = 130

#Harversine formula to get distance between the two points
path_lat = math.radians(path_lat)
path_long = math.radians(path_long)
build_lat = math.radians(build_lat)
build_long = math.radians(build_long)

num = math.sin((build_lat - path_lat) / 2)**2 + math.cos(path_lat) * math.cos(build_lat) * math.sin((build_long - path_long) / 2)**2
sq_num = math.sqrt(num)
distance = 2 * math.asin(sq_num) * 6371000
print(distance)

#get shadow length (m)
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("headless")
driver = webdriver.Chrome(options=chrome_options)
url = 'https://www.suncalc.org/#/{la},{lo},17/2022.12.04/08:30/{h}/2'

driver.get(url.format(la=build_lat, lo = build_long, h = build_height))

elem = float(driver.find_element(By.ID, "schatten").text)
print(elem)
driver.close()

#does building shadow reach path point?
if elem > distance:
    print("yes")
