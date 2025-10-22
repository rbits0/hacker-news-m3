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

declare namespace HackerNewsCORS {
  function fetch(url: string, options: RequestInit): Promise<{
    response: string,
    responseHeaders: string,
    status: number,
    statusText: string,
    finalUrl: string,
  }>;
}

async function fetchCors(url: string, options: RequestInit): Promise<CorsResponse> {
  switch(Platform.OS) {
    case 'web': {
      if (!HackerNewsCORS) {
        throw new Error('HackerNewsCORS is required');
      }

      const response = await HackerNewsCORS.fetch(url, options);
      const headers = new Headers(
        headersStringToObject(response.responseHeaders)
      );

      return {
        body: response.response,
        headers: headers,
        status: response.status,
        statusText: response.statusText,
        ok: response.status >= 200 && response.status <= 299,
        url: response.finalUrl,
      };
    }
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


function headersStringToObject(headers: string): { [k: string]: string } {
  return Object.fromEntries(
    headers
      .split('\r\n')
      .filter(value => value.length > 0)
      .map((value) => {
        let splitIndex = value.indexOf(': ');
        return [value.slice(0, splitIndex), value.slice(splitIndex + 2)];
      })
  );
}