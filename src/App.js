import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from './components/Navigation';
import AvailablePets from './pages/AvailablePets';
import AdoptedPets from './pages/AdoptedPets';
import AddPet from './pages/AddPet';
import EditPetForm from './components/EditPetForm';


const PetRoutes = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({ name: '', age: '', breed: '', description: '', adopted: false });
  const [editPet, setEditPet] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pets');
      setPets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addPet = async () => {
    try {
      await axios.post('http://localhost:5000/pets', newPet);
      fetchPets();
      setNewPet({ name: '', age: '', breed: '', description: '', adopted: false });
    } catch (error) {
      console.log(error);
    }
  };

  const editPetDetails = async () => {
    try {
      await axios.put(`http://localhost:5000/pets/${editPet._id}`, editPet);
      fetchPets();
      setEditPet(null);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePet = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/pets/${id}`);
      fetchPets();
    } catch (error) {
      console.log(error);
    }
  };

  const adoptPet = async (id) => {
    try {
      const pet = pets.find(p => p._id === id);
      if (!pet) return;

      const response = await axios.put(`http://localhost:5000/pets/${id}`, { ...pet, adopted: true });
      
      // Update the local state with the updated pet
      setPets(prevPets => prevPets.map(p => 
        p._id === id ? { ...p, adopted: true } : p
      ));

      setMessage(`${pet.name} has been successfully adopted!`);
      
      // Small delay to ensure state is updated before navigation
      setTimeout(() => {
        navigate('/adopted');
      }, 100);

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error adopting pet:', error);
      setMessage('Failed to adopt pet. Please try again.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>Pet Adoption System</h1>
      <Navigation />
      
      {message && (
        <div style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '1rem',
          textAlign: 'center',
          margin: '1rem auto',
          maxWidth: '500px',
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}
      
      <div style={{ padding: '0 2rem' }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <AvailablePets 
                pets={pets}
                setEditPet={setEditPet}
                deletePet={deletePet}
                adoptPet={adoptPet}
              />
            } 
          />
          <Route 
            path="/adopted" 
            element={
              <AdoptedPets 
                pets={pets}
                deletePet={deletePet}
              />
            } 
          />
          <Route 
            path="/add" 
            element={
              <AddPet 
                newPet={newPet}
                setNewPet={setNewPet}
                addPet={addPet}
              />
            } 
          />
        </Routes>

        {editPet && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '2rem',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            zIndex: 1000
          }}>
            <EditPetForm 
              editPet={editPet} 
              setEditPet={setEditPet} 
              editPetDetails={editPetDetails}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <PetRoutes />
    </Router>
  );
}

export default App;
