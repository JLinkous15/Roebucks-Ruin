import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


export const BlogList = ({theme, setHamburger, setMyBarMenu}) => {
    const localUser = localStorage.getItem("roebucks_user")
    const localUserObj = JSON.parse(localUser)

    const navigate = useNavigate()
 
console.log(localUserObj)
    return (<section className={`Blog componentContainer ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
            setMyBarMenu(true)}}>

                {localUserObj.staff
                    ?<Link to="/blog/blogwrite" className={theme?"light":"dark"}>Write a new article.</Link>
                    :""}

            </section>)
}