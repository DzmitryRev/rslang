import axios from '../../node_modules/axios/index';

type User = {
  'email': string;
  'password': string; 
}


export class API {

  static host: string = 'https://react-learnwords-example.herokuapp.com';

  static createUser = async (user: User) => {
    const rawResponse =  await axios.post(this.host + '/users', user, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const pass = await rawResponse.data;
    return pass;
  };
  


  // static getWords(page?:number, group?:number) {
  //   if(page&&group) 
  //     return axios.get(`${this.host}/words?page=${page}&group=${group}`);
  //   else return axios.get(`${this.host}/words`);
  // }
  
  // static getWord(id: number) {
  //   return axios.get(`${this.host}+/words`);
  // }

}


