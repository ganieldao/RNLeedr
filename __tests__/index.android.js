import 'react-native';
import React from 'react';
const {Response, Request, Headers, fetch} = require('whatwg-fetch');

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import {
  fetchHtmlSource,
  parseChapterLinks,
  parseNovelInfo,
  parseChapterContent
} from '../src/sources/RRLSource'

import file from './test.json';
const HTMLParser = require('fast-html-parser');
var base64 = require('base-64');
var htmlString = base64.decode(file["string"]);

it('Parses novel info correctly', () => {
  var doc = HTMLParser.parse(htmlString);
  expect(parseNovelInfo(doc)).toEqual(file["info"]);
})
