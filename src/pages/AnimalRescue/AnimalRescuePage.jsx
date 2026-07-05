import React, { useState } from "react";
import axios from "axios";

function AnimalRescue() {
  const [formData, setFormData] = useState({
    rescuerName: "",
    animalType: "",
    condition: "",
    location: "",
    contact: "",
  });
  const [image, setImage] = useState(null);

  // 📍 Get current location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            location: `Lat: ${latitude}, Lng: ${longitude}`,
          });
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

    // 🧩 Create FormData and append all text fields manually
    const data = new FormData();
    data.append("rescuerName", formData.rescuerName);
    data.append("animalType", formData.animalType);
    data.append("condition", formData.condition);
    data.append("location", formData.location);
    data.append("contact", formData.contact);
    if (image) data.append("image", image);

    try {
      // ⚡ Don’t set headers manually — Axios does it automatically
      const res = await axios.post("http://localhost:5000/api/animalRescue", data);
      console.log("✅ Response:", res.data);
      alert("✅ Animal rescue report submitted!");

      // Reset form
      setFormData({
        rescuerName: "",
        animalType: "",
        condition: "",
        location: "",
        contact: "",
      });
      setImage(null);
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("❌ Error submitting animal rescue report.");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url("6445772.jpg")` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">🐾 Animal Rescue</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="rescuerName"
            placeholder="Your Name"
            value={formData.rescuerName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="animalType"
            placeholder="Animal Type (e.g., dog, cat)"
            value={formData.animalType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="condition"
            placeholder="Condition (e.g., injured, sick)"
            value={formData.condition}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location (or use button below)"
            value={formData.location}
            onChange={handleChange}
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
            Report Animal
          </button>
        </form>
      </div>
    </div>
  );
}

export default AnimalRescue;
