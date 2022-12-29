import { FaAngleLeft, FaBookOpen, FaCalculator, FaCocktail, FaGlassMartiniAlt, FaHome, FaIdCard, FaSearch, FaSignInAlt } from "react-icons/fa";

export const NavBarData_User = [
    {
        title: `Profile`,
        path: `/profile`,
        cName: `nav-text`
    },{
        title: `Articles`,
        path: `/articles`,
        cName: `nav-text`
    },{
        title: `Calculator`,
        path: `/calculator`,
        cName: `nav-text`
    },{
        title: `Equipment`,
        path: `/equipment`,
        cName: `nav-text`
    }
]

export const MyBarData_User = [
    {
        title: `My Drinks`,
        path: `/mybar`,
        cName: `nav-text`
    },
    {
        title: `Create`,
        path: `/mybar/create`,
        cName: `nav-text`
    },
    {
        title: `Browse`,
        path: `/browse`,
        icon: <FaSearch/>,
        cName: `nav-text`
    }
    
]

export const NavBarData = [
    {
        title: `Login`,
        path: `/login`,
        icon: <FaSignInAlt/>,
        cName: `nav-text`
    }
]