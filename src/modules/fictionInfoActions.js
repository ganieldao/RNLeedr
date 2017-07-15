import {
  fetchHtmlSource,
  parseFictionInfo,
  parseChapterContent
} from '../sources/RRLSource'

import FictionService from '../realm/FictionService.js';

export function clearFictionDetails() {
  return {
    type: 'CLEAR_FICTION_DETAILS_SUCCESS',
    details: {}
  }
}

export function retrieveFictionDetails(key) {
  console.log("retrieve fiction details ", key);
	let details = FictionService.getFictionByKey(key);
	return {
		type: 'RETRIEVE_FICTION_DETAILS_SUCCESS',
		details: details
	};
}

export function retrieveChapterContent(key) {
  let content = FictionService.getChapterContent(key);
  let contentDownloaded = true;

  if(content === "")
    contentDownloaded = false;

  return {
    type: 'RETRIEVE_CHAPTER_CONTENT_SUCCESS',
    content:content,
    contentDownloaded:contentDownloaded
  }
}

export function addChapterContent(chapterKey, fictionKey, content) {
  FictionService.addChapterContent(chapterKey, content);
  let details = FictionService.getFictionByKey(fictionKey);
  return {
    type: 'ADD_CHAPTER_CONTENT_SUCCESS',
    content:content,
    contentDownloaded:true,
    details:details
  }
}