var Realm = require('realm');

const FictionSchema = {
    name: 'Fiction',
    properties: {
        title: 'string',
        author: 'string',
        url: 'string',
        img: 'string',
        chapters: {type: 'list', objectType:'Chapter'}
    }
};

const ChapterSchema = {
    name: 'Chapter',
    properties: {
        title: 'string',
        date: 'string',
        url: 'string',
        content: 'string'
    }
}

let realm = new Realm({schema: [FictionSchema, ChapterSchema]});