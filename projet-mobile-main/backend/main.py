from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium import webdriver
import time
import os
from flask_cors import CORS, cross_origin
# Import libraries
import numpy as np
from flask import Flask, request, jsonify
import pickle
app = Flask(__name__)


def HotelApi(cityname):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
    # chrome_options.add_argument("--headless")
    chrome_options.add_argument(
        "user-agent=Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 640 XL LTE) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.10166")
    chrome_options.add_argument("--disable-notifications")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(service=Service(
        ChromeDriverManager().install()), options=chrome_options)

    # Set the URL of the website you want to scrape
    url = "https://www.booking.com"

    # Create a Chrome WebDriver object using the Service and ChromeOptions objects
    # Navigate to the website
    driver.get(url)
    # Enter the destination in the search field
    search_field = driver.find_element(By.ID, "input_destination")
    search_field.send_keys(cityname)
    search_field.send_keys(Keys.RETURN)
    driver.implicitly_wait(10)
    hasNext = True
    i = 0
    hotels = []
    # Scrape the hotel prices
    while hasNext and i < 2:
        eles = []
        page = driver.find_elements(By.CLASS_NAME, "b709ca1e5c")
        driver.execute_script("window.scrollTo(0, 1020)")
        for ele in page:
            try:
                name = ele.find_element(
                    By.CSS_SELECTOR, '.f9afbb0024.f0d4d6a2f5.fda3b74d0d').text
                price = ele.find_element(
                    By.CSS_SELECTOR, '.fcab3ed991.b66d065723.e729ed5ab6').text.split("MAD ")[1]
                image = ele.find_element(By.CSS_SELECTOR, '.b683e845a8').get_attribute(
                    "style").split('"')[1]
                eles += [{"name": name, "price": price, "image": image}]
            except:
                NoSuchElementException
        hotels += eles
        if len(page) > 0:
            i += 1
            nextbutton = driver.find_element(
                By.CSS_SELECTOR, '.fc63351294.a822bdf511.d4b6b7a9e7.cfb238afa1.f4605622ad')
            nextbutton.click()
    return hotels


def FlightsApi(dpr, arv, datedpr, datearv):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
    # chrome_options.add_argument("--headless")
    chrome_options.add_argument(
        "user-agent=Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 640 XL LTE) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.10166")
    chrome_options.add_argument("--disable-notifications")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(service=Service(
        ChromeDriverManager().install()), options=chrome_options)
    flights = []
    link = "https://www.kayak.ae/flights/"+dpr+"-" + \
        arv+"/"+datedpr+"/"+datearv+"?sort=bestflight_a"
    driver.get(link)

    time.sleep(3)
    curr = driver.find_element(By.CSS_SELECTOR, '.cYOT-currency')
    curr.click()
    time.sleep(1)
    dh = driver.find_element(
        By.XPATH, '/html/body/div[3]/div/div[2]/div/div/div[2]/section[2]/ul/li[79]')
    dh.click()
    time.sleep(1)
    dh = driver.find_element(
        By.XPATH, '/html/body/div[4]/div/div[2]/div/div/div/div/div[2]/button')
    dh.click()
    time.sleep(3)
    main = driver.find_element(
        By.XPATH, '//*[@id="body-wrapper"]/div[3]/div[4]/div[1]/div[4]')

    eles = main.find_elements(
        By.CSS_SELECTOR, '.LG6J.LG6J-mod-legacy.LG6J-mod-bordered')
    for ele in eles:
        airline = ele.find_element(
            By.CSS_SELECTOR, '.le7W-footer-airline').text
        price = ele.find_element(By.CSS_SELECTOR, '.Ka4D-price').text
        flights += [{'name': airline, 'price': price}]
    return flights


@app.route('/hotels', methods=['POST'])
def gethotel():

    data = request.json
    res = HotelApi(data['city'])
    return jsonify(res)


@app.route('/flights', methods=['POST'])
def geflight():

    data = request.json
    res = FlightsApi(data['dpr'], data['arv'],
                     data['datedpr'], data['datearv'])
    return jsonify(res)




if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=os.getenv("PORT", default=5000))
