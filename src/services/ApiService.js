import axios from 'axios'
const url = 'https://unfairtobacco.org/wp-json/endpoint/v1/'

export default {
  async getDiashows (lang) {
    return axios.get(url + 'diashows/' + lang)
      .then((diashows) => { return diashows.data })
      .catch((err) => console.log(err))
  },
}