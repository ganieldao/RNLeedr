var Realm = require('realm');

const FictionDetailSchema = {
  name: 'FictionDetail',
  primaryKey: 'key',
  properties: {
    key: 'string',
    url: 'string',
    desc: 'string',
    current: {type: 'int', default:0},
    chapters: {type: 'list', objectType:'ChapterEntry'}
  }
};

const FictionEntrySchema = {
  name: 'FictionEntry',
  primaryKey: 'key',
  properties: {
    key: 'string',
    title: 'string',
    author: 'string',
    img: 'string',
  }
}

const ChapterEntrySchema = {
  name: 'ChapterEntry',
  primaryKey: 'url',
  properties: {
    title: 'string',
    date: 'string',
    url: 'string',
    read: {type:'bool', default:false},
    downloaded: {type:'bool', default:false}
  }
}

const ChapterDetailSchema = {
  name: 'ChapterDetail',
  primaryKey: 'url',
  properties: {
    url: 'string',
    content: 'string',
    offset: {type:'int', default:0},
  }
}

let realm = new Realm({schema: [FictionDetailSchema, FictionEntrySchema, ChapterDetailSchema, ChapterEntrySchema]});

module.exports = realm;