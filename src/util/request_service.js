import axios from 'axios';

export default class RequestService {
  static fetch(query){
    const url = '/graphql';
    const data = {
      query
    };
    return axios({
      method: 'post',
      url,
      data,
    });
  }
}
