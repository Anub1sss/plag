import os
import easyocr

from selenium import webdriver
from selenium.webdriver.chrome.service import Service


def take_screenshot_from_svg(filename):
    chrome_driver_path = "chromedriver-win64/chromedriver.exe"

    service = Service(executable_path=chrome_driver_path)

    driver = webdriver.Chrome(service=service)

    svg_file_path = os.path.abspath(filename)

    # Open the SVG file in browser
    driver.get(f"file://{svg_file_path}")
    driver.maximize_window()
    driver.execute_script("window.scrollTo(0, 1080)")

    new_filename = filename.split("\\")[-1][:-3] + "png"

    driver.get_screenshot_as_file(f'img/{new_filename}')

    driver.close()
    driver.quit()


os.makedirs("img/kultivatory", exist_ok=True)  # Создать директории img/kultivatory


reader = easyocr.Reader(["en", "ru"])

result = reader.readtext("img/kultivatory/new.png")

for (bbox, text, prob) in result:
    print(f"Text: {text}, Confidence: {prob:.2f}, Bounding Box: {bbox}")
