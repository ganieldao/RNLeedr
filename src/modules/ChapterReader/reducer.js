const INITIAL_STATE = {
	content: "",
	contentDownloaded:false,
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
			return {
				...state,
				content:action.content,
				contentDownloaded:action.contentDownloaded
			}
		default:
			return state;
	}
}