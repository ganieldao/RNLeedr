import initialState from './initialState.js'

export default function (state = initialState.fictions, action) {
	switch (action.type) {
		case 'RETRIEVE_FICTION_DETAILS_SUCCESS':
			return {
				...state,
				details: action.details
			};
		default:
			return state;
	}
}