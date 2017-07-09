import Realm from 'realm';
import realm from './Schema';

let FictionService = {
    getFictions() {
        console.log(realm.objects('Fiction').length);
        return realm.objects('Fiction');
    },

    getFictionByUrl(url) {
        let obj = realm.objectForPrimaryKey('Fiction', url);
        return obj;
    },

    addFiction(data) {
        console.log("adding fiction to realm");
        console.log(data);
        let {fictionInfo, chapterInfos} = data;
        realm.write(() => {
            var chapterArray = [];
            chapterInfos.forEach(function(chapter) {
                chapterArray.push({title:chapter.title, date:chapter.date, url:chapter.url, content:''});
            }, this);
            var fiction = realm.create('Fiction', {title:fictionInfo.title, author:fictionInfo.author, img:fictionInfo.img, desc:fictionInfo.desc, url:data.url, chapters:chapterArray}, true);
        });
    }
}

module.exports = FictionService;

