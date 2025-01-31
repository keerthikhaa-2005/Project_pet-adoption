import React from 'react';

const EditPetForm = ({ editPet, setEditPet, editPetDetails }) => {
  return (
    <div>
      <h2>Edit Pet</h2>
      <input
        type="text"
        value={editPet.name}
        onChange={(e) => setEditPet({ ...editPet, name: e.target.value })}
      />
      <input
        type="number"
        value={editPet.age}
        onChange={(e) => setEditPet({ ...editPet, age: e.target.value })}
      />
      <input
        type="text"
        value={editPet.breed}
        onChange={(e) => setEditPet({ ...editPet, breed: e.target.value })}
      />
      <input
        type="text"
        value={editPet.description}
        onChange={(e) => setEditPet({ ...editPet, description: e.target.value })}
      />
      <button onClick={editPetDetails}>Update Pet</button>
    </div>
  );
};

export default EditPetForm;
