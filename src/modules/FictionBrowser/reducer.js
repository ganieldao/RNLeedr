const INITIAL_STATE = {
    list: [],
    error: null
}

export default function (state = INITIAL_STATE, action) {
	switch (action.type) { //Following is temp
		case 'RETRIEVE_FICTION_DETAILS_SUCCESS':
			return {
				...state,
				details: action.details
			};
		default:
			return state;
	}
}