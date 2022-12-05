import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const localRoebuck=localStorage.getItem("roebucks_user")
    const localRoebuckObj = JSON.parse(localRoebuck)
    const navigate = useNavigate()
    const[currentUser, setCurrentUser]=useState({})

console.log(localRoebuckObj)
    //set currentUser to match the user in props
//     useEffect(()=>{
//         fetch(`http://localhost:8088/users?id=${localRoebuckUser.id}`)
//         .then(res=>res.json())
//         .then((user)=>{setCurrentUser(user[0])})
//     }, [])

// console.log(localRoebuckUser.id)

//     //Functionality of the nightMode button
//     const handleNightMode = (e) => {
        

//         if(localRoebuckUser.nightMode){
//             const copy = {...currentUser}
//             copy.nightMode=false
//             fetch(`http://localhost:8088/users/${localRoebuckUser.id}`,{
//                 method: "PUT",
//                 headers:{
//                     "Content-Type": "application/json"
//                 },
//                 body: 
//             JSON.stringify(copy)})
//             .then(res=>res.json())
//         } else{
//             //PUT request updating user profile to true
//             const copy = {...currentUser}
//             copy.nightMode=true
//             fetch(`http://localhost:8088/users/${localRoebuckUser.id}`,{
//                 method: "PUT",
//                 headers:{
//                     "Content-Type": "application/json"
//                 },
//                 body: 
//             JSON.stringify(copy)})
//             .then(res=>res.json())
            
//         }
//     }

    return (
        <ul className="navbar">
            <li className="navbar logo">
                <Link className="navbar_link" to="/"><img className="navbar_link_image" alt="home" src="../../icons/Roebucksruin_Bug.svg"/></Link>
            </li>
            {
                localStorage.getItem("roebucks_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("roebucks_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
            <button className="btn_darkMode"></button> 
        </ul>
    )
}

