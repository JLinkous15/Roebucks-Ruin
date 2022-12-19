import "./Blog.css"

export const BlogView = ({theme, setHamburger, setMyBarMenu}) => {


    return <section className={`blog componentContainer ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>
            <div className="blogContainer">
                <div className="blog-hero">
                    <div className="blog-hero-content">
                        <h1>About Roebuck's Ruin</h1>
                        <h3>A talk about ingredients, the website, and olives.</h3>
                        <h3></h3>
                    </div>
                </div>
                <p className="blog-content">
                    Bologna Sandiwches are spectacular
                </p>
            </div>
                <button className={`btn ${theme?"dark":"light"}`}>Get Starter</button>
        
        </section>
}