import axios from 'axios';
import _ from 'lodash';
import { curryN, gte, is } from 'ramda';
import { Config } from '../../Config';
import { HelperService } from '../../Services/Utils/HelperService';

const isWithin = curryN(3, (min, max, value) => {
    const isNumber = is(Number)
    return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
});
const in200s = isWithin(200, 299)

const tourApiClient = axios.create({
    baseURL: Config.API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

function fetchTour(params) {
    let url = Config.TOUR_SERVICE.FETCH_TOUR;
    url += `?tour_type=${params.expense_type}`;
    url += `&month=${params.month}`;
    return tourApiClient.get(url, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (in200s(response.status)) {
            return response['data']['data']['tours']
        }
        return null
    }).catch(error => {
        return null
    });
}

function createTour(params) {
    let formData = _.cloneDeep(params);
    formData = HelperService.removeField(formData, 'agentid');
    formData = HelperService.removeField(formData, 'token');
    formData = HelperService.removeField(formData, 'local_id');
    return tourApiClient.post(Config.TOUR_SERVICE.CREATE_TOUR, formData, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (in200s(response.status)) {
            return response.data
        }
        return null
    }).catch(error => {
        return error.response.status;
    });
}

function updateTour(params) {
    let url = Config.TOUR_SERVICE.UPDATE_TOUR;
    url += `?id=${params.sfid}`;
    let formData = _.cloneDeep(params);
    formData = HelperService.removeField(formData, 'agentid');
    formData = HelperService.removeField(formData, 'token');
    formData = HelperService.removeField(formData, 'sfid');
    return tourApiClient.post(url, formData, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json'
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


function fetchCities(params) {
    let url = Config.TOUR_SERVICE.FETCH_CITIES;

    return tourApiClient.get(url, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (in200s(response.status)) {
            return response['data']['data']['cities']
        }
        return null
    }).catch(error => {
        return null
    });
}

function approveRejectTour(params) {
    let url = Config.TOUR_SERVICE.APPROVE_REJECT_TOUR;
    url += `?id=${params.sfid}`;

    return tourApiClient.post(url, params.payload, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json'
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

function sendForApproval(params) {
    let formData = _.cloneDeep(params);
    formData = HelperService.removeField(formData, 'agentid');
    formData = HelperService.removeField(formData, 'token');

    return tourApiClient.post(Config.TOUR_SERVICE.SEND_APPROVAL, formData, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json'
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


export const TourService = {
    fetchCities,
    createTour,
    updateTour,
    approveRejectTour,
    sendForApproval,
    fetchTour
}
