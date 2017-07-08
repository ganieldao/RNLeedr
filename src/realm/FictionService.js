import Realm from 'realm';
import realm from './Schema';

let FictionService = {
    getFictions() {
        console.log(realm.objects('Fiction'));
        return realm.objects('Fiction');
    },

    addFiction(data) {
        let {fictionInfo} = data;
        realm.write(() => {
            realm.create('Fiction', {title:fictionInfo.title, author:fictionInfo.author, img:fictionInfo.img}, true);
        });
    }
}

module.exports = FictionService;

