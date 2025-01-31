import React, { useState, useEffect } from 'react';
import PetList from '../components/PetList';

const AdoptedPets = ({ pets, deletePet }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Debug logging
  useEffect(() => {
    console.log('All pets:', pets);
    console.log('Adopted pets:', pets.filter(pet => pet.adopted));
  }, [pets]);
  
  const adoptedPets = pets
    .filter(pet => pet.adopted === true) // Explicit comparison
    .filter(pet => 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>Adopted Pets</h2>
        <p style={{ color: '#666' }}>
          {adoptedPets.length} {adoptedPets.length === 1 ? 'pet has' : 'pets have'} found their forever homes
        </p>
      </div>

      <div style={{ maxWidth: '500px', margin: '20px auto' }}>
        <input
          type="text"
          placeholder="Search adopted pets by name or breed..."
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

      {adoptedPets.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          color: '#666',
          backgroundColor: '#f9f9f9',
          padding: '2rem',
          borderRadius: '8px',
          margin: '2rem auto',
          maxWidth: '500px'
        }}>
          {searchTerm ? (
            <>
              <h3>No Results Found</h3>
              <p>No adopted pets match your search for "{searchTerm}"</p>
            </>
          ) : (
            <>
              <h3>No Adopted Pets Yet</h3>
              <p>When pets are adopted, they will appear here</p>
            </>
          )}
        </div>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <PetList 
            pets={adoptedPets}
            setEditPet={() => {}}
            deletePet={deletePet}
            adoptPet={() => {}}
          />
        </div>
      )}
    </div>
  );
};

export default AdoptedPets;
