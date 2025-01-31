import React, { useState } from 'react';
import PetList from '../components/PetList';

const AvailablePets = ({ pets, setEditPet, deletePet, adoptPet }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const availablePets = pets
    .filter(pet => !pet.adopted)
    .filter(pet => 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <h2>Available Pets</h2>
      <div style={{ maxWidth: '500px', margin: '20px auto' }}>
        <input
          type="text"
          placeholder="Search by pet name or breed..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            marginBottom: '20px'
          }}
        />
      </div>
      {availablePets.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>
          {searchTerm ? 'No pets found matching your search' : 'No pets available for adoption'}
        </p>
      ) : (
        <PetList 
          pets={availablePets}
          setEditPet={setEditPet}
          deletePet={deletePet}
          adoptPet={adoptPet}
        />
      )}
    </div>
  );
};

export default AvailablePets;
