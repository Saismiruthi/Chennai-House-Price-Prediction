# Chennai-House-Price-Prediction
Machine Learning project to predict Chennai house prices using Flask API and a custom trained model.
 
## Features
- Predict price based on:
  - Area (sqft)
  - BHK
  - Bathrooms
  - Location
- Clean UI with validation
- Flask backend API

## Tech Stack
- Python
- Flask
- Machine Learning (Sklearn)
- HTML, CSS, JavaScript


## Project Structure
client/   → Frontend UI  
server/   → Flask backend  
model/    → ML model & dataset 

## How to Run
1. Install dependencies:
   pip install -r requirements.txt

2. Run server:
   python server/server.py

3. Open client:
   Open client/App.html in browser

## Dataset
The dataset contains Chennai housing data with features like area, BHK, bathrooms, and location used for training the model.

## Output
Displays estimated price in Lakhs with price per sqft.

## Author
Saismiruthi
