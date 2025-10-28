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


// Returns true on successful sign in
export async function signIn(username: string, password: string): Promise<boolean> {
  const response = await fetchCors('https://news.ycombinator.com/login', {
    method: 'POST',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `acct=${username}&pw=${password}`,
  })

  return (response.ok && response.url === 'https://news.ycombinator.com/');
}


// Returns true on successful sign out (even if already signed out)
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
    return false;
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


async function fetchCors(url: string, options: RequestOptions): Promise<CorsResponse> {
  if (Platform.OS === 'web' && !window.HackerNewsCORS) {
    throw new Error('HackerNewsCORS is required');
  }

  if (options.headers === undefined) {
    options.headers = {};
  }

  // Set CORS headers
  options.headers['Host'] = 'news.ycombinator.com';
  options.headers['Referer'] = 'https://news.ycombinator.com/';
  options.headers['Origin'] = 'https://news.ycombinator.com';
  options.headers['Sec-Fetch-Dest'] = 'document';
  options.headers['Sec-Fetch-Mode'] = 'navigate';
  options.headers['Sec-Fetch-Site'] = 'same-origin';
  options.headers['Sec-Fetch-User'] = '?1';


  switch(Platform.OS) {
    case 'web': {
      // Convert options to other format
      const newOptions: HackerNewsCorsOptions = {
        method: options.method ?? 'GET',
        data: options.body?.toString(),
        headers: options.headers,
      }

      const response = await window.HackerNewsCORS.fetch(url, newOptions);
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
      const response = await fetch(url, options);

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