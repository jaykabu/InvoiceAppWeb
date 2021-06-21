import { createSlice } from '@reduxjs/toolkit';
import jwtService from '../../services/jwtService';
import { setUserData } from './userSlice';

export const generateOtp = ({ phoneNumber, role }) => async dispatch => {
	return jwtService
		.generateOtpOfUser(phoneNumber, role)
		.then(user => {
			// dispatch(setUserData(user));

			return dispatch(loginSuccess());
		})
		.catch(error => {
			return dispatch(loginError(error));
		});
};

export const submitLogin = ({ phoneNumber, role, otp }) => async dispatch => {
	return jwtService
		.signInWithEmailAndPassword(phoneNumber, role, otp)
		.then(user => {
			dispatch(setUserData(user));

			return dispatch(loginSuccess());
		})
		.catch(error => {
			return dispatch(loginError(error));
		});
};

const initialState = {
	success: false,
	error: {
		phoneNumber: null,
		role: null,
		otp: null
	}
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
		},
		loginError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
