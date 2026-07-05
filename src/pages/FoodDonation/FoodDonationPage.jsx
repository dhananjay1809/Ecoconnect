import React, { useState } from "react";
import axios from "axios";

export default function FoodDonation() {
  const [formData, setFormData] = useState({
    donorName: "",
    foodType: "",
    quantity: "",
    pickupLocation: "",
    contact: "",
  });
  const [image, setImage] = useState(null);

  // 📍 Get current location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            pickupLocation: `Lat: ${latitude}, Lng: ${longitude}`,
          }));
        },
        () => {
          alert("⚠️ Please allow location access.");
        }
      );
    } else {
      alert("❌ Geolocation not supported in this browser.");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (image) data.append("image", image);

      const res = await axios.post("http://localhost:5000/api/foodDonation", data);
      console.log("Response:", res.data);
      alert("✅ Food donation submitted!");
      setFormData({
        donorName: "",
        foodType: "",
        quantity: "",
        pickupLocation: "",
        contact: "",
      });
      setImage(null);
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Error submitting food donation.");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url("6445772.jpg")` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">🍱 Food Donation</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            placeholder="Donor Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            placeholder="Food Type"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full p-2 border rounded"
          />
          <input
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            placeholder="Pickup Location (or use button below)"
            className="w-full p-2 border rounded"
          />
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact Number"
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />

          <button
            type="button"
            onClick={handleGetLocation}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            📍 Get My Location
          </button>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Submit Food Request
          </button>
        </form>
      </div>
    </div>
  );
}
