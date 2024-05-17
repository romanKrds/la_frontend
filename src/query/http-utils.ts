import {RequestInit} from "node/globals";

const HEADERS: Record<string, string> = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  // TODO: change to common auth flow
  'Authorization': "token"
};

export const patchedFetch = (input: string | URL | globalThis.Request, init?: RequestInit,) =>
  fetch(input, {...init, headers: {...HEADERS, ...init?.headers}})
  .then(resp => {
    if (resp.ok) {
      return resp.json();
    }

    return resp.json().then(err => Promise.reject(err));
  })
