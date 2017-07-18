export async function fetchHtmlSource(url) {
  console.log("time to fetch", url);
  let body;
  try {
    const response = await fetch(url);
    body = response['_bodyInit'];
    console.log('fetch success');
  } catch (err) {
    console.log('fetch failed', err);
  } 
  return body;
}