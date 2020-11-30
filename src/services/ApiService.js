import axios from 'axios'
const url = 'https://unfairtobacco.org/wp-json/endpoint/v1/diashows/'

export default {
  async getDiashows () {
    return axios.get(url + 'de')
      .then((diashows) => { return diashows.data })
      .catch((err) => console.log(err))
  }
}