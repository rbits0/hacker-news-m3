// Actions requiring an authorised Hacker News account

import { Platform } from "react-native";


interface CorsResponse {
  body: string,
  headers: Headers,
  status: number,
  statusText: string,
  ok: boolean,
  url: string,
}

interface RequestOptions {
  method?: string,
  body?: string,
  headers?: Record<string, string>,
}

interface HackerNewsCorsOptions {
  method: string,
  data?: string,
  headers?: Record<string, string>,
}

declare namespace window.HackerNewsCORS {
  function fetch(url: string, options: HackerNewsCorsOptions): Promise<{
    response: string,
    responseHeaders: string,
    status: number,
    statusText: string,
    finalUrl: string,
  }>;
}

export class AlreadyDoneError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'AlreadyDoneError';
  }
}

export class NotSignedInError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'NotSignedInError';
  }
}


/**
 * Checks if user is signed in to Hacker News
 * @returns True if user is signed in, false if user is signed out
 * @throws Will throw error on failure to check login state
 */
export async function checkIsSignedIn(): Promise<boolean> {
  const response = await fetchCors('https://news.ycombinator.com/login', {
    method: 'GET',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to check login state');
  }

  return (response.url === 'https://news.ycombinator.com/');
}


/**
 * Signs user in to Hacker News
 * @returns True if successfully signed in
 * @throws {TypeError} Network error
 */
export async function signIn(username: string, password: string): Promise<boolean> {
  const response = await fetchCors('https://news.ycombinator.com/login', {
    method: 'POST',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `acct=${username}&pw=${password}`,
  });

  return (response.ok && response.url === 'https://news.ycombinator.com/');
}


/**
 * Signs user out of Hacker News
 * @returns True if successfuly signed out (even if already signed out)
 * @throws {TypeError} Network error
 */
export async function signOut(): Promise<boolean> {
  const homePage = await fetchCors('https://news.ycombinator.com/login', {
    method: 'GET',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });

  if (homePage.url.startsWith('https://news.ycombinator.com/login')) {
    console.log('Already signed out');
    return true;
  }

  const logoutRegex = /<a id='logout' rel='nofollow' href="(.*?)"/;
  const logoutHref = logoutRegex.exec(homePage.body)?.at(1);

  if (!logoutHref) {
    console.log('Already signed out');
    return true;
  }

  const url = `https://news.ycombinator.com/${logoutHref}`;
  const response = await fetchCors(url, {
    method: 'GET',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });

  if (!response.ok) {
    return false;
  }

  const isSignedOut = logoutRegex.exec(response.body) === null;

  return isSignedOut;
}

/**
 * Votes for Hacker News item
 * 
 * User must be signed in to Hacker News
 * @param itemId ID of item to vote
 * @throws {TypeError} Network error
 * @throws {NotSignedInError} User is not signed in
 * @throws {AlreadyDoneError} User has already voted this item
 * @throws {Error} Unable to vote for some other reason
 */
export async function voteItem(itemId: number) {
  const itemUrl = `https://news.ycombinator.com/item?id=${itemId}`;
  const itemPage = await fetchCors(itemUrl, {
    method: 'GET',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });

  if (!itemPage.ok) {
    throw new Error('Unable to fetch item page');
  }

  const voteRegex = new RegExp(
    `<a [^>]* href='vote\\?id=${itemId}&amp;how=up&amp;auth=(.*?)&`
  )
  const voteAuth = voteRegex.exec(itemPage.body)?.at(1);

  if (!voteAuth) {
    // Couldn't find vote url
    if ((/<a href="login\?.*?">login<\/a>/).test(itemPage.body)) {
      throw new NotSignedInError('User must be signed in to vote');
    } else if (new RegExp(`<a id='un_${itemId}'`).test(itemPage.body)) {
      throw new AlreadyDoneError('Cannot vote for item that is already voted')
    } else {
      console.log(itemPage.body);
      console.log(voteRegex);
      console.log(voteRegex.exec(itemPage.body));
      throw new Error('Failed to parse item page');
    }
  }

  const voteUrl = `https://news.ycombinator.com/vote?id=${itemId}&how=up&auth=${voteAuth}&js=t`;
  const voteResponse = await fetchCors(voteUrl, {
    method: 'GET',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Sec-Fetch-Dest': 'image',
      'Sec-Fetch-Mode': 'no-cors',
    },
  });

  if (!voteResponse.ok || voteResponse.url !== 'https://news.ycombinator.com/ok') {
    console.log(voteUrl);
    console.log(voteResponse);
    throw new Error('Vote failed');
  }
}


export function checkCanFetchCors(): boolean {
  return (Platform.OS !== 'web' || window.HackerNewsCORS !== undefined);
}


/**
 * Fetch, bypassing CORS on both web and native
 * 
 * Requires HackerNewsCORS script if on web (use `checkCanFetchCors`)
 * @param url URL to fetch
 * @param options Options to use in fetch
 * @returns Response
 * @throws {TypeError} Network error
 */
async function fetchCors(url: string, options: RequestOptions): Promise<CorsResponse> {
  if (!checkCanFetchCors()) {
    throw new Error('HackerNewsCORS is required');
  }

  if (options.headers === undefined) {
    options.headers = {};
  }

  // Set CORS headers
  options.headers['Host'] ??= 'news.ycombinator.com';
  options.headers['Referer'] ??= 'https://news.ycombinator.com/';
  options.headers['Origin'] ??= 'https://news.ycombinator.com';
  options.headers['Sec-Fetch-Dest'] ??= 'document';
  options.headers['Sec-Fetch-Mode'] ??= 'navigate';
  options.headers['Sec-Fetch-Site'] ??= 'same-origin';
  options.headers['Sec-Fetch-User'] ??= '?1';


  switch(Platform.OS) {
    case 'web': {
      // Convert options to other format
      const newOptions: HackerNewsCorsOptions = {
        method: options.method ?? 'GET',
        data: options.body?.toString(),
        headers: options.headers,
      }

      let response;
      try {
        response = await window.HackerNewsCORS.fetch(url, newOptions);
      } catch (error) {
        throw new TypeError('Failed to fetch url', { cause: error });
      }

      const responseHeaders = new Headers(
        headersStringToObject(response.responseHeaders)
      );

      return {
        body: response.response,
        headers: responseHeaders,
        status: response.status,
        statusText: response.statusText,
        ok: response.status >= 200 && response.status <= 299,
        url: response.finalUrl,
      };
    }
    // Native
    default: {
      let response: Response;
      try {
        response = await fetch(url, options);
      } catch (error) { 
        throw new TypeError('Failed to fetch url', { cause: error });
      };

      return {
        body: await response.text(),
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url,
      };
  }
  }
}


function headersStringToObject(headers: string): Record<string, string> {
  return Object.fromEntries(
    headers
      .split('\r\n')
      .filter(value => value.length > 0)
      .map((value) => {
        const splitIndex = value.indexOf(':');
        const hasSpace = value[splitIndex + 1] === ' ';
        return [
          value.slice(0, splitIndex),
          value.slice(splitIndex + (hasSpace ? 2 : 1))
        ];
      })
  );
}