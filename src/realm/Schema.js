var Realm = require('realm');

const FictionSchema = {
    name: 'Fiction',
    primaryKey: 'title',
    properties: {
        title: 'string',
        author: 'string',
        img: 'string',
        chapters: {type: 'list', objectType:'Chapter'}
    }
};

const ChapterSchema = {
    name: 'Chapter',
    primaryKey: 'title',
    properties: {
        title: 'string',
        date: 'string',
        url: 'string',
        content: 'string'
    }
}

let realm = new Realm({schema: [FictionSchema, ChapterSchema]});

module.exports = realm;