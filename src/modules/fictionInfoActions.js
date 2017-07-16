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

export function removeChapterContent(key, fictionKey) {
  FictionService.removeChapterContent(key);
  let details = FictionService.getFictionByKey(fictionKey);
  return {
    type: 'REMOVE_CHAPTER_CONTENT_SUCCESS',
    content:'',
    contentDownloaded:false,
    details:details
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

export function updateChapterRead(chapterKey, fictionKey, read) {
  FictionService.updateChapterRead(chapterKey, read);
  let details = FictionService.getFictionByKey(fictionKey);
  return {
    type: 'UPDATE_CHAPTER_READ_SUCCESS',
    details:details
  }
}

export function updateFictionCurrent(fictionKey, current) {
  FictionService.updateFictionCurrent(fictionKey, current);
  let details = FictionService.getFictionByKey(fictionKey);
  return {
    type: 'UPDATE_FICTION_CURRENT_SUCCESS',
    details:details
  }
}