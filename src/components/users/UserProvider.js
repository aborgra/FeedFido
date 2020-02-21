import React, {useState, useEffect, useContext } from "react"
import { KidPetChoreContext } from "../chores/KidPetChoreProvider";

export const UserContext = React.createContext()

export const UserProvider = (props) => {
  const [users, setUsers] = useState([])
  const { kidPetChores } = useContext(KidPetChoreContext);

  const getUsers = () => {
    return fetch("http://localhost:8088/users?_embed=kidPetChores")
          .then(res => res.json())
          .then(setUsers)
  }

  const addUser = user => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(getUsers)
  }

  const editUser = user => {
    return fetch(`http://localhost:8088/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(getUsers);
  };

  const deleteUser = user => {
    return fetch(`http://localhost:8088/users/${user.id}`, {
      method: "DELETE",
    })
      .then(getUsers)
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    // console.log("***Users APP STATE CHANGED", users)
  }, [users])

  useEffect(() => {
    // console.log("***Users APP STATE CHANGED", users)
    getUsers()
  }, [kidPetChores])

 

  return (
    <UserContext.Provider value = {{
      users, addUser, editUser, deleteUser
    }}>
        {props.children}
    </UserContext.Provider>
  )
}