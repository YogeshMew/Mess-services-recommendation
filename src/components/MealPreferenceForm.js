// frontend/src/components/MealPreferenceForm.js
import React, { useState } from 'react';

const MealPreferenceForm = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    meal_type: '',
    preference: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/preferences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        // Handle response...
    } catch (error) {
        console.error('Error submitting meal preference:', error);
    }
};
  return (
    <div>
      <h2>Meal Preference Form</h2>
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
          Preference:
          <input
            type="text"
            name="preference"
            value={formData.preference}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MealPreferenceForm;
