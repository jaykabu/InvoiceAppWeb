import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route';

import Home from '../main/company/Company';


export default function Routes() {
	const getAccessToken = () => {
		return localStorage.getItem('jwt_access_token');
	};
	console.log('getAccessToken:::::::::', getAccessToken());
	console.log('Route:::::::::', Route);

	if (getAccessToken()) {
		return (
			// <BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />

				{/* <Route path="/dashboard" component={Dashboard} isPrivate /> */}

				{/* redirect user to SignIn page if route does not exist and user is not authenticated */}
				<Route component={Home} />
			</Switch>
			// </BrowserRouter>
		);
	}
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			{/* <Route path="/dashboard" component={Dashboard} isPrivate /> */}

			{/* redirect user to SignIn page if route does not exist and user is not authenticated */}
			<Route component={Home} />
		</Switch>
	);
}
