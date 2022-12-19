import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


export const ArticleList = ({theme, setHamburger, setMyBarMenu}) => {
    const localUser = localStorage.getItem("roebucks_user")
    const localUserObj = JSON.parse(localUser)
    const navigate = useNavigate()
 
    return (<section className={`Blog componentContainer ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
            setMyBarMenu(true)}}>

                {localUserObj.staff
                    ?<Link to="/articles/articlewrite" className={theme?"light":"dark"}>Write a new article.</Link>
                    :""}

            </section>)
}