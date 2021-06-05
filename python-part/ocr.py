import pytesseract
import cv2
import numpy as np

image = np.array(cv2.imread("sample_2.jpg"))

text = pytesseract.image_to_string(image)
print (text)

extracted_text = text.split('\n')[3:-5]
print(extracted_text)

for i in range(len(extracted_text)):
    extracted_text[i] = extracted_text[i].split(" ")
    extracted_text[i][0] = str(extracted_text[i][0]).lower()
    extracted_text[i][1] = int(extracted_text[i][1][:-2])


import json

Medical = 0
Food = 0
Essentials = 0
Fuel = 0
Clothes = 0
Others = 0

file = open('data-dictionary.json')
data = json.load(file)
for i in extracted_text:
    for keys, values in data.items():
        if i[0] in values:
            if keys == "Medical":
                Medical += i[1]
            elif keys == "Food":
                Food += i[1]
            elif keys == "Essentials":
                Essentials += i[1]
            elif keys == "Fuel":
                Fuel += i[1]
            elif keys == "Clothes":
                Clothes += i[1]
            else:
                Others += i[1]


print(Medical, Food, Essentials, Fuel, Clothes, Others)     