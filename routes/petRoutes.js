const express = require('express');
const Pet = require('../models/Pet');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  const { name, age, breed, description } = req.body;
  const newPet = new Pet({ name, age, breed, description });
  
  try {
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a pet
router.delete('/:id', async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pet deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const searchResults = await Pet.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive search
        { breed: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;