export const USER_ROLES = {
	CUSTOMER: 1
};

export const USER_ROLE_NAMES = {};

USER_ROLE_NAMES[USER_ROLES.CUSTOMER] = 'CUSTOMER';

export const AddRoleToUserObj = user => {
	user.role = USER_ROLE_NAMES[user.role];
	return user;
};

/**
 * Authorization Roles
 */
const AuthRoles = {
	admin: [USER_ROLE_NAMES[USER_ROLES.CUSTOMER]],

	loggedInUser: [USER_ROLE_NAMES[USER_ROLES.CUSTOMER]],
	// staff: ['admin', 'staff'],
	// user: ['admin', 'staff', 'user'],
	onlyGuest: []
};

export default AuthRoles;
