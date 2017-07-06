
export async function fetchHtmlSource(url) {
    console.log("time to fetch");
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

export function parseChapterLinks(doc) {
    console.log("getting chapters");

    //RRL has a table with the id 'chapters'. We are looking for the chapter links which are in the <tbody>
    //Each row of the <tbody> is represented by <tr>
    var rows = doc.querySelector('#chapters').querySelector('tbody').querySelectorAll('tr')
    var links = rows.map(function(row) {
      //This gets date published, which might be used later
      //console.log(row.querySelector('time').rawText); 

      //The first <a> of each row contains the chapter link (without the base url)
      return 'https://royalroadl.com' + row.querySelector('a').attributes['href'];
    })

    console.log(links);
    return links
  }

export function parseNovelInfo(doc) {
    //Maybe include fiction tags?
    var info = {};
    info['title'] = doc.querySelector('h1').rawText;
    info['author'] = doc.querySelector('h4').querySelector('a').rawText;
    info['desc'] = doc.querySelector('.hidden-content').structuredText;
    info['img'] = doc.querySelector('.fic-header').querySelector('img').rawAttributes['src'];
    return info;
  }

export function parseChapterContent(doc) {
    console.log(doc.querySelector('.chapter-content').structuredText);
  }