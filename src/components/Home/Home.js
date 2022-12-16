import { Link, useNavigate } from "react-router-dom"
import "./Home.css"

export const Home = ({theme, setHamburger, setMyBarMenu}) => {
    const navigate = useNavigate()

    return <section className={`Home ${theme?"componentContainer light":"componentContainer dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>
                <div className={`block-one`}>
                        {/*About with dirty martini*/}
                    <div className={`about-us`}>
                        <h1 className="about-olives">No Olives</h1>
                        <button class={`btn homeButton`} 
                        onClick={(e)=>{
                            e.preventDefault()
                            navigate(`about`)}}>About Us</button>
                    </div>
                    <div className={`blogs`}>

                    {/*Most Recent Blog Post 1*/}
                    {/*Most Recent Blog Post 2*/}

                    </div>
                </div>
                <div className={`carrousels`}>

                        {/*Carrousel for most recent drinks in a given category*/}
                        {/*Carrousel for most recent drinks in a given category*/}
        
                </div>
    </section>
}