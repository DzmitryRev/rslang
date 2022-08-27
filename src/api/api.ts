import axios from '../../node_modules/axios/index';

import { UserType } from './api.types';

export class API {
  static host: string = 'http://localhost:8080';

  /* ------ words api -------*/
  static getWords(page: number, group: number) {
    if (page && group) return axios.get(`${this.host}/words?page=${page}&group=${group}`);
    else return axios.get(`${this.host}/words`);
  }

  static getWord(id: string) {
    return axios.get(`${this.host}/words/${id}`);
  }

  /* ------ users api -------*/

  static createUser(user: UserType) {
    return axios.post(this.host + '/users', user, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  static getUser(id: string, token: string) {
    return axios.get(`${this.host}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /* ------ signin api -------*/

  static signin(user: Omit<UserType, 'name'>) {
    return axios.post(this.host + '/signin', user, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  /* ------ users/words api -------*/

  static getUserWords(userId: string, token: string) {
    return axios.get(`http://localhost:8080/users/${userId}/words`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static getUserWord(userId: string, wordId: string, token: string) {
    return axios.get(`${this.host}​/users/${userId}​/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /* ------ users/aggregatedWords api -------*/

  static getAggregatedWords(id: string, wordId: string) {
    if (wordId) return axios.get(`${this.host}​/users/${id}​/aggregatedWords/${wordId}`);
    return axios.get(`${this.host}​/users/${id}​/aggregatedWords`);
  }
}
