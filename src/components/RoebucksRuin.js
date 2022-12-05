import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./RoebucksRuin.css"
import { Footer } from "./Footer/Footer"

export const RoebucksRuin = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<>
				<NavBar />
				<Authorized>
					<>
						<ApplicationViews />
					</>
				</Authorized>
				<Footer />
			</>

		} />
	</Routes>
}

