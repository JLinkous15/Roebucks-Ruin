import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "../index.css"
import "./RoebucksRuin.css"
import { Footer } from "./Footer/Footer"
import { useState } from "react"


export const RoebucksRuin = () => {
	const [theme, setTheme] = useState(true)
	const[hamburger, setHamburger]=useState(true)

	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<div className={theme?"light":"dark"}>
				<NavBar 
				setTheme={setTheme} 
				theme={theme}
				hamburger={hamburger}
				setHamburger={setHamburger}/>
				
				<Authorized>
					<>
						<ApplicationViews 
						theme={theme}
						hamburger={hamburger}
						setHamburger={setHamburger}/>
					</>
				</Authorized>
				
				<Footer />
			</div>

		} />
	</Routes>
}

