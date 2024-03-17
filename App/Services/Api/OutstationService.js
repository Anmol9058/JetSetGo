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

const outstationApiClient = axios.create({
    baseURL: Config.API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});


function updateOutstation(params) {
    let url = Config.OUTSTATION_EXPENSE_SERVICE.UPDATE_EXPENSES;
    url += `?id=a0s1m0000004v5RAAQ`;
    let formData = _.cloneDeep(params);
    formData = HelperService.removeField(formData, 'agentid');
    formData = HelperService.removeField(formData, 'token');
    formData = HelperService.removeField(formData, 'sfid');
    return outstationApiClient.post(url, formData, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json',
            type: params.type
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

function approveRejectOutstationExpense(params) {
    let url = Config.OUTSTATION_EXPENSE_SERVICE.APPROVE_REJECT_EXPENSE;
    url += `?id=${params.sfid}`;

    return outstationApiClient.post(url, params.payload, {
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


function sendForApprovalOutstationExpense(params) {
    let formData = _.cloneDeep(params);
    formData = HelperService.removeField(formData, 'agentid');
    formData = HelperService.removeField(formData, 'token');

    return outstationApiClient.post(Config.OUTSTATION_EXPENSE_SERVICE.SEND_APPROVAL, formData, {
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

function fetchOutstationExpense(params) {
    let url = Config.OUTSTATION_EXPENSE_SERVICE.FETCH_EXPENSES;
    url += `?expense_type=${params.expense_type}&month=${params.month}&type=${params.type}`;
    return outstationApiClient.get(url, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (in200s(response.status)) {
            return response['data']['data']['expenses']
        }
        return null
    }).catch(error => {
        return null
    });
}

function fetchApprovedTour(params) {
    let url = Config.OUTSTATION_EXPENSE_SERVICE.APPROVED_TOUR;
    return outstationApiClient.get(url, {
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


function updateLocalExpenseStatus(params) {
    let url = Config.OUTSTATION_EXPENSE_SERVICE.UPDATE_EXPENSE_STATUS;
    let formData = _.cloneDeep(params.payload);

    return outstationApiClient.post(url, formData, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        if (in200s(response.status)) {
            return response.data
        }
        return null
    }).catch(error => {
        return error.response.status
    });
}


function fetchVisitByTour(params) {
    let formData = _.cloneDeep(params);
    formData = HelperService.removeField(formData, 'agentid');
    formData = HelperService.removeField(formData, 'token');

    return outstationApiClient.post(Config.OUTSTATION_EXPENSE_SERVICE.VISITS_BY_TOUR, formData, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (in200s(response.status)) {
            return response.data.data
        }
        return null
    }).catch(error => {
        return null
    });
}


function fetchVisitExpenseItem(params) {
    let url = Config.OUTSTATION_EXPENSE_SERVICE.FETCH_EXPENSE_ITEM
    url += `?id=${params.sfid}`
    let formData = _.cloneDeep(params);
    formData = HelperService.removeField(formData, 'agentid');
    formData = HelperService.removeField(formData, 'token');
    formData = HelperService.removeField(formData, 'sfid');

    return outstationApiClient.post(url, formData, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (in200s(response.status)) {
            return response['data']['data']['expenses']
        }
        return null
    }).catch(error => {
        return null
    });
}

function addExpense(params) {
    let url = Config.OUTSTATION_EXPENSE_SERVICE.ADD_EXPENSES;
    let formData = _.cloneDeep(params.payload);

    return outstationApiClient.post(url, formData, {
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


function addExpenseItem(params) {
    let url = Config.OUTSTATION_EXPENSE_SERVICE.ADD_EXPENSE_ITEM;
    url += `?id=${params.sfid}`

    let formData = _.cloneDeep(params.payload);

    return outstationApiClient.post(url, formData, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json',
            type: params.type
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

function submitExpenseItem(params) {

    let url = Config.OUTSTATION_EXPENSE_SERVICE.SUBMIT_EXPENSE_ITEM;
    url += `?id=${params.sfid}&pg_id=${params.pg_id}`

    let formData = _.cloneDeep(params.addExpenseItemList);

    return outstationApiClient.post(url, formData, {
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

function updateExpenseItem(params) {
    let url = Config.OUTSTATION_EXPENSE_SERVICE.UPDATE_EXPENSE_ITEM;
    url += `?id=${params.id}`

    let formData = _.cloneDeep(params);
    formData = HelperService.removeField(formData, 'agentid');
    formData = HelperService.removeField(formData, 'token');
    formData = HelperService.removeField(formData, 'type');
    formData = HelperService.removeField(formData, 'id');

    return outstationApiClient.post(url, formData, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json',
            type: params.type
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

function updateLocalItem(params) {
    let url = Config.OUTSTATION_EXPENSE_SERVICE.UPDATE_LOCAL_EXPENSE;
    url += `?id=${params.id}`
    let formData = _.cloneDeep(params);
    formData = HelperService.removeField(formData, 'agentid');
    formData = HelperService.removeField(formData, 'token');
    formData = HelperService.removeField(formData, 'id');

    return outstationApiClient.post(url, formData, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json',
            type: params.type
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

function updateEmailStatus(params) {
    let url = Config.OUTSTATION_EXPENSE_SERVICE.UPDATE_EMAIL_STATUS;

    let formData = _.cloneDeep(params.payload);

    return outstationApiClient.post(url, formData, {
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

function fetchExpenseItem(params) {
    let url = Config.OUTSTATION_EXPENSE_SERVICE.FETCH_EXPENSE_ITEM;
    url += `?id=${params.id}`;
    return outstationApiClient.get(url, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (in200s(response.status)) {
            return response['data']['data']['expenses']
        }
        return null
    }).catch(error => {
        return null
    });
}

function fetchExpenseItemType(params) {
    let url = Config.OUTSTATION_EXPENSE_SERVICE.FETCH_EXPENSE_ITEM;
    url += `?id=${params.id}`;

    return outstationApiClient.get(url, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json',
            type: params.type
        }
    }).then((response) => {
        if (in200s(response.status)) {
            return response['data']['data']['expenses']
        }
        return null
    }).catch(error => {
        return null
    });
}


function fetchExpenseImage(params) {
    let url = Config.OUTSTATION_EXPENSE_SERVICE.FETCH_EXPENSE_IMAGE;
    url += `?id=${params.id}`;
    return outstationApiClient.get(url, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (in200s(response.status)) {
            return response['data']['data']['files']
        }
        return null
    }).catch(error => {
        return null
    });
}

export const OutstationService = {
    fetchOutstationExpense,
    updateOutstation,
    approveRejectOutstationExpense,
    fetchExpenseItem,
    fetchExpenseItemType,
    sendForApprovalOutstationExpense,
    addExpenseItem,
    updateExpenseItem,
    fetchApprovedTour,
    fetchVisitByTour,
    fetchVisitExpenseItem,
    addExpense,
    submitExpenseItem,
    updateLocalExpenseStatus,
    updateEmailStatus,
    fetchExpenseImage,
    updateLocalItem
}
