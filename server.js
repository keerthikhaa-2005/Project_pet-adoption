const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pet-adoption', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Pet Schema
const petSchema = new mongoose.Schema({
    name: String,
    age: String,
    breed: String,
    description: String,
    adopted: { type: Boolean, default: false }
});

const Pet = mongoose.model('Pet', petSchema);

// Get all pets
app.get('/pets', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new pet
app.post('/pets', async (req, res) => {
    const pet = new Pet(req.body);
    try {
        const newPet = await pet.save();
        res.status(201).json(newPet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a pet
app.put('/pets/:id', async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedPet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a pet
app.delete('/pets/:id', async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.json({ message: 'Pet deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
