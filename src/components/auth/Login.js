import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const [cocktails, setCocktails] = useState([])
    const [backgroundCocktail, setBackgroundCocktail] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        const id = Math.floor(Math.random() * cocktails.length + 1)

        fetch(`http://localhost:8088/cocktails`)
        .then(res=>res.json())
        .then((res)=>{setCocktails(res)})
        
    }, [])

    useEffect(()=>{
        const id = Math.floor(Math.random() * cocktails.length + 1)
        fetch(`http://localhost:8088/cocktails?id=${id}`)
            .then(res=>res.json())
            .then((res)=>setBackgroundCocktail(res[0])
)
    }, [cocktails])

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("roebucks_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff,
                        darkMode: user.darkMode
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main 
        className="container--login"
            style={{
                backgroundImage: `url(${backgroundCocktail?backgroundCocktail.image:"https://res.cloudinary.com/dwbxabkg7/image/upload/v1670860377/OldFashioned_t3gi32.jpg"})`
            }} >
                    <div className="title">
                    <img alt="RR" src="../../icons/Roebucksruin_Lockup.svg" className="logo"/>
                    
            <section className="form--container">
                
                <form className="form--login" onSubmit={handleLogin}>
                    <fieldset className="login--fieldset">
                        <label className="inputLable" htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="login--fieldset">
                        <button className="btn" type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            </div>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
            
        </main>
    )
}

