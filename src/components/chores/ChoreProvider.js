import React, {useState, useEffect } from "react"

export const ChoreContext = React.createContext()

export const ChoreProvider = (props) => {
  const [chores, setChores] = useState([])

  const getChores = () => {
    return fetch("http://localhost:8088/chores")
          .then(res => res.json())
          .then(setChores)
  }

  const addChore = chore => {
    return fetch("http://localhost:8088/chores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chore)
    })
      .then(getChores)
  }

  const deleteChore = chore => {
    return fetch(`http://localhost:8088/chores/${chore.id}`, {
      method: "DELETE",
    })
      .then(getChores)
  }


  useEffect(() => {
    getChores()
  }, [])

  useEffect(() => {
    // console.log("***Chores APP STATE CHANGED")
  }, [chores])

  return (
    <ChoreContext.Provider value = {{
      chores, addChore, deleteChore
    }}>
        {props.children}
    </ChoreContext.Provider>
  )
}