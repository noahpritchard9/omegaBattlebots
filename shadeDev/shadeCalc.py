from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

driver = webdriver.Chrome(executable_path=r'C:\Users\kylev\Desktop\Sem7\Senior Design\omegaBattlebots\shadeDev\chromedriver.exe')
#Will replace the url based on what the API returns
url = 'https://www.suncalc.org/#/48.8583,2.2947,17/2015.05.11/13:15/324/2'
driver.get(url)
elem = driver.find_element(By.ID, "schatten")
print(elem.text)