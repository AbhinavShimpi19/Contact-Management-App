const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc    Get a single contact by ID
// @route   GET /api/contacts/:id
// @access  Private
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  res.status(200).json(contact);
});

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Private
const createContact = asyncHandler(async (req, res) => {
  console.log("The Request body is:", req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const existingContact = await Contact.findOne({ email });
  if (existingContact) {
    res.status(400);
    throw new Error("Contact with this email already exists");
  }

  const contact = await Contact.create({ name, email, phone });

  res.status(201).json(contact);
});

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body, // Only update fields provided in req.body
    { new: true }
  );

  res.status(200).json(updatedContact);
});

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  await Contact.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: `Contact with id ${req.params.id} deleted successfully` });
});

module.exports = { getContacts, getContactById, createContact, updateContact, deleteContact };
