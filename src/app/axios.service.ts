import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() { 
    axios.defaults.baseURL = 'http://localhost:8095'; // Set your base URL here
    axios.defaults.headers.common['Content-Type'] = 'application/json'; // Set default headers if needed
  }

  request(method: string, url: string, data?: any) {
    return axios({
      method: method,
      url: url,
      data: data
    });
  }
}
