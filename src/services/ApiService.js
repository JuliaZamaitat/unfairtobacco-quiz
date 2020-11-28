import axios from 'axios'
const url = 'https://unfairtobacco.org/wp-json/endpoint/v1/'

export default {
  async getDiashows () {
    return axios.get(url + 'post')
      .then((diashows) => { return diashows.data })
      .catch((err) => console.log(err))
  }
}