import { Link, useNavigate } from "react-router-dom"
import { BlockOne } from "./BlockOne"
import "./Home.css"
import "../../index.css"

export const Home = ({theme, setHamburger, setMyBarMenu}) => {
    const navigate = useNavigate()

    return <section className={`Home componentContainer ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>
                
                <BlockOne 
                theme={theme} />

                <div className={`carrousels`}>

                        {/*Carrousel for most recent drinks in a given category*/}
                        {/*Carrousel for most recent drinks in a given category*/}
        
                </div>
    </section>
}