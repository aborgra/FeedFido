import React, {useState, useEffect, useContext } from "react"
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";

export const PetContext = React.createContext()

export const PetProvider = (props) => {
  const [pets, setPets] = useState([])
  const { kidPetChores } = useContext(KidPetChoreContext);

  const getPets = () => {
    return fetch("http://localhost:8088/pets?_embed=kidPetChores")
          .then(res => res.json())
          .then(setPets)
  }

  const addPet = pet => {
    return fetch("http://localhost:8088/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pet)
    })
      .then(getPets)
  }

  const editPet = pet => {
    return fetch(`http://localhost:8088/pets/${pet.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pet)
    }).then(getPets);
  };

  const deletePet = pet => {
    return fetch(`http://localhost:8088/pets/${pet.id}`, {
      method: "DELETE",
    })
      .then(getPets)
  }


  useEffect(() => {
    getPets()
  }, [])

  useEffect(() => {
    // console.log("***Pets APP STATE CHANGED", pets)
  }, [pets])

  useEffect(() => {
    // console.log("***KPC APP STATE CHANGED", kidPetChores)
    getPets()
  }, [kidPetChores])

  return (
    <PetContext.Provider value = {{
      pets, addPet, deletePet, editPet
    }}>
        {props.children}
    </PetContext.Provider>
  )
}