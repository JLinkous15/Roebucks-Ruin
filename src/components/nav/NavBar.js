import { Link, useNavigate } from "react-router-dom"
import { FaBars } from "react-icons/fa";
import "./NavBar.css"
import "../../index.css"
import { NavBarData_User } from "./NavBarData";
import { useState } from "react";

export const NavBar = ({setTheme, theme}) => {
    const[hamburger, setHamburger]=useState(false)
    const navigate = useNavigate()
  
    return (
        <div className="nav">
            <ul className={`navbar ${theme?"dark":"light"}`}>
                <li className="navbar_item">
                    <Link className="navbar_link" to="/"><img className="navbar_image logo" alt="home" src="../../icons/Roebucksruin_Bug.svg"/></Link>
                </li>
                <div className="navbar_item right">
                    {theme?
                        <button className="btnDark"
                        onClick={(e)=>{setTheme(!theme)}}>
                            <img className="navbar_image toggle" 
                            src="../../icons/darkmode_dark.svg" 
                            alt="moon" />
                        </button>:
                        <button className="btnDark"
                        onClick={(e)=>{setTheme(!theme)}}>
                            <img className="navbar_image toggle"
                            src="../../icons/darkmode_light.svg"
                            alt="sun" />
                        </button>
                    }
                <li className="navbar_bars">
                    <Link className={`navbar_image bars ${theme?"dark":"light"}`} onClick={()=>{setHamburger(!hamburger)}}><FaBars /></Link>
                </li>
                </div>
            </ul>
            <div className="nav_menu_container">
                <nav className={`nav_menu${hamburger?"_active":""} ${theme?"dark":"light"}`}>
                    <ul className="nav_menu_list">
                        {NavBarData_User.map((listItem, index)=>{
                                return (
                                    <li className="nav_menu_content" key={index}>
                                        <Link className={theme?"nav-text dark":"nav-text light"} to={listItem.path} 
                                        onClick={()=>{setHamburger(!hamburger)}}>
                                            {listItem.icon} {listItem.title}
                                        </Link>
                                    </li>
                                )
                            })}
                    <button className={`btn ${theme?"light":"dark"}`}
                    onClick={()=>{
                        localStorage.removeItem("roebucks_user", { replace : true })
                        navigate("/")
                    }}>
                        Logout
                    </button>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

