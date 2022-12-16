import "./About.css"

export const AboutUs = ({theme, setHamburger, setMyBarMenu}) => {


    return <section className={`About ${theme?"componentContainer light":"componentContainer dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>

            <img className="martini-about" src="../../images/DirtyMartini.jpg"/>
            <p>Bologna Sandiwches are spectacular
            </p>
            <button className={`btn ${theme?"dark":"light"}`}>Get Starter</button>
        
    </section>
}