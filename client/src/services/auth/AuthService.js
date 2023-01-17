//! CLASSES methods for API CALL for CATEGORIZEs ie. AuthApiService:handles all authApiRequests,ProductApiServices:handles all ProductApiRequest
import axios from "axios";

export class AuthApiService {
  static serverURL = `https://www.google.com`;
  static getAllUsers() {
    // let dataUrl: string = `${this.serverURL}/users`;
    // return axios.get(dataUrl);
  }
  static getUserById(id) {
    // let dataUrl: string = `${this.serverURL}/users/${id}`;
    // return axios.get(dataUrl);
  }
}

//?  HOW TO USE THIS API SERVICE ?
//* =>either make custom hook to have clean code & then call those customHook in either contextFileProvider or directly in your component,
//*==>or directly call these methods in whatever contextfileProvider you want or directly call these methods in your component file
