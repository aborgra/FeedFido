import React from "react"
import { Link } from "react-router-dom"

export default ({pet, history}) => {

return (
    <section className="petCard">
        <h3 className="pet__name">{pet.name}</h3>
        {/* <img className="pet__pic">{pet.pic}</img> */}
        <ul className="pet__chores">Chores:
 
        {pet.foundChoresArray.map(fca => (
        <li>{fca.chores.name}   Due:{fca.dueDate}</li>))}
        </ul>
        

    </section>
)}





