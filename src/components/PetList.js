import React from 'react';

const PetList = ({ pets, setEditPet, deletePet, adoptPet }) => {
  return (
    <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
      {pets.map((pet) => (
        <div key={pet._id} style={{ 
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: pet.adopted ? '#f8fff8' : 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div>
            <h3 style={{ margin: '0 0 10px 0', color: pet.adopted ? '#2e7d32' : '#333' }}>
              {pet.name} 
              {pet.adopted && (
                <span style={{ 
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.8em',
                  marginLeft: '8px'
                }}>
                  Adopted
                </span>
              )}
            </h3>
            <div style={{ color: '#666' }}>
              <p style={{ margin: '5px 0' }}><strong>Age:</strong> {pet.age}</p>
              <p style={{ margin: '5px 0' }}><strong>Breed:</strong> {pet.breed}</p>
              <p style={{ margin: '5px 0' }}>{pet.description}</p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '10px',
            marginTop: 'auto',
            paddingTop: '15px',
            borderTop: '1px solid #eee'
          }}>
            {!pet.adopted && (
              <>
                <button 
                  onClick={() => setEditPet(pet)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => adoptPet(pet._id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Adopt
                </button>
              </>
            )}
            <button 
              onClick={() => deletePet(pet._id)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: 'auto'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PetList;
