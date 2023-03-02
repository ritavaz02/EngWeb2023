import json

# Read the JSON file
with open('dataset-extra1.json', "r", encoding="utf-8") as f:
    data = json.load(f)

people = data["pessoas"]

i = 0


# Iterate over the dictionary keys and values to add the id field
for value in people:
    value['id'] = i
    i+=1


with open('dataset-extra1.json', 'w', encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)