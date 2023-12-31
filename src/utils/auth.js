'use client';

const KEY_TOKEN = 'token';
const storage = window.localStorage;

const auth = {
  isAuthenticated: !!storage.getItem(KEY_TOKEN),
  signin(data) {
    auth.isAuthenticated = true;
    storage.setItem(KEY_TOKEN, data);
  },
  signout() {
    auth.isAuthenticated = false;
    storage.clear();
  },
};

export default auth;
