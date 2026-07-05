# 🌍 Community Care Platform

Community Care Platform is a web application designed to make it easier for individuals and organizations to contribute to society.

The platform allows users to:

* 🍱 Donate food
* 👕 Donate clothes
* 🐶 Report animals in need of rescue
* 🗑️ Report garbage cleaning requests
* 📋 View submitted reports
* 📍 Use Google Maps integration for location-based services

The goal is to simplify social welfare activities through an easy-to-use digital platform.

---

# ✨ Features

### 🍱 Food Donation

* Submit food donation requests
* Easy-to-use form
* Track donations

### 👕 Cloth Donation

* Donate unused clothes
* Share pickup details
* Help people in need

### 🐶 Animal Rescue

* Report injured or stray animals
* Share location
* Provide additional information

### 🗑️ Garbage Cleaning

* Report garbage dumps
* Upload location
* Help maintain cleanliness

### 📋 Reports

* View submitted reports
* Organize community requests

### 📍 Google Maps Integration

* Location selection
* Interactive maps
* Accurate reporting

---

# 🛠 Tech Stack

## Frontend

* React
* React Router
* Redux Toolkit
* Axios
* Google Maps API
* Capacitor

## Backend

* Node.js
* Express.js
* MongoDB *(when connected)*

---

# 📂 Project Structure

```
my-app
│
├── src
│   ├── components
│   ├── pages
│   │   ├── AnimalRescue
│   │   ├── ClothDonation
│   │   ├── FoodDonation
│   │   ├── GarbageCleaner
│   │   └── ReportsList
│   │
│   ├── services
│   ├── utils
│   ├── App.jsx
│   └── main.jsx
│
├── public
├── android
└── package.json
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/your-username/your-repository.git
```

Go to the project folder

```bash
cd my-app
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm start
```

For Vite projects:

```bash
npm run dev
```

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

Example:

```env
VITE_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
VITE_BACKEND_URL=http://localhost:5000
```

> Never commit your `.env` file to GitHub.

---

# 📱 Mobile Support

This project includes **Capacitor**, allowing it to be deployed as an Android application.

Build Android project:

```bash
npx cap sync
```

Open Android Studio:

```bash
npx cap open android
```

---

# 📸 Screenshots


<img width="1004" height="398" alt="image" src="https://github.com/user-attachments/assets/b5735406-70b3-4f77-be2a-28d391f9e811" />

<img width="1004" height="816" alt="image" src="https://github.com/user-attachments/assets/9d167b9b-8418-451e-ab07-c79e1c8686ee" />




---

# 🎯 Future Improvements

* User Authentication
* Admin Dashboard
* Push Notifications
* Real-time Tracking
* Image Upload
* NGO Integration
* Volunteer Management
* Dark Mode
* Offline Support

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Create a Pull Request



---

# 👨‍💻 Author

**Dhananjay Ladhi**

GitHub: https://github.com/dhananjay1809/Ecoconnect

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future improvements.

---


