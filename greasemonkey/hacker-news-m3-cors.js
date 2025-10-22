// ==UserScript==
// @name         hacker-news-m3 CORS
// @namespace    rbits.hacker-news-m3-cors
// @description  Allows Hacker News CORS requests for hacker-news-m3
// @version      1.0
// @author       rbits
// @icon         https://news.ycombinator.com/y18.svg
// @match        *://localhost/*
// @match        file:///*
// @connect      news.ycombinator.com
// @grant        GM.xmlHttpRequest
// @license      GPL3
// ==/UserScript==

const HackerNewsCORS = document.body.appendChild(Object.assign(
  document.createElement('div'),
  { id: 'HackerNewsCORS' }
));


HackerNewsCORS.fetch = (url, options) => new Promise((resolve, reject) => {
  const urlObj = new URL(url);
  if (urlObj.hostname !== 'news.ycombinator.com') {
    reject('Hostname must be news.ycombinator.com');
    return;
  }

  GM.xmlHttpRequest({
    ...options,
    url,
    onload: (response) => resolve(response),
    onerror: (response) => resolve(response),
    ontimeout: (response) => resolve(response),
  });
});