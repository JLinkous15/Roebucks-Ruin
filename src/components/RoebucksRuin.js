import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "../index.css"
import "./RoebucksRuin.css"
import { Footer } from "./Footer/Footer"
import { useEffect, useState } from "react"


export const RoebucksRuin = () => {
	const [theme, setTheme] = useState(true)
	const [hamburger, setHamburger] = useState(true)
	const [myBarMenu, setMyBarMenu] = useState(true)

	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			
			
			<Authorized>
					<>
					<NavBar 
					setTheme={setTheme} 
					theme={theme}
					hamburger={hamburger}
					setHamburger={setHamburger}
					myBarMenu={myBarMenu}
					setMyBarMenu={setMyBarMenu}/>
					<ApplicationViews 
					theme={theme}
					hamburger={hamburger}
					setHamburger={setHamburger}
					myBarMenu={myBarMenu}
					setMyBarMenu={setMyBarMenu}/>
					<Footer 
					setHamburger={setHamburger}
					setMyBarMenu={setMyBarMenu}
					theme={theme}/>
					</>
				</Authorized>
				
			

		} />
	</Routes>
}

