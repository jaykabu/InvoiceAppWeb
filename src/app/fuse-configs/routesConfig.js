import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router';
import Home from '../main/company/Company';

// const routeConfigs = [LoginConfig, ...appsConfigs];

const routes = [
	{
		path: '/',
		exact: true,
		component: () => (
			<Route
				path="/"
				render={() => {
					return <Home />;
				}}
			/>
		)
	},
	{
		component: () => <Redirect to="/404" />
	}
];

export function DashboardAuth() {
	return <Redirect to="/" />;
}

export default routes;
