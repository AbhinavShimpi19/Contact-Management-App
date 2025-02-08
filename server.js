const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleWare/errorHandler");
const connectDb = require("./config/dbConnection"); // Import the database connection function

const app = express();

// Connect to Database
connectDb();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Import Routes
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
// Use error handler (always at the end)
app.use(errorHandler);
// Start Server
app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
