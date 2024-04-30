# backend/app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///meals.db'
db = SQLAlchemy(app)

# Define models
class MealPreference(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    meal_type = db.Column(db.String(50))
    preference = db.Column(db.String(50))

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    meal_type = db.Column(db.String(50))
    rating = db.Column(db.Integer)
    comment = db.Column(db.Text)

# Routes
@app.route('/preferences', methods=['POST'])
def submit_preferences():
    data = request.json
    preference = MealPreference(
        user_id=data['user_id'],
        meal_type=data['meal_type'],
        preference=data['preference']
    )
    db.session.add(preference)
    db.session.commit()
    return jsonify({'message': 'Preferences submitted successfully'})

@app.route('/feedback', methods=['POST'])
def submit_feedback():
    data = request.json
    feedback = Feedback(
        user_id=data['user_id'],
        meal_type=data['meal_type'],
        rating=data['rating'],
        comment=data['comment']
    )
    db.session.add(feedback)
    db.session.commit()
    return jsonify({'message': 'Feedback submitted successfully'})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
