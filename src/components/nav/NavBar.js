import "./NavBar.css"
import "../../index.css"
import { Link, useNavigate } from "react-router-dom"
import { BiX, BiMenu } from "react-icons/bi";
import { NavBarData_User } from "./NavBarData";

export const NavBar = ({setTheme, theme, hamburger, setHamburger}) => {
    
    const navigate = useNavigate()
  
    return (
        <div className="nav">
            <ul className={`navbar ${theme?"dark":"light"}`}>
                <li className="navbar_item">
                    <Link className="navbar_link" to="/"><img className={theme?"logo_light":"logo_dark"} alt="home" src="../../icons/Roebucksruin_Bug.svg"/></Link>
                </li>
                <div className="navbar_item right">
                    <button className="btnDark"
                    onClick={(e)=>{setTheme(!theme)}}>
                        <img className={`navbar_image toggle${theme?"light":"dark"}`} 
                        src={theme?"../../icons/darkmode_dark.svg":"../../icons/darkmode_light.svg"} 
                        alt="moon" style={theme?{}:{}}/>
                    </button>
                    <li className="navbar_bars">
                        <Link className={`navbar_image bars ${theme?"dark":"light"}`} onClick={()=>{setHamburger(!hamburger)}}>
                            {hamburger?<BiMenu />:<BiX />}
                        </Link>
                    </li>
                </div>
            </ul>
            <div className={`nav_menu_container ${hamburger? "active":""}`}>
                <nav className={`nav_menu ${theme?"dark":"light"}`}>
                    <ul className="nav_menu_list">
                        {NavBarData_User.map((listItem, index)=>{
                                return (
                                    <li className="nav_menu_content" key={index}>
                                        <Link className={theme?"nav-text dark":"nav-text light"} to={listItem.path} 
                                        onClick={()=>{setHamburger(!hamburger)}}>
                                            <div className="menuItem">{listItem.icon}{listItem.title}</div>
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

