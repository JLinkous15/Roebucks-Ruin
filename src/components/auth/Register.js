import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"


export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        fullName: "",
        isStaff: false,
        darkMode: true
    })
    const [cocktails, setCocktails] = useState([])
    const [backgroundCocktail, setBackgroundCocktail] = useState({})
    let navigate = useNavigate()

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

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("roebuck_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff,
                        darkMode: true
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = {...customer}
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main 
        className="container--login"
        style={{ 
            textAlign: "center",
            backgroundImage: `url(${backgroundCocktail.image})`
         }}>
            <div className="title-reg">
            <form 
            className="form--login"
            onSubmit={handleRegister}>
                <h1>Registration</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateCustomer}
                           type="text" id="fullName" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateCustomer}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...customer}
                        copy.isStaff = evt.target.checked
                        setCustomer(copy)
                    }}
                        type="checkbox" id="isStaff" />
                    <label htmlFor="email"> I am an employee </label>
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...customer}
                        copy.darkMode = evt.target.checked
                        setCustomer(copy)
                    }}
                        type="checkbox" id="darkMode" />
                    <label htmlFor="email"> Dark Mode </label>
                </fieldset>
                <fieldset>
                    <button className="btn" type="submit"> Register </button>
                </fieldset>
            </form>
            </div>
        </main>
    )
}

