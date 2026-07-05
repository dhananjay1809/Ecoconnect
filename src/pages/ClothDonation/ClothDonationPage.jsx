
import React, { useState } from "react";
import axios from "axios";

export default function ClothDonation() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
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
            location: `Lat: ${latitude}, Lng: ${longitude}`,
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
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("location", formData.location);
      if (image) data.append("image", image);

      const res = await axios.post("http://localhost:5000/api/clothReuse", data);
      console.log("Response:", res.data);
      alert("✅ Cloth donation sent!");
      setFormData({ name: "", description: "", location: "" });
      setImage(null);
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Error submitting cloth donation.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url("6445772.jpg")` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">👕 Cloth Donation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location (or use button below)"
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
            Submit Cloth
          </button>
        </form>
      </div>
    </div>
  );
}
