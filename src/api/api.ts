import axios from '../../node_modules/axios/index';

type User = {
  'email': string;
  'password': string; 
}

export class API {

  static host: string = 'https://react-learnwords-rsl.herokuapp.com';

  
  /* ------ words api -------*/
  static getWords(page?:number, group?:number) {
    if(page && group) 
      return axios.get(`${this.host}/words?page=${page}&group=${group}`);
    else return axios.get(`${this.host}/words`);
  }
  
  static getWord(id: string) {
    return axios.get(`${this.host}/words/${id}`);
  }
  

  /* ------ users api -------*/

  static createUser(user: User) {

    return  axios.post(this.host + '/users', user, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };
  
  static getUser(id: string, token?: string) {

    if(token) return axios.get(`${this.host}/users/${id}/token`);
    return axios.get(`${this.host}/users/${id}`);
  }

  /* ------ signin api -------*/

  static signin(user: User){

    return  axios.post(this.host + '/signin', user, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  /* ------ users/words api -------*/
  
  static getUsersWords(id: string, wordId: string) {
    if (wordId) return axios.get(`${this.host}​/users/${id}​/words/${wordId}`);
    return axios.get(`${this.host}​/users/${id}​/words`);
  }
  
  /* ------ users/aggregatedWords api -------*/

  static getAggregatedWords(id: string, wordId: string) {
    if (wordId) return axios.get(`${this.host}​/users/${id}​/aggregatedWords/${wordId}`);
    return axios.get(`${this.host}​/users/${id}​/aggregatedWords`);
  }

}


