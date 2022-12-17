import { useNavigate } from "react-router-dom"

export const BlockOne = () => {
    const navigate = useNavigate()
    return <div className={`block-one`}>
            {/*About with dirty martini*/}
            <div className={`about-us`}>
                <h1 className="about-olives" style={{color: "#ffffff"}}>Roebuck's Ruin</h1>
                <button className={`btn homeButton`} 
                onClick={(e)=>{
                    e.preventDefault()
                    navigate(`about`)}}>About Us</button>
            </div>
            <div className={`blogs`}>

            {/*Most Recent Blog Post 1*/}
            {/*Most Recent Blog Post 2*/}

            </div>
        </div>
}