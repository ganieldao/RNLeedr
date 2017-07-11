const INITIAL_STATE = {
  details: {},
  error: null
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
	case 'RETRIEVE_FICTION_DETAILS_SUCCESS':
	  console.log('success');
		return {
		  ...state,
		  details: action.details
		};
	default:
	  return state;
  }
}