const axios=require('axios');

axios.defaults.headers.post['Content-Type'] = 'application/json';


const instance = axios.create({
    baseURL: 'https://crowdfunding-dapp-backend.herokuapp.com/'
  });


export default instance;