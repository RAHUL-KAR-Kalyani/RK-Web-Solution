import React, { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/Toaster";
import { TooltipProvider } from "./components/ui/Tooltip";
import { Provider } from "react-redux";
import { store } from "./store";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";

const queryClient = new QueryClient();

function ThemeProvider({ children }) {
	useEffect(() => {
		document.documentElement.classList.add("dark");
	}, []);

	return <>{children}</>;
}

function Router() {
	return (
		<Switch>
			<Route path="/" component={Home} />
			<Route component={NotFound} />
		</Switch>
	);
}

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<QueryClientProvider client={queryClient}>
					<TooltipProvider>
						<WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
							<Router />
						</WouterRouter>
						<Toaster />
					</TooltipProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
