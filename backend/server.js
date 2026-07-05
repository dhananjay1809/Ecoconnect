// 🌍 Imports
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ⚙️ Initialize Express app
const app = express();

// 🧩 Middleware setup
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/data", express.static(path.join(__dirname, "data"))); // ✅ serves reports folder

// 📁 Ensure main directories exist
const UPLOAD_DIR = path.join(__dirname, "uploads");
const DATA_DIR = path.join(__dirname, "data");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

// 📸 Multer storage (dynamic per category)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/misc";
    if (req.path.includes("animalRescue")) folder = "uploads/animalRescue";
    else if (req.path.includes("foodDonation")) folder = "uploads/foodDonation";
    else if (req.path.includes("garbageReport")) folder = "uploads/garbageReport";
    else if (req.path.includes("clothReuse")) folder = "uploads/clothReuse";

    const dir = path.join(__dirname, folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// 🧾 Helper Function to Save Text Files
function saveTextFile(prefix, fieldsObj) {
  const safePrefix = prefix.replace(/\s+/g, "_");

  // 📁 Create subfolder for each type
  const subDir = path.join(DATA_DIR, safePrefix);
  if (!fs.existsSync(subDir)) fs.mkdirSync(subDir, { recursive: true });

  const namePart =
    (fieldsObj.name ||
      fieldsObj.donorName ||
      fieldsObj.reporterName ||
      fieldsObj.rescuerName ||
      "report")
      .toString()
      .substring(0, 30)
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_\-]/g, "");

  const fileName = `${Date.now()}-${safePrefix}-${namePart}.txt`;
  const filePath = path.join(subDir, fileName);

  let content = `${prefix.toUpperCase()} REPORT\n=========================\n`;
  for (const [k, v] of Object.entries(fieldsObj)) {
    content += `${k}: ${v ?? ""}\n`;
  }
  content += `SavedAt: ${new Date().toLocaleString()}\n=========================\n`;

  fs.writeFileSync(filePath, content, "utf8");

  return { fileName, filePath };
}

// 🚀 ROUTES

// ========== CLOTH REUSE ROUTE ==========
app.post("/api/clothReuse", upload.single("image"), async (req, res) => {
  try {
    const { name, description, location } = req.body;
    const image = req.file ? req.file.filename : null;

    const { fileName } = saveTextFile("clothReuse", { name, description, location, image });

    res.status(200).json({
      message: "✅ Cloth reuse entry saved!",
      image: image ? `/uploads/clothReuse/${image}` : null,
      textFile: `/data/clothReuse/${fileName}`,
    });
  } catch (err) {
    console.error("❌ Error in clothReuse:", err);
    res.status(500).json({ message: "❌ Server error in clothReuse", error: err.message });
  }
});

// ========== FOOD DONATION ROUTE ==========
app.post("/api/foodDonation", upload.single("image"), async (req, res) => {
  try {
    const { donorName, foodType, quantity, pickupLocation, contact } = req.body;
    const image = req.file ? req.file.filename : null;

    const { fileName } = saveTextFile("foodDonation", {
      donorName,
      foodType,
      quantity,
      pickupLocation,
      contact,
      image,
    });

    res.status(200).json({
      message: "✅ Food donation saved!",
      image: image ? `/uploads/foodDonation/${image}` : null,
      textFile: `/data/foodDonation/${fileName}`,
    });
  } catch (err) {
    console.error("❌ Error in foodDonation:", err);
    res.status(500).json({ message: "❌ Server error in foodDonation", error: err.message });
  }
});

// ========== GARBAGE REPORT ROUTE ==========
app.post("/api/garbageReport", upload.single("image"), async (req, res) => {
  try {
    const { reporterName, description, location } = req.body;
    const image = req.file ? req.file.filename : null;

    const { fileName } = saveTextFile("garbageReport", {
      reporterName,
      description,
      location,
      image,
    });

    res.status(200).json({
      message: "✅ Garbage report submitted!",
      image: image ? `/uploads/garbageReport/${image}` : null,
      textFile: `/data/garbageReport/${fileName}`,
    });
  } catch (err) {
    console.error("❌ Error in garbageReport:", err);
    res.status(500).json({ message: "❌ Server error in garbageReport", error: err.message });
  }
});

