import requests
import os
import aspose.words as aw
from bs4 import BeautifulSoup

url = "https://belama.com"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
}
web_content = requests.get(url + "/katalog", headers=headers).content

soup = BeautifulSoup(web_content, "lxml")

urls = soup.find_all("div", class_="card-product")

for i in urls:
    response = requests.get(url + i.find("a").get("href"), headers=headers).content
    soup = BeautifulSoup(response, "lxml")
    find_content = soup.find_all("a", class_="title-prod")

    for j in find_content:
        card_url = url + j.get("href")
        print(j.get_text(), card_url)
        try:
            response = requests.get(card_url, headers=headers).content
            soup = BeautifulSoup(response, "lxml")
            catalog_details = soup.find("div", class_="catalog-items").find("ul")

            details_urls = catalog_details.find_all("a")
            for k in details_urls:
                print(k.get_text(), k.get("href"))
                
                response = requests.get(url + k.get("href"), headers=headers).content
                soup = BeautifulSoup(response, "lxml")
                detail_imgs = soup.find("div", class_="swiper-wrapper").find_all("img")

                image_count = 1

                for h in detail_imgs:
                    title, img_url = h.get("title"), url + h.get("src")
                    path_to = "svg/" + j.get_text() + "/" + title + "/"
                    os.makedirs(path_to, exist_ok=True)
                    print(title, img_url)

                    with open(path_to + "/" + str(image_count) + "." + img_url.split(".")[-1], "wb") as file:
                        img_content = requests.get(img_url, headers=headers).content
                        file.write(img_content)
                        image_count += 1
        except Exception as e:
            print("[!] Error:\n", e)