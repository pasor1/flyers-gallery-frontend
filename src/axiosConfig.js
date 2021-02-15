import axios from "axios";

const instance = axios.create({
  baseURL: 'https://j9ukgabfd0.execute-api.eu-south-1.amazonaws.com/dev/'
});

export default instance;