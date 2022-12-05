from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import date

today = date.today()
year = today.strftime("%Y")
month = today.strftime("%m")
day = today.strftime("%d")

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("headless")
driver = webdriver.Chrome(options=chrome_options)

url = 'https://washington.org/find-dc-listings/events?start_date_value={m}%2F{d}%2F{y}&end_date_value='

driver.get(url.format(y=year, m = month, d = day))

elem = driver.find_elements(By.PARTIAL_LINK_TEXT,"VIEW DETAILS")

url_list = []

for i in elem:
    url_list.append(i.get_attribute('href'))

driver.close()

eventsList = ""
des= []
for i in url_list:
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(i)
    eventName = driver.find_element(By.CLASS_NAME,'neighborhood-hero__banner__label.neighborhood-hero__banner__label--heading.label--blaze').text
    eventDate = driver.find_element(By.CLASS_NAME, "deal-validity").text
    address1 = driver.find_elements(By.CLASS_NAME,"address")[1].text
    
    description = driver.find_element(By.CLASS_NAME, "text-long").text

    driver.close()
    
    
    eventsList += '''
        {
            "eventname": "%s",
            "date": "%s",
            "address": "%s",
            "description": "%s"
        },
    '''%(eventName,eventDate, address1, description)

eventsList = eventsList[:-2]
json =  '''{
    "url": "%s",
    "events": [
    %s
    ]
}''' % (url, eventsList)

with open('eventsDev/eventsData.json', 'w') as page:
    page.write(json)
    page.close()
    