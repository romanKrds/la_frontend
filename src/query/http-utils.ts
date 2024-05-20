// @ts-ignore
import {RequestInit} from "node/globals";
import {getAuthToken} from "../utils";

const HEADERS: Record<string, string> = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  // TODO: change to common auth flow
  'Authorization': "token"
};

export const patchedFetch = (input: string | URL | globalThis.Request, init?: RequestInit,) =>
  fetch(input, {...init, headers: {...HEADERS, ...init?.headers, 'Authorization': getAuthToken()}})
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }

      if (resp.status === 401) {
        location.href = '/login';

        return Promise.reject("Authentication required");
      }

      return resp.json().then(err => Promise.reject(err));
    });
