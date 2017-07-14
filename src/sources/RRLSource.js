const HTMLParser = require('fast-html-parser');

export async function fetchHtmlSource(url) {
  console.log("time to fetch", url);
  let body;
  try {
    const response = await fetch(url);
    body = response['_bodyInit'];
    console.log(body);
  } catch (err) {
    console.log('fetch failed', err);
  } 
  return body;
}

export function parseChapterInfos(doc) {
  console.log("getting chapters");
  //RRL has a table with the id 'chapters'. We are looking for the chapter links which are in the <tbody>
  //Each row of the <tbody> is represented by <tr>
  var rows = doc.querySelector('#chapters').querySelector('tbody').querySelectorAll('tr')
  var info = rows.map(function(row) {
    //This gets date published, which might be used later
    date = row.querySelector('time').text; 
    title = row.querySelector('a').removeWhitespace().text;
    //The first <a> of each row contains the chapter link (without the base url)
    link = 'https://royalroadl.com' + row.querySelector('a').attributes['href'];
    return {"date":date, "title":title, "url":link};
  })

  //console.log(info);
  return info
}

export async function getFictionInfo(url) {
  let info = {};
  let chapterInfos = {};
  try {
    const htmlString = await fetchHtmlSource(url) //First get the html
    var doc = HTMLParser.parse(htmlString); 
    info = parseFictionInfo(doc);
    info['url'] = url; //Add the url to the information
    chapterInfos = parseChapterInfos(doc);
  } catch (err) {
    console.log('Get fiction info failed', err);
  }
  return {fictionInfo:info, chapterInfos:chapterInfos};
}

export function parseFictionInfo(doc) {
  //Maybe include fiction tags?
  var info = {};
  info['title'] = doc.querySelector('h1').text;
  info['author'] = doc.querySelector('h4').querySelector('a').text;
  info['desc'] = formatParse(doc.querySelector('.hidden-content')['childNodes']);
  info['img'] = doc.querySelector('.fic-header').querySelector('img').rawAttributes['src'];
  //Title + author and remove any non-alphanumeric, remove spaces, then lowercase
  info['key'] = ('rr' + info['title'] + info['author']).replace(/[^\w\s]|_/g, "").replace(/\s+/g, '').toLowerCase();;
  //console.log(info);

  return info;
}

export async function getChapterContent(url) {
  let content = '';
  try {
    let htmlString = await fetchHtmlSource(url) //First get the html
    var doc = HTMLParser.parse(htmlString); 
    content = parseChapterContent(doc);
  } catch (err) {
    console.log('Get chapter content failed', err);
  }
  return content;
}

export function parseChapterContent(doc) {
  let nodes = doc.querySelector('.chapter-content')['childNodes'];
  return formatParse(nodes);
}

//Takes array of nodes containing text to be parsed
function formatParse(arr) {
    let finalContent = "";
    for(let i = 0; i < arr.length; i++) {
      let node = arr[i];
      if (node.tagName === 'br') {
        finalContent += '\n';
      } else if (node.tagName === 'p') {
        if(node['childNodes'].length > 1) {
          finalContent += formatParse(node['childNodes']);
        } else {
          finalContent += node.text + '\n';
        }
      } else {
        finalContent += node.text;
      }


    //Need to add table parsing
    //Need to remove prevChapter/nextChapter table at the end
    }

    return finalContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '')  //Remove leading and trailing whitespace
  }