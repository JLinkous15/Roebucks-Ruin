import { Link } from "react-router-dom"
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaTwitterSquare} from "react-icons/fa"
import "./Footer.css"

export const Footer = ({setHamburger, setMyBarMenu, theme}) => {

    return (
    <footer className={`footer-container ${theme?"light":"dark"}`} onClick={(e)=>{setHamburger(true)
        setMyBarMenu(true)}}>
        <label forhtml="socialMedia">Connect:</label> 
        <ul className="socialMedia_list">
            <li className="socialMedia_list_item">
                <a href="http://www.instagram.com/roebucksruin">
                    <FaInstagramSquare className={theme?"light":"dark"} />
                </a>
                <div>Instagram</div>
            </li>
            <li className="socialMedia_list_item">
                <a href="">
                    <FaTwitterSquare className={theme?"light":"dark"} />
                </a>
                <div>Twitter</div>
            </li>
            <li className="socialMedia_list_item">
                <a href="">
                    <FaFacebookSquare className={theme?"light":"dark"} />
                </a>
                <div>Facebook</div>
            </li>
            <li className="socialMedia_list_item">
                <a href="https://www.linkedin.com/in/james-william-linkous/">
                    <FaLinkedin className={theme?"light":"dark"} />
                </a>
                <div>LinkedIn</div>
            </li>
        </ul>
    </footer>)
}