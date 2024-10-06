const express = require('express');
const Student = require('../models/student');
const router = express.Router();

// Create new student
router.post('/students', async (req, res) => {
  const student = new Student(req.body);
  try {
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send(); // Return 404 if student not found
    res.send(student); // Send the found student
  } catch (error) {
    res.status(500).send(error); // Handle server errors
  }
});

// Update student
router.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).send();
    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete student
router.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).send();
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
