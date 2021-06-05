import pytesseract
import cv2
import numpy as np
import argparse
import csv
import os.path
parser = argparse.ArgumentParser(description='parse the image fileName')
parser.add_argument('-i', help='image name')
parser.add_argument('-c', help='CSV name')
args = parser.parse_args()
print(args.c)

image = np.array(cv2.imread(args.i))

text = pytesseract.image_to_string(image)
print (text)

extracted_text = text.split('\n')[3:-5]
print(extracted_text)

for i in range(len(extracted_text)):
    extracted_text[i] = extracted_text[i].split(" ")
    extracted_text[i][0] = str(extracted_text[i][0]).lower()
    extracted_text[i][1] = int(extracted_text[i][1][:-2])




Medical = 0
Food = 0
Essentials = 0
Fuel = 0
Clothes = 0
Others = 0

data = {
    "Medical" : ["combiflame", "crocin", "paracetemol", "painKiller", "bandage", "anticeptic"],
    "Food" : ["sandwich", "coffee", "tea", "pasta", "maggi", "oreo"],
    "Essentials" : ["olive-oil", "dal", "wheat", "milk", "soap", "body-wash"],
    "Fuel" : ["CNG", "petrol", "Diesel"],
    "Clothes" : ["shirt", "pant", "jeans", "t-shirt", "shorts", "tops"]
}

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


# print(Medical, Food, Essentials, Fuel, Clothes, Others)


filename = args.c
file_exists = os.path.isfile(filename) 
rows = [['Medical', Medical],['Food',Food],['Essentials',Essentials],['Fuel',Fuel],['Clothes',Clothes],['Others',Others]]

if file_exists:
    # do something
    with open(filename, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        line_count = 0
        ptr=0
        for row in csv_reader:
            rows[ptr][1]+=int(row['amount'])
            ptr+=1
            line_count += 1
fields = ['category', 'amount']

with open(filename, 'w', newline='') as csvfile: 
    # creating a csv writer object 
    csvwriter = csv.writer(csvfile) 
        
    # writing the fields 
    csvwriter.writerow(fields) 
        
    # writing the data rows 
    csvwriter.writerows(rows)