import { Link } from "react-router-dom"
import { FaFacebookSquare, FaInstagramSquare, FaLinkedinSquare, FaTwitterSquare} from "react-icons/fa"
import "./Footer.css"

export const Footer = () => {

    return (
    <footer className="footer-container">
        <div className="footer-box">
            <label forhtml="about">About</label> 
            <ul className="about_list">
                <li className="about_list_item">
                    <Link><svg src="../../icons/Roebucksruin_Bug.svg"/></Link>
                </li>
            </ul>
            <label forhtml="equipment">Equipment</label> 
            <ul className="equipment_list">
                <li className="equipment_list_item">
                    <Link><svg src="../../icons/Roebucksruin_Bug.svg"/></Link>
                </li>
            </ul>
        </div>
        <label forhtml="socialMedia">Connect:</label> 
        <ul className="socialMedia_list">
            <li className="socialMedia_list_item">
                <Link to="http://www.instagram.com/roebucksruin">
                    <FaInstagramSquare style={{color: "white"}} />
                </Link>
                <div>Instagram</div>
            </li>
            <li className="socialMedia_list_item">
                <Link>
                    <FaTwitterSquare style={{color: "white"}} />
                </Link>
                <div>Twitter</div>
            </li>
            <li className="socialMedia_list_item">
                <Link>
                    <FaFacebookSquare style={{color: "white"}} />
                </Link>
                <div>Facebook</div>
            </li>
        </ul>
    </footer>)
}