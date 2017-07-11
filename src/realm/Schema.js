var Realm = require('realm');

const FictionSchema = {
  name: 'Fiction',
  primaryKey: 'key',
  properties: {
    key: 'string',
    title: 'string',
    author: 'string',
    img: 'string',
    url: 'string',
    desc: 'string',
    chapters: {type: 'list', objectType:'Chapter'}
  }
};

const ChapterSchema = {
  name: 'Chapter',
  primaryKey: 'url',
  properties: {
    title: 'string',
    date: 'string',
    url: 'string',
    content: 'string'
  }
}

let realm = new Realm({schema: [FictionSchema, ChapterSchema]});

module.exports = realm;