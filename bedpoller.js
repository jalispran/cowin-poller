var axios = require('axios');

console.log('Bed Polling Started')


const URBAN = '1'
const RURAL = '0'
const GET_AREA_LIST = 'https://swasthy.ekatta.in/API/Person/GetHospitalArea/'
const GET_NEW_BEDS = `https://swasthy.ekatta.in/API/Person/GetNewBeds/`
const GET_BEDS_IN_URBAN = `https://swasthy.ekatta.in/API/Person/GetNewBeds/${URBAN}`
const GET_BEDS_IN_RURAL = `https://swasthy.ekatta.in/API/Person/GetNewBeds/${RURAL}/`

function createAxiosConfig(uri = GET_AREA_LIST) {
    let config = {
        method: 'get',
        url: uri,
        headers: { 
          'accept-encoding': 'gzip, deflate, br', 
          'accept-language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6', 
          'referer': 'https://swasthy.ekatta.in/bedavailable/',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36', 
        }
      };

    return config;
}

function fetchAreaList() {
    let config = createAxiosConfig()
      axios(config)
      .then(response => response.data)
      .then(areaList => areaList.map(area => {
        let {haId, haName, type, timestamp} = area

          let uri = `${GET_NEW_BEDS}/${type}/${haId}`          
          let config = createAxiosConfig(uri)

          axios(config)
          .then(res => console.log(res.data))
          .catch(e => console.error(e))
      }))
      .catch(error => console.error(error))

}

fetchAreaList();