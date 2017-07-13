import {
  fetchHtmlSource,
  parseFictionInfo,
  parseChapterContent
} from '../../sources/RRLSource'

import FictionService from '../../realm/FictionService.js';

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

export function addChapterContent(key, content) {
  FictionService.addChapterContent(key, content);

  return {
    type: 'ADD_CHAPTER_CONTENT_SUCCESS',
    content:content,
    contentDownloaded:true
  }
}