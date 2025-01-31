import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddPetForm from '../components/AddPetForm';

const AddPet = ({ newPet, setNewPet, addPet }) => {
  const navigate = useNavigate();

  const handleAddPet = async () => {
    await addPet();
    navigate('/');
  };

  return (
    <div>
      <h2>Add New Pet</h2>
      <AddPetForm 
        newPet={newPet} 
        setNewPet={setNewPet} 
        addPet={handleAddPet}
      />
    </div>
  );
};

export default AddPet;
