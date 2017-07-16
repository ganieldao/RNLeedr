import Realm from 'realm';
import realm from './Schema';

let FictionService = {

  getChapterContent(chapterKey) {
    let obj = realm.objectForPrimaryKey('Chapter', chapterKey);
    return obj.content;
  },

  addChapterContent(chapterKey, content) {
    let obj = realm.objectForPrimaryKey('Chapter', chapterKey);
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
    //console.log(realm.objects('Fiction').length);
    return realm.objects('Fiction');
  },

  getFictionByKey(key) {
    let obj = realm.objectForPrimaryKey('Fiction', key);
    return obj;
  },

  addFiction(data) {
    console.log("adding fiction to realm");
    let fiction;
    let {fictionInfo, chapterInfos} = data;
    realm.write(() => {
      let chapterArray = [];
        chapterInfos.forEach(function(chapter) {
          chapterArray.push({title:chapter.title, date:chapter.date, url:chapter.url, content:''});
        }, this);
      fiction = realm.create('Fiction', {
        key:fictionInfo.key,
        title:fictionInfo.title, 
        author:fictionInfo.author, 
        img:fictionInfo.img, 
        desc:fictionInfo.desc, 
        url:fictionInfo.url, 
        chapters:chapterArray
      }, true);
    });
  },

  removeFiction(key) {
    let obj = realm.objectForPrimaryKey('Fiction', key);
    realm.write(() => {
      realm.delete(obj);
    })
  }
}

module.exports = FictionService;

