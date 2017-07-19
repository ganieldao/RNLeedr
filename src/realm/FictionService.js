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

  updateChapterStatus(chapterKey, status) {
    let obj = realm.objectForPrimaryKey('Chapter', chapterKey);
    realm.write(() => {
      obj.status = status;
    });
  },

  updateChapters(fictionKey, chapters) {
    let obj = realm.objectForPrimaryKey('Fiction', fictionKey);
    realm.write(() => {
      obj.chapters = chapters;
    });
  },

  updateFictionCurrent(fictionKey, current) {
    let obj = realm.objectForPrimaryKey('Fiction', fictionKey);
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

    //First check if fiction exists. If it does, then mark any changed chapters as new
    //Otherwise, just add them
    let fictionExists = false;
    fiction = realm.objectForPrimaryKey('Fiction', fictionInfo.key);
    if(fiction != null) {
      //console.log('Fiction exists!')
      fictionExists = true;
    }

    realm.write(() => {
      let chapterArray = [];
        chapterInfos.forEach(function(chapter) {
          let chapterInfo = {title:chapter.title, date:chapter.date, url:chapter.url, content:''};
          if(fictionExists) {
            let chapter = realm.objectForPrimaryKey('Chapter', chapterInfo.url);
            if(chapter == null) {
              //console.log('New Chapter!');
              chapterInfo.status = 'new';
            }
          }
          chapterArray.push(chapterInfo);
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

