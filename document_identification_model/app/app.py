from flask import Flask, request, jsonify
from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the model and labels here (update file paths)
model = load_model("keras_model/keras_Model.h5", compile=False)
with open("keras_model/labels.txt", "r") as file:
    class_names = file.readlines()

# Create the array of the right shape to feed into the keras model
data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

@app.route('/')
def index():
    return "Welcome to the Image Classifier!"

@app.route('/classify', methods=['POST'])
def classify():
    if request.method == 'POST':
        if 'image' in request.files:
            image_file = request.files['image']
            if image_file:
                image = Image.open(image_file).convert("RGB")
                size = (224, 224)
                image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)
                image_array = np.asarray(image)
                normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
                data[0] = normalized_image_array
                prediction = model.predict(data)
                index = np.argmax(prediction)
                class_name = class_names[index]
                confidence_score = float(prediction[0][index])  # Convert to regular float
                result = {
                    "class_name": class_name[2:],
                    "confidence_score": confidence_score
                }
                return jsonify(result)
        return "Failed to classify image"
    return "Invalid request method"

if __name__ == '__main__':
    app.run(debug=True)
