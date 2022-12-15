export const Home = ({theme, setHamburger, setMyBarMenu}) => {
    return <section className={`Home ${theme?"componentContainer light":"componentContainer dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>

        {/*About with dirty martini*/}

        {/*Most Recent Blog Post*/}

        {/*Carrousel for most recent*/}
        
    </section>
}