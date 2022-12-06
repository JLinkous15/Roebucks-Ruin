import { Link, useNavigate } from "react-router-dom"
import { FaBars } from "react-icons/fa";
import "./NavBar.css"
import "../../index.css"
import { NavBarData_User } from "./NavBarData";

export const NavBar = ({setTheme, theme}) => {
    const localRoebuck=localStorage.getItem("roebucks_user")
  
    return (
        <>
            <ul className="navbar">
                <li className="navbar_item">
                    <Link className="navbar_link" to="/"><img className="navbar_image logo" alt="home" src="../../icons/Roebucksruin_Bug.svg"/></Link>
                </li>
                <div className="navbar right">
                    {theme?
                        <button className="btnDark"
                        onClick={(e)=>{setTheme(!theme)}}>
                            <img className="navbar_image toggle" 
                            src="../../icons/darkmode_light.svg" 
                            alt="moon" />
                        </button>:
                        <button className="btnDark"
                        onClick={(e)=>{setTheme(!theme)}}>
                            <img className="navbar_image toggle"
                            src="../../icons/darkmode_dark.svg"
                            alt="sun" />
                        </button>
                    }
                <li className="navbar_bars">
                    <Link className="navbar_image bars" style={theme?{color: "black"}:{color: "white"}}to="/"><FaBars /></Link>
                </li>
                </div>
            </ul>
            <div className="nav_menu_container">
                <nav className="nav_menu active">
                    <ul className="nav_menu_list">
                {NavBarData_User.map((listItem, index)=>{
                        return (
                            <li key={index}><Link className={theme?"nav-text light":"nav-text dark"} to={listItem.path}>{listItem.icon}{listItem.title}</Link></li>
                        )
                    })}
                    </ul>
                </nav>
            </div>
        </>
    )
}

