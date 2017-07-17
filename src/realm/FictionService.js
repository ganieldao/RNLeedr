import Realm from 'realm';
import realm from './Schema';

let FictionService = {

  getChapterContent(chapterKey) {
    let obj = realm.objectForPrimaryKey('ChapterDetail', chapterKey);
    return obj.content;
  },

  addChapterContent(chapterKey, content) {
    let obj = realm.objectForPrimaryKey('ChapterDetail', chapterKey);
    realm.write(() => {
      obj.content = content;
    });
    return obj.content;
  },

  updateChapterOffset(chapterKey, offset) {
    let obj = realm.objectForPrimaryKey('Chapter', chapterKey);
    realm.write(() => {
      obj.offset = offset;
    });
  },

  updateChapterRead(chapterKey, read) {
    let obj = realm.objectForPrimaryKey('Chapter', chapterKey);
    realm.write(() => {
      obj.read = read;
    });
  },

  updateFictionCurrent(fictionKey, current) {
    let obj = realm.objectForPrimaryKey('FictionDetail', fictionKey);
    realm.write(() => {
      obj.current = current;
    });
  },

  getChapterOffset(chapterKey) {
    let obj = realm.objectForPrimaryKey('Chapter', chapterKey);
    return obj.offset;
  },

  removeChapterContent(chapterKey) {
    let obj = realm.objectForPrimaryKey('Chapter', chapterKey);
    realm.write(() => {
      obj.content = '';
    });
    return obj.content;
  },

  getFictions() {
    return realm.objects('FictionEntry');
  },

  getFictionByKey(key) {
    let obj = realm.objectForPrimaryKey('FictionDetail', key);
    return obj;
  },

  addFiction(data) {
    console.log("adding fiction to realm");
    let fiction;
    let {fictionInfo, chapterInfos} = data;
    realm.write(() => {
      let chapterEntryArray = [];
      chapterInfos.forEach(function(chapter) {
        chapterEntryArray.push({title:chapter.title, date:chapter.date, url:chapter.url});
        realm.create('ChapterDetail', {url:chapter.url, content:''}, true);
      }, this);
      fictionEntry = realm.create('FictionEntry', {
        key:fictionInfo.key,
        title:fictionInfo.title, 
        author:fictionInfo.author, 
        img:fictionInfo.img, 
      }, true);
      fictionDetail = realm.create('FictionDetail', {
        key:fictionInfo.key,
        desc:fictionInfo.desc, 
        url:fictionInfo.url, 
        chapters:chapterEntryArray
      }, true)
    });
    console.log('Done');
  },

  removeFiction(key) {
    let obj = realm.objectForPrimaryKey('Fiction', key);
    realm.write(() => {
      realm.delete(obj);
    })
  }
}

module.exports = FictionService;

