//These actions modify the actual list part of the state

const INITIAL_STATE = {
    list: {},
    error: null
}

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'GET_FICTIONS_SUCCESS':
			console.log('success');
			return {
				...state,
				list: action.list
			};
		case 'ADD_FICTIONS_SUCCESS':
			return {
				...state,
				list: action.list
			}
		default:
			return state;
	}
}