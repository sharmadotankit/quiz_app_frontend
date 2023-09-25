import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


  export const connectToServer = () =>{
    return new Promise(async (resolve,reject)=>{
      try{
          let response = await axios.get(`${BACKEND_URL}/connect-to-server`);
          resolve(response.data);
      }catch(err){
          reject(err);
      }
  });
  }