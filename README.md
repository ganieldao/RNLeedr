# Leedr
Leedr is a react-native powered fiction reader for royalroadl.com.
It uses redux for state management and realm for offline storage.

![Android Fiction List Screen](http://imgur.com/9jJPweh.png) ![Android Fiction Detail Screen](http://imgur.com/KWtV8HT.png) ![Android Reader Screen](http://imgur.com/aAXwkz8.png)

### Setup

Once you have downloaded or cloned this repository, run `yarn install` inside the directory.
If you have already set up react-native, just open your emulator and run 'react-native run-android' for android and 'reactnative run-ios' for iOS.

### How to use

Adding Fictions:
1. Find the url of the fiction you want.
2. Look for the fiction id: http://royalroadl.com/fiction/this_is_the_id/insert_fiction_name
3. Switch to the add fiction tab in the app, enter the id, and press 'Add'
4. If everything worked, the fiction will appear on the fiction screen in a few seconds

Reading and Downloading Chapters:
1. When you open an undownloaded chapter, the reader will default to the web-view
2. To download the chapter for offline reading, press the download button in the top-right
3. Once downloaded, the reader will switch to the reader-view. If you want to switch back to the web-view, the option is in the menu

### Why is the process so complex?

Before, I used an app called Instapaper for offline reading. Instapaper allows one to save articles from a given url, and it happened to work well with royalroad fictions. When brainstorming this app, I decided that I wanted to mostly keep this process instead of allowing functionality like browsing all available fictions or downloading an entire fiction at once. This app is not meant as a replacement to the royalroad website. I also recognize that the site gets revenue from ads, which those previously-mentioned functions would completely skip. By making users find the link themselves and view the web page for chapters before downloading, I hope to compromise with that issue.
