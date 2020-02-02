import {BehaviorSubject} from 'rxjs';

export const token$ = new BehaviorSubject(localStorage.getItem("token"));

// function to keep track if the token is active or not. If not active, then remove the token
export function updateToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
  token$.next(token);
}