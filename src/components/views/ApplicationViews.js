import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { MyBar } from "../MyBar/MyBar"

export const ApplicationViews = ({theme, hamburger, setHamburger}) => {
	
	return <Routes>
				<Route path="/" element={
					//do i need a home component?
					<Outlet 
					/>
				}>
					<Route path="/mybar" element={ <MyBar 
					theme={theme}
					hamburger={hamburger}
					setHamburger={setHamburger}/>}></Route>
				</Route>
		
		
			</Routes>
}

