import "./NavBar.css"
import "../../index.css"
import { Link, useNavigate } from "react-router-dom"
import { BiX, BiMenu } from "react-icons/bi";
import { NavBarData_User, MyBarData_User } from "./NavBarData";
import { FaAngleLeft } from "react-icons/fa";

export const NavBar = ({
    setTheme, 
    theme, 
    hamburger, 
    setHamburger, 
    myBarMenu, 
    setMyBarMenu}) => {
    
    const navigate = useNavigate()
  
    return (
        <div className="nav">
            <ul className={`navbar ${theme?"dark":"light"}`}>
                <li className="navbar_item">
                    <Link to="/"><img className={`navbar_image ${theme?"logo_light":"logo_dark"}`} alt="home" src="../../icons/Roebucksruin_Bug.svg"/></Link>
                </li>
                <div className="navbar_item right">
                    <button className="btnDark"
                    onClick={(e)=>{setTheme(!theme)}}>
                        <img className={`navbar_image ${theme?"switch_light":"switch_dark"}`} 
                        src={theme?"../../icons/darkmode_dark.svg":"../../icons/darkmode_light.svg"} 
                        alt="moon"/>
                    </button>
                    <li className="navbar_bars">
                        <Link className={`navbar_image bars ${theme?"dark":"light"}`} onClick={()=>{
                            setHamburger(!hamburger)
                        }}>
                            {hamburger?<BiMenu className="navbar_image"/>:<BiX className="navbar_image"/>}
                        </Link>
                    </li>
                </div>
            </ul>
            <div className={`nav_menu_container ${hamburger? "":"active"}`}>
                <nav className={`nav_menu ${theme?"dark":"light"}`}>
                    <ul className="nav_menu_list">
                        <li onClick={()=>{setMyBarMenu(!myBarMenu)}}>
                            <div ><FaAngleLeft />My Bar</div>
                        </li>
                        {NavBarData_User.map((listItem, index)=>{
                            return (
                                <li 
                                className="nav_menu_content" 
                                key={index} 
                                onClick={(e)=>{setHamburger(true)
                                    setMyBarMenu(true)}}>
                                    <Link className={theme?"nav-text dark":"nav-text light"} to={listItem.path}>
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
            <div className={`mybarmenu_menu_container ${hamburger? "":"active"} ${myBarMenu? "":"toggle"}`}>
                <nav className={`nav_menu ${theme?"dark":"light"}`}>
                    <ul className="nav_menu_list">
                        {MyBarData_User.map((listItem, index)=>{
                            return (
                                <li className="nav_menu_content" key={index} onClick={(e)=>{setHamburger(true)
                                    setMyBarMenu(true)}}>
                                    <Link className={theme?"nav-text dark":"nav-text light"} to={listItem.path}>
                                        <div className="menuItem">{listItem.icon}{listItem.title}</div>
                                    </Link>
                                </li>
                                )
                            })}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

