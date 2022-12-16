export const AboutUs = ({theme, setHamburger, setMyBarMenu}) => {


    return <section className={`Home ${theme?"componentContainer light":"componentContainer dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>

            <img />
            <p></p>
            <button></button>
        
    </section>
}