import Realm from 'realm';
import realm from './Schema';

let FictionService = {
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
        url:data.url, 
        chapters:chapterArray
      }, true);
    });
    //Need some way to check if anything was updated to return to the reducer
  },

  removeFiction(url) {
    let obj = realm.objectForPrimaryKey('Fiction', url);
    realm.write(() => {
      realm.delete(obj);
    })
  }
}

module.exports = FictionService;

