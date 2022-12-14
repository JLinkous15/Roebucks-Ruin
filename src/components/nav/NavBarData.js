import { FaAngleLeft, FaBookOpen, FaCalculator, FaCocktail, FaGlassMartiniAlt, FaHome, FaIdCard, FaSearch, FaSignInAlt } from "react-icons/fa";

export const NavBarData_User = [
    {
        title: `Home`,
        path: `/`,
        icon: <FaHome/>,
        cName: `nav-text`
    },{
        title: `Profile`,
        path: `/profile`,
        icon: <FaIdCard/>,
        cName: `nav-text`
    },{
        title: `My Bar`,
        path: `/mybar`,
        icon: <FaGlassMartiniAlt/>,
        cName: `nav-text`
    },{
        title: `Browse`,
        path: `/browse`,
        icon: <FaSearch/>,
        cName: `nav-text`
    },{
        title: `Blog`,
        path: `/blog`,
        icon: <FaBookOpen/>,
        cName: `nav-text`
    },{
        title: `Calculator`,
        path: `/calculator`,
        icon: <FaCalculator/>,
        cName: `nav-text`
    },{
        title: `Equipment`,
        path: `/equipment`,
        icon: <FaCocktail/>,
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