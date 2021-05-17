import axios from 'axios'
import present from './presenter/presenter.js'
import Extractor from './presenter/Extractor.js'

console.log('Polling Started')

setInterval(callCowinServer, 5000)

function callCowinServer() {
    var config = {
        method: 'get',
        url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=397&date=${getTodayAsString()}`,
        headers: { 
          'accept-encoding': 'gzip, deflate, br', 
          'accept-language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6', 
          'origin': 'https://selfregistration.cowin.gov.in', 
          'referer': 'https://selfregistration.cowin.gov.in/', 
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36', 
        }
      };
      
      let collect = []

      let aray = axios(config)
      .then(response => response.data.centers)
      .then(centers => centers.map((center, idx) => {
          return center.sessions.map(session => {        
            collect.push(new Extractor(idx, center, session))
          })
      }))
      .catch(function (error) {
        let current = new Date();
        console.error('Something went wrong at: ', '['+current.getHours()+':'+current.getMinutes()+']', `${error.response ? `Status Code: ` + error.response.status : 'Error: ', error}`)
      });

      aray.then(a => present(collect))
}

// debugAxios()

function getDate(dateString) {
    var dateParts = dateString.split("-");
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
}

function getTodayAsString() {
  let today = new Date()
  return `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`
}

function getTodayAsDate() {
  let today = getTodayAsString()
  return getDate(today)
}

function debugAxios() {
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
}