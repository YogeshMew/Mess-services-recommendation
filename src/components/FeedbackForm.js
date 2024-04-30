// frontend/src/components/FeedbackForm.js
import React, { useState } from 'react';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    meal_type: '',
    rating: '',
    comment: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Clear form after submission if needed
        setFormData({
          user_id: '',
          meal_type: '',
          rating: '',
          comment: '',
        });
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
      });
  };

  return (
    <div>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input
            type="number"
            name="user_id"
            value={formData.user_id}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Meal Type:
          <input
            type="text"
            name="meal_type"
            value={formData.meal_type}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Comment:
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
