import React, {useState, useEffect } from "react"

export const KidPetChoreContext = React.createContext()

export const KidPetChoreProvider = (props) => {
  const [kidPetChores, setKidPetChores] = useState([])

  const getKidPetChores = () => {
    return fetch("http://localhost:8088/kidPetChores?_expand=chore&_expand=pet")
          .then(res => res.json())
          .then(setKidPetChores)
  }

  const addKidPetChore = kidPetChore => {
    return fetch("http://localhost:8088/kidPetChores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(kidPetChore)
    })
      .then(getKidPetChores)
  }

  const editKidPetChore = kidPetChore => {
    return fetch(`http://localhost:8088/kidPetChores/${kidPetChore.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(kidPetChore)
    }).then(getKidPetChores);
  };

  const deleteKidPetChore = kidPetChore => {
    return fetch(`http://localhost:8088/kidPetChores/${kidPetChore.id}`, {
      method: "DELETE",
    })
      .then(getKidPetChores)
  }


  useEffect(() => {
    getKidPetChores()
  }, [])

  useEffect(() => {
    console.log("***kidPetChores APP STATE CHANGED")
  }, [kidPetChores])

  return (
    <KidPetChoreContext.Provider value = {{
      kidPetChores, addKidPetChore, deleteKidPetChore, editKidPetChore
    }}>
        {props.children}
    </KidPetChoreContext.Provider>
  )
}