import requests
import os

from bs4 import BeautifulSoup

url = "https://kultivator.ru/"  # URL основной страницы
web_content = requests.get(url + "catalog").content  # Получение html документа с https://kultivator.ru/catalog

soup = BeautifulSoup(web_content, "lxml")  # Инициализация скраппера

find_content = soup.find_all("a", class_="item")  # Поиск по странице всех элементов ссылок с классом item

data_list = []

for i in find_content:  # Прохожусь циклом по всем найденным элемента
    if "/catalog" in str(i):  # Если /catalog в строке, значит это нужная ссылка
        data_list.append(url[:-1] + i.get("href"))  # Получение значения - ссылку

data_list = set(data_list)  # Избавиться от повторений

os.makedirs("svg/" + "zapchasti/zapchasti-ppo1", exist_ok=True)

for parse_url in data_list:  # Проход циклом по всем ссылкам
    print(parse_url)
    soup_temp = BeautifulSoup(requests.get(parse_url).content, "lxml")  # Инициализация временного супа для поиска
    os.makedirs("svg/" + parse_url.split("/")[-2], exist_ok=True)

    ul_find_content = soup_temp.find("ul", class_="mt-2")  # Список элементов таблицы

    if ul_find_content:  # Если элементы нашлись
        ul_find_content = ul_find_content.find_all("a")
        for i in ul_find_content:  # Проход циклом по всем внутренним ссылкам, ведущим на svg
            soup_temp = BeautifulSoup(requests.get(url[:-1] + i.get("href")).content, "lxml")  # Временный суп для svg

            embed_find_content = soup_temp.find("embed")  # Нахожу нужный атрибут embed

            svg_url = url[:-1] + embed_find_content.get("src")  # Собираю url до svg файла

            # Сохранение svg
            with open("svg/" + parse_url.split("/")[-2] + "/" + i.get_text().replace(" ", "_") + ".svg", "wb") as file:
                file.write(requests.get(svg_url).content)

    else:
        a_find_content = soup_temp.find_all("a")  # Список элементов техники

        temp_link_list = []  # Временный список отсортированных элементов

        for i in a_find_content:
            if f"/catalog/{parse_url.split('/')[-2]}/{parse_url.split('/')[-2][0]}" in str(i):
                temp_link_list.append(url[:-1] + i.get("href"))

        if "https://kultivator.ru/catalog/zapchasti/zapchasti-ppo1/" in temp_link_list:
            temp_link_list.remove("https://kultivator.ru/catalog/zapchasti/zapchasti-ppo1/")

        for i in temp_link_list:
            soup_temp = BeautifulSoup(requests.get(i).content, "lxml")  # Инициализация временного супа для поиска

            ul_find_content = soup_temp.find("ul", class_="mt-2")  # Список элементов таблицы

            if ul_find_content:  # Если элементы нашлись
                ul_find_content = ul_find_content.find_all("a")
                for j in ul_find_content:  # Проход циклом по всем внутренним ссылкам, ведущим на svg
                    if j:
                        soup_temp = BeautifulSoup(requests.get(url[:-1] + j.get("href")).content,
                                                  "lxml")  # Временный суп для svg
                        embed_find_content = soup_temp.find("embed")  # Нахожу нужный атрибут embed

                        svg_url = url[:-1] + embed_find_content.get("src")  # Собираю url до svg файла

                        # Сохранение svg
                        filename = "svg/" + parse_url.split("/")[-2] + "/" + j.get_text().replace(" ", "_") + ".svg"
                        with open(filename, "wb") as file:
                            file.write(requests.get(svg_url).content)
            else:
                img_block_find = soup_temp.find("slider-product").get(":items").split(":")[1].split(",")[0].\
                    replace("'", "")

                print(i.split("/"))

                if i.split("/")[-3] == "zapchasti-ppo1":
                    filename = "svg/" + i.split("/")[-4] + "/" + i.split("/")[-3] + "/" + i.split("/")[-2] + ".png"

                else:
                    filename = "svg/" + i.split("/")[-3] + "/" + i.split("/")[-2] + ".png"
                with open(filename, "wb") as file:
                    file.write(requests.get(url[:-1] + img_block_find).content)
