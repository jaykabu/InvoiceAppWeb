import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '../../../@history';
import _ from '../../../@lodash';
import jwtService from '../../services/jwtService';

import constants from '../../fuse-configs/constants';
import { showMessage } from '../../../store/fuse/messageSlice';

export const SET_USER_DATA = '[USER] SET DATA';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';
export const USER_ACCOUNT_BALANCE = '[USER] USER_ACCOUNT_BALANCE';

/**
 * Set user data from Auth0 token data
 */
export function setUserDataAuth0(tokenData) {
	const user = {
		role: ['admin'],
		from: 'auth0',
		data: {
			displayName: tokenData.username,
			photoURL: tokenData.picture,
			email: tokenData.email,
			settings:
				tokenData.user_metadata && tokenData.user_metadata.settings ? tokenData.user_metadata.settings : {},
			shortcuts:
				tokenData.user_metadata && tokenData.user_metadata.shortcuts ? tokenData.user_metadata.shortcuts : []
		}
	};

	return setUserData(user);
}

export const setUserData = user => async (dispatch, getState) => {
	/*
        You can redirect the logged-in user to a specific route depending on his role
         */
	dispatch(showMessage({ message: 'User data saved with api' }));

	// history.location.state = {
	// 	redirectUrl: 'profile' // for example 'apps/academy'
	// };
	history.push('/productList');

	dispatch(setUser(user));
};

/**
 * Update User Settings
 */
export function updateUserSettings(settings) {
	return (dispatch, getState) => {
		const oldUser = getState().auth.user;
		const user = _.merge({}, oldUser, { data: { settings } });

		updateUserData(user, dispatch);

		return dispatch(setUserData(user));
	};
}

/**
 * Update User Shortcuts
 */
export function updateUserShortcuts(shortcuts) {
	return (dispatch, getState) => {
		const { user } = getState().auth;
		const newUser = {
			...user,
			data: {
				...user.data,
				shortcuts
			}
		};

		updateUserData(newUser, dispatch);

		return dispatch(setUserData(newUser));
	};
}

// eslint-disable-next-line consistent-return
export const logoutUser = () => async (dispatch, getState) => {
	const { user } = getState().auth;

	if (!user.role || user.role.length === 0) {
		// is guest
		return null;
	}

	// history.push({
	// 	pathname: '/'
	// });
	jwtService.logout();
	dispatch(userLoggedOut());

	window.location.href = `${constants.FEEDBACK_URL}login/`;
};

/**
 * Update User Data
 */
function updateUserData(user, dispatch) {
	if (!user.role || user.role.length === 0) {
		// is guest
		return;
	}

	jwtService
		.updateUserData(user)
		.then(() => {
			dispatch(showMessage({ message: 'User data saved with api' }));
		})
		.catch(error => {
			dispatch(showMessage({ message: error.message }));
		});
}

const initialState = {
	role: [], // guest
	balance: 0,
	data: {
		displayName: 'John Doe',
		photoURL: 'assets/images/avatars/Velazquez.jpg',
		email: 'johndoe@withinpixels.com',
		shortcuts: ['calendar', 'mail', 'contacts', 'todo']
	}
};

export const getAccountData = createAsyncThunk('store/userBalanceSlice/getUserData', async id => {
	const response = await axios.get(`/Account/balance?userId=${id}`);
	const data = await response.data;

	return data;
});

const dataSlice = createSlice({
	name: 'store/userBalanceSlice',
	initialState: null,
	reducers: {},
	extraReducers: {
		[getAccountData.fulfilled]: (state, action) => action.payload
	}
});

const userSlice = createSlice({
	name: 'auth/user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			return { ...state, ...action.payload };
		},
		userLoggedOut: (state, action) => initialState
	},
	dataSlice,
	extraReducers: {}
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
