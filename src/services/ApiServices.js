import Vue from 'vue';
import axios from "axios";
import VueAxios from "vue-axios";

const baseURL = 'https://jsonplaceholder.typicode.com'

const ApiServices = {
  init() {
    Vue.use(VueAxios,axios);
    axios.defaults.baseURL = baseURL;
    axios.defaults.headers.common["Content-Type"] = "application/json";
  },
  GetRequest(url,data){
    return axios({
        method: "GET",
        url: url,
        headers: {Authorization: "Bearer " + localStorage.getItem("token")}
    }).then((response) => response);
  },
  PostRequest(url,data){
    return axios({
        method: "POST",
        url: url,
        headers: {Authorization: "Bearer " + localStorage.getItem("token")}
    }).then((response) => response);
  }
};
export default ApiServices;