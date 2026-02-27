import requests
import os
import aspose.words as aw
from bs4 import BeautifulSoup

url = "https://смп61.рф/"
web_content = requests.get(url).content

soup = BeautifulSoup(web_content, "lxml")

urls = [
    "https://смп61.рф/l",
    "https://смп61.рф/agroluxharrow-12",
    "https://смп61.рф/cultivator",
]

names = [
    "Лущильник (ГКП)",
    "Борона «АГРОЛЮКС» 6.0",
    "Культиватор складной (ГКП)"
]

for i in range(len(urls)):
    response = requests.get(urls[i]).content
    soup = BeautifulSoup(response, "lxml")
    find_content = soup.find_all("div", class_="t-bgimg")
    find_content1 = soup.find_all("div", class_="t537__wrapperleft")

    find_content.pop(-1)

    print(len(find_content), len(find_content1))
    for j in range(len(find_content)):
        print(find_content[j].get("data-original"))
        os.makedirs("svg/" + names[i], exist_ok=True)

        try:
            if "*" in find_content1[j].text.strip():
                with open("svg/" + names[i] + "/" + find_content1[j].find("div", class_="t537__persname").text.strip().replace('"', "").replace("/", "").split("*")[0] + ".jpg", "wb") as file:
                    file.write(requests.get(find_content[j].get("data-original")).content)
            else:
                with open("svg/" + names[i] + "/" + find_content1[j].find("div", class_="t537__persname").text.strip().replace('"', "").replace("/", "") + ".jpg", "wb") as file:
                    file.write(requests.get(find_content[j].get("data-original")).content)
        except Exception as e:
            print(e)
