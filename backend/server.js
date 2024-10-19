const express = require("express");
const mongoose = require("mongoose");
const ruleRoutes = require("./routes/rules");

const app = express();
const PORT = 5000;

const cors = require("cors");
app.use(cors());

// Middleware
app.use(express.json());
app.use("/api/rules", ruleRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/rule-engine")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
