const INITIAL_STATE = {
	content: "",
	contentDownloaded:false,
	details:{chapters:[]},
  error: null
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) { //Following is temp
		case 'RETRIEVE_CHAPTER_CONTENT_SUCCESS':
			return {
				...state,
				content:action.content,
				contentDownloaded:action.contentDownloaded
			};
		case 'ADD_CHAPTER_CONTENT_SUCCESS':
			console.log("details ", action.details);
			return {
				...state,
				content:action.content,
				contentDownloaded:action.contentDownloaded,
				details:action.details
			};
		case 'REMOVE_CHAPTER_CONTENT_SUCCESS':
			return {
				...state,
				content:action.content,
				contentDownloaded:action.contentDownloaded,
				details:action.details
			};
		case 'UPDATE_CHAPTER_READ_SUCCESS':
			return {
				...state,
				details:action.details
			};
		case 'RETRIEVE_FICTION_DETAILS_SUCCESS':
			return {
				...state,
				details: action.details
			};
		case 'CLEAR_FICTION_DETAILS_SUCCESS':
			return {
				...state,
				details: action.details
			}
		default:
			return state;
	}
}