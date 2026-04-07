import json
import pickle
import numpy as np

__locations = None
__data_columns =None
__model = None

def get_estimated_price(location,area,bhk,bathroom):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = area
    x[1] = bathroom
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0],2)

def get_location_names():
    return __locations

def load_saved_artifacts():
    print("loading saved artifacts...start")
    global __locations
    global __data_columns

    with open("artifacts/Prediction.json",'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]

    global __model
    with open("artifacts/Chennai_House_Price_Prediction.pickle",'rb') as f:
        __model = pickle.load(f)

    print("loading saved artifacts...end")

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('Ambattur',1028,2,2))
    print(get_estimated_price('Thirumazhisai',885,3,3))
    print(get_estimated_price('Pallavaram',588,2,1))
    print(get_estimated_price('Perungalathur',622,2,2))