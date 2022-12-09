import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { MyBar } from "../MyBar/MyBar"

export const ApplicationViews = ({theme}) => {
	
	return <Routes>
				<Route path="/" element={
					//do i need a home component?
					<Outlet theme={theme}/>
				}>
					<Route path="/mybar" element={ <MyBar theme={theme}/>}></Route>
				</Route>
		
		
			</Routes>
}

