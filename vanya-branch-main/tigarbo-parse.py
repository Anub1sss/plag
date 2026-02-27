import requests
import os
import aspose.words as aw
from bs4 import BeautifulSoup

url = "https://www.tigarbo.ru"
web_content = requests.get(url + "/produktsiya.html").content

soup = BeautifulSoup(web_content, "xml")

find_content = soup.find("div", class_="itemFullText").find_all("a")

for i in find_content:
    try:
        if "produktsiya" in str(i):
            temp_url = i.get("href")
            print(temp_url)

            response = requests.get(temp_url).content
            soup = BeautifulSoup(response, "xml")
            all_a_attr = soup.find("div", class_="itemFullText").find_all("a")

            os.makedirs("svg/" + temp_url.split("/")[-1], exist_ok=True)
            
            for a in all_a_attr:
                if "images" in str(a) and "youtube" not in str(a):
                    print(a.get("href"))
                    with open("svg/" + temp_url.split("/")[-1] + "/" + a.get("href").split("/")[-1], "wb") as file:
                        file.write(requests.get(url + a.get("href")).content)
    except Exception as e:
        try:
            if "produktsiya" in str(i):
                temp_url = i.get("href")
                print(temp_url)

                response = requests.get(temp_url).content
                soup = BeautifulSoup(response, "xml")
                all_a_attr = soup.find("div", id="vt_main_com").find_all("a")

                os.makedirs("svg/" + temp_url.split("/")[-1], exist_ok=True)
                
                for a in all_a_attr:
                    if "images" in str(a) and "youtube" not in str(a):
                        print(a.get("href"))
                        with open("svg/" + temp_url.split("/")[-1] + "/" + a.get("href").split("/")[-1], "wb") as file:
                            file.write(requests.get(url + a.get("href")).content)
    
        except Exception as e:
            try:
                if "produktsiya" in str(i):
                    temp_url = i.get("href")
                    print(temp_url, "end")

                    response = requests.get(temp_url).content
                    soup = BeautifulSoup(response, "xml")
                    all_a_attr = soup.find("div", class_="itemFullText").find_all("a")
                    
                    for a in all_a_attr:
                        if "item" in str(a):
                            parse_url = a.get("href")
                            print(parse_url, "end")

                            response = requests.get(parse_url).content
                            soup = BeautifulSoup(response, "xml")
                            all_a_attr_temp = soup.find("div", id="vt_main_com").find_all("a")

                            os.makedirs("svg/" + temp_url.split("/")[-1] + parse_url.split("/")[-1], exist_ok=True)
                    
                            for a_temp in all_a_attr_temp:
                                if "images" in str(a_temp) and "youtube" not in str(a_temp):
                                    print(a_temp.get("href"))
                                    with open("svg/" + temp_url.split("/")[-1] + parse_url.split("/")[-1] + "/" + a_temp.get("href").split("/")[-1], "wb") as file:
                                        file.write(requests.get(url + a_temp.get("href")).content)
            except Exception as e:
                if "item" in str(a):
                    parse_url = a.get("href")
                    print(parse_url, "end")

                    response = requests.get(url + parse_url).content
                    soup = BeautifulSoup(response, "xml")
                    all_a_attr_temp = soup.find("div", id="vt_main_com").find_all("a")

                    os.makedirs("svg/" + temp_url.split("/")[-1] + parse_url.split("/")[-1], exist_ok=True)
            
                    for a_temp in all_a_attr_temp:
                        if "images" in str(a_temp) and "youtube" not in str(a_temp):
                            print(a_temp.get("href"))
                            with open("svg/" + temp_url.split("/")[-1] + parse_url.split("/")[-1] + "/" + a_temp.get("href").split("/")[-1], "wb") as file:
                                file.write(requests.get(url + a_temp.get("href")).content)

count = 0

for i in find_content:
    print(os.path.abspath("tables") + "table" + str(count) + ".svg")
    try:
        if "produktsiya" in str(i):
            temp_url = i.get("href")
            print(temp_url)

            if "https" not in temp_url:
                temp_url = url + temp_url

            response = requests.get(temp_url).content
            soup = BeautifulSoup(response, "xml")
            all_table_attr = soup.find("div", class_="itemFullText").find_all("table")

            os.makedirs("tables", exist_ok=True)
            
            for tb in all_table_attr:
                with open("tables/index.html", "w", encoding="utf-8") as file:
                    file.write(str(tb))
                doc = aw.Document("tables/index.html")
                doc.save(f"tables/output_table{count}.svg", aw.SaveFormat.SVG)
                count += 1
                
    except Exception as e:
        if "produktsiya" in str(i):
            temp_url = i.get("href")
            print(temp_url)

            if "https" not in temp_url:
                temp_url = url + temp_url

            response = requests.get(temp_url).content
            soup = BeautifulSoup(response, "xml")
            all_table_attr = soup.find("div", id="vt_main_com").find_all("table")

            os.makedirs("tables", exist_ok=True)
            
            for tb in all_table_attr:
                with open("tables/index.html", "w", encoding="utf-8") as file:
                    file.write(str(tb))
                doc = aw.Document("tables/index.html")
                doc.save(f"tables/output_table{count}.svg", aw.SaveFormat.SVG)
                count += 1
