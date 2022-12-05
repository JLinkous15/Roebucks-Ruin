import { Link } from "react-router-dom"
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
        <label forhtml="socialMedia">Connect</label> 
        <ul className="socialMedia_list">
            <li className="socialMedia_list_item">
                Instagram
                <Link>
                    <svg src="../../icons/insta_white.svg"/>
                </Link>
            </li>
            <li className="socialMedia_list_item">
                <div>Twitter</div>
                <Link>
                    <svg src="../../icons/twitter_white.svg"/>
                </Link>
            </li>
            <li className="socialMedia_list_item">
                <div>Facebook</div>
                <Link>
                    <svg src="../../icons/facebook_white.svg"/>
                </Link>
            </li>
        </ul>
    </footer>)
}