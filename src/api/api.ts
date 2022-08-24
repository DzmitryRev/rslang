import axios from '../../node_modules/axios/index';

type User = {
  'email': string;
  'password': string; 
}


export class API {

  static host: string = 'https://react-learnwords-example.herokuapp.com';

  static async createUser(user: User) {
    const userResponse =  await axios.post(this.host + '/users', user, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const pass = await userResponse.data;
    return pass;
  };
  
  static async getUser(id: string) {
    const userResponse = await axios.get(`${this.host}/users/${id}`);
    return  userResponse;
  }

  static async getWords(page?:number, group?:number) {
    if(page && group) 
      return axios.get(`${this.host}/words?page=${page}&group=${group}`);
    else return axios.get(`${this.host}/words`);
  }
  
  static async getWord(id: string) {
    const wordResponse = await axios.get(`${this.host}/words/${id}`);
    return  wordResponse;
  }


}


