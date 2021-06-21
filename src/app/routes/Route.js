import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export default function RouteWrapper({ component: Component, isPrivate, ...rest }) {
	const login = false;

	/**
	 * Redirect user to SignIn page if he tries to access a private route
	 * without authentication.
	 */
	if (isPrivate && !login) {
		return <Redirect to="/" />;
	}

	/**
	 * Redirect user to Main page if he tries to access a non private route
	 * (SignIn or SignUp) after being authenticated.
	 */
	if (!isPrivate && login) {
		return <Redirect to="/" />;
	}

	/**
	 * If not included on both previous cases, redirect user to the desired route.
	 */
	return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
	isPrivate: PropTypes.bool,
	component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouteWrapper.defaultProps = {
	isPrivate: false
};
