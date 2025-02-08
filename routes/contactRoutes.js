const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} = require("../controllers/contactController");

// Route definitions
router.get("/", getContacts); // Get all contacts
router.get("/:id", getContactById); // Get a single contact
router.post("/", createContact); // Create a new contact
router.put("/:id", updateContact); // Update a contact
router.delete("/:id", deleteContact); // Delete a contact

module.exports = router;
