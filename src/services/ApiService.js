import axios from 'axios'
const url = 'https://unfairtobacco.org/wp-json/endpoint/v1/diashows/'

export default {
  async getDiashowsDe () {
    return axios.get(url + 'de')
      .then((diashows) => { return diashows.data })
      .catch((err) => console.log(err))
  },

  async getDiashowsEn () {
    return axios.get(url + 'en')
      .then((diashows) => { return diashows.data })
      .catch((err) => console.log(err))
  }
}