import axios from 'axios'
import { curryN, gte, is } from 'ramda'
import { Config } from '../../Config'

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
const in200s = isWithin(200, 299)

/**
 * This is an example of a service that connects to a 3rd party API.
 *
 * Feel free to remove this example from your application.
 */
const userApiClient = axios.create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})

function fetchUser() {
  // Simulate an error 50% of the time just for testing purposes
  if (Math.random() > 0.5) {
    return new Promise(function (resolve, reject) {
      resolve(null)
    })
  }

  let number = Math.floor(Math.random() / 0.1) + 1

  return userApiClient.get(number.toString()).then((response) => {
    if (in200s(response.status)) {
      return response.data
    }

    return null
  })
}


function loginUser(params) {
  console.log("LOGINUSEER", params);
  console.log("LOGINUSEER", Config.USER_SERVICE.LOGIN_URL);
  return userApiClient.post(Config.USER_SERVICE.LOGIN_URL, params).then((response) => {
    console.log("LOGINUSEERRes", response.data);
    if (in200s(response.status)) {
      return response.data.data
    }
    return null
  }).catch(error => {
    console.log("LOGINUSEER", error);
    return null
  });
}

function logoutUser(params) {
  
  let url = Config.USER_SERVICE.LOG_OUT;
  url += `?sfid=${params.id}`
  
  return userApiClient.post(url, params).then((response) => {
      if (in200s(response.status)) {
          return response.data
      }
      return null
  }).catch(error => {
      return null
  });
}


function startDay(params) {
  let requestParams = {
    latitude: String(params.latitude),
    longitude: String(params.longitude),
    date: String(params.date),
    team__c:params.team__c,
    type:params.type,
  };

  if (params.present_type) {
    requestParams['presentType'] = params.present_type
  }

  
  
  return userApiClient.post(Config.USER_SERVICE.START_DAY_URL, requestParams, {
    headers: {
      token: params.token,
     
    }
  }).then((response) => {
    if (in200s(response.status)) {
      return response.data
    }
    return null
  }).catch(error => {
    return null
  });
}

function endDay(params) {
  let requestParams = {
    //area: params.area,
    latitude: String(params.latitude),
    longitude: String(params.longitude),
    date: String(params.date),
    team__c:params.team__c,
    
  };
  return userApiClient.post(Config.USER_SERVICE.END_DAY_URL, requestParams, {
    headers: {
      token: params.token,
      
    }
  }).then((response) => {
    if (in200s(response.status)) {
      return response.data
    }
    return null
  }).catch(error => {
    return null
  });
}

function markUserAbsent(params) {
  let requestParams = {
    absent_reason: params.absentReason,
    //leaveType: params.leaveType,
    date: String(params.date),
    type:params.type,
    team__c:params.team__c,
  };
  return userApiClient.post(Config.USER_SERVICE.START_DAY_URL, requestParams, {
    headers: {
      token: params.token,
    }
  }).then((response) => {
    if (in200s(response.status)) {// todo:  change to (in200s(response.status)) 
      
      return response.data
    }
    return null
  }).catch(error => {
  
    return null
  });
}


function getAgentAreas(params) {
  let url = Config.USER_SERVICE.FETCH_AREAS_URL;
	url += `?team__c=${params.team__c}`
  
 
  return userApiClient.get(url, {
    headers: {
      token: params.user.token,
    }
  }).then((response) => {
    if (in200s(response.status)) {
      console.log(response,"sssssss22")
      return response['data']['areas'];
    }
    return null
  }).catch(error => {
    console.log(error.response,"sssssss")
    return null
  });
}

function getAgentDetails(params) {

  return userApiClient.get(Config.USER_SERVICE.FETCH_AGENT_DETAILS, {
    headers: {
      Authorization: 'Bearer ' + params.token,
      agentid: params.agentid,
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (in200s(response.status)) {
      return response['data']['data'];
    }
    return null
  }).catch(error => {
    return null
  });
}

function checkAttendance(params) {
  let url = Config.USER_SERVICE.CHECK_ATTENDANCE;
	url += `?team__c=${params.team__c}`
	url += `&date=${params.date}`

  
  return userApiClient.get(url,  {
    headers: {
      token: params.token,
    }
  }).then((response) => {
    if (in200s(response.status)) {
   return response['data']['data']
    }
    return null
  }).catch(error => {
    
    return null
  });
}

function getAllPSM(params) {
  console.log(params,"psmparams");
  let url = Config.USER_SERVICE.FETCH_ALL_PSM;
	url += `?team__c=${params.team__c}`
  

  return userApiClient.get(url, {
    headers: {
      token: params.payload.token,
    }
  }).then((response) => {
    if (in200s(response.status)) {
      return response['data']['sub_ordinate'];
    }
    return null
  }).catch(error => {
    console.log("psmm",error.response);
    return null
  });
}

function getAppVersion(params) { 
  let url = Config.USER_SERVICE.GET_APP_VERSION;
  return userApiClient.get(url, {
      headers: {
          'token': params.token,
      }
  }).then((response) => {
      if (in200s(response.status)) {
          return response.data.version
      }
      return null
  }).catch(error => {
      return null
  });
}

function getTaxDetails(params) {
	let url = Config.USER_SERVICE.GET_TAX_DETAILS;
  console.log(url, "UUU+++++");
  return userApiClient.get(url, {
		headers: {
      token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
     
			return response['data']['city'];
		}
		return null
	}).catch(error => {
  
		//bugsnag.notify(new Error('fetchFinalObservation: ' + JSON.stringify(error.response.data[0])));
   		return null;

	});
}
export const userService = {
  fetchUser,
  loginUser,
  startDay,
  endDay,
  markUserAbsent,
  getAgentAreas,
  getAgentDetails,
  checkAttendance,
  getAllPSM,
  logoutUser,
  getAppVersion,
  getTaxDetails
}
