import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  const [url, setUrl] = useState("http://localhost:3001/pets")

  function onChangeType(e){
    setFilters({ type: e.target.value })
    if(e.target.value === "all"){
      setUrl("http://localhost:3001/pets")
    } else if (e.target.value === "cat"){
      setUrl("http://localhost:3001/pets?type=cat")
    } else if (e.target.value === "dog"){
      setUrl("http://localhost:3001/pets?type=dog")
    } else if (e.target.value === "micropig"){
      setUrl("http://localhost:3001/pets?type=micropig")
    }
  }

  function onFindPetsClick(){
    fetch(url)
    .then(res => res.json())
    .then(petData => setPets(petData))
  }

  function onAdoptPet(id){
    const updatedPets = pets.map((pet) => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet;
    });
    setPets(updatedPets);
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;