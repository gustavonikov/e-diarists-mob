import { StatusBar } from 'expo-status-bar'
import React from 'react'
import ThemeProvider from './src/styles/themes/ThemeProvider'
import Router from './src/Router'

export default function App() {
	return (
		<ThemeProvider>
			<Router />
		</ThemeProvider>
	);
}