// ========== ANIMAL RESCUE ROUTE ==========
app.post("/api/animalRescue", upload.single("image"), async (req, res) => {
  try {
    const { rescuerName, animalType, condition, location, contact } = req.body;
    const image = req.file ? req.file.filename : null;

    const { fileName } = saveTextFile("animalRescue", {
      rescuerName,
      animalType,
      condition,
      location,
      contact,
      image,
    });

    res.status(200).json({
      message: "✅ Animal rescue report saved!",
      image: image ? `/uploads/animalRescue/${image}` : null,
      textFile: `/data/animalRescue/${fileName}`,
    });
  } catch (err) {
    console.error("❌ Error in animalRescue:", err);
    res.status(500).json({ message: "❌ Server error in animalRescue", error: err.message });
  }
});

// ✅ Route to Fetch Reports with Images
app.get("/api/reportsWithImages", (req, res) => {
  try {
    const categories = fs.readdirSync(DATA_DIR);
    let reports = [];

    categories.forEach((category) => {
      const folder = path.join(DATA_DIR, category);
      if (fs.statSync(folder).isDirectory()) {
        const files = fs.readdirSync(folder);

        files.forEach((file) => {
          if (file.endsWith(".txt")) {
            const filePath = path.join(folder, file);
            const stats = fs.statSync(filePath);

            // Try to find matching image
            const uploadsFolder = path.join(UPLOAD_DIR, category);
            let imageFile = null;
            if (fs.existsSync(uploadsFolder)) {
              const imageCandidates = fs
                .readdirSync(uploadsFolder)
                .filter((img) => img.includes(file.split("-")[2])); // match name part
              if (imageCandidates.length > 0) {
                imageFile = `/uploads/${category}/${imageCandidates[0]}`;
              }
            }

            reports.push({
              name: file,
              category,
              url: `http://localhost:5000/data/${category}/${file}`,
              image: imageFile ? `http://localhost:5000${imageFile}` : null,
              date: stats.mtime,
            });
          }
        });
      }
    });

    // Sort by newest first
    reports.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(reports);
  } catch (err) {
    console.error("❌ Error reading reports:", err);
    res.status(500).json({ message: "Error reading reports", error: err.message });
  }
});

// 🧾 DOWNLOAD ROUTE
app.get("/api/download/:category/:filename", (req, res) => {
  const { category, filename } = req.params;
  const filePath = path.join(__dirname, "data", category, filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        console.error("❌ Download error:", err);
        res.status(500).json({ message: "Error downloading file" });
      }
    });
  } else {
    res.status(404).json({ message: "❌ File not found" });
  }
});

// 🗑️ Secure DELETE route (admin-only)
app.delete("/api/delete/:category/:filename", (req, res) => {
  const { category, filename } = req.params;
  const { adminKey } = req.query; // password passed as query parameter

  // 🔒 Simple authentication
  const ADMIN_PASSWORD = "supersecret123"; // <-- change this!

  if (adminKey !== ADMIN_PASSWORD) {
    return res.status(403).json({ message: "❌ Unauthorized access" });
  }

  const reportPath = path.join(__dirname, "data", category, filename);

  try {
    if (!fs.existsSync(reportPath)) {
      return res.status(404).json({ message: "❌ Report not found" });
    }

    // 🧠 Look for image name in text file
    const content = fs.readFileSync(reportPath, "utf8");
    const imageMatch = content.match(/image:\s*(.+)/);
    if (imageMatch && imageMatch[1]) {
      const imageFile = path.basename(imageMatch[1]);
      const imagePath = path.join(__dirname, "uploads", category, imageFile);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    fs.unlinkSync(reportPath);
    res.json({ message: "✅ Report and related image deleted successfully." });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ message: "Server error deleting report", error: err.message });
  }
});


// ========== TEST ROUTE ==========
app.get("/", (req, res) => {
  res.send("🌍 Community Backend is Running...");
});

// ⚡ Start server
app.listen(5000, () => {
  console.log("🚀 Server started on port 5000");
});
