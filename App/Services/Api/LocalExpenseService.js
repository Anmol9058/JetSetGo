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

const localApiClient = axios.create({
    baseURL: Config.API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});


function updateExpense(params) {
    let url = Config.LOCAL_EXPENSE_SERVICE.UPDATE_EXPENSES;
    url += `?id=${params.sfid}`;
    let formData = _.cloneDeep(params);
    formData = HelperService.removeField(formData, 'agentid');
    formData = HelperService.removeField(formData, 'token');
    formData = HelperService.removeField(formData, 'sfid');
    return localApiClient.post(url, formData, {
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

function approveRejectLocalExpense(params) {
    let url = Config.LOCAL_EXPENSE_SERVICE.APPROVE_REJECT_EXPENSE;
    url += `?id=${params.sfid}`;

    return localApiClient.post(url, params.payload, {
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
        return error
    });
}

function addRemarkExpense(params) {
    let url = Config.LOCAL_EXPENSE_SERVICE.ADD_REMARK;
    url += `?id=${params.sfid}`;
    let formData = _.cloneDeep(params);
    formData = HelperService.removeField(formData, 'agentid');
    formData = HelperService.removeField(formData, 'token');
    formData = HelperService.removeField(formData, 'sfid');
    return localApiClient.post(url, formData, {
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
    return localApiClient.post(Config.LOCAL_EXPENSE_SERVICE.SEND_APPROVAL, formData, {
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

function fetchLocalExpense(params) {
    let url = Config.LOCAL_EXPENSE_SERVICE.FETCH_EXPENSES;
    url += `?expense_type=${params.expense_type}&month=${params.month}&type=${params.type}`;
    return localApiClient.get(url, {
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

function fetchExpenseItem(params) {
    let url = Config.LOCAL_EXPENSE_SERVICE.FETCH_EXPENSE_ITEM;
    url += `?id=${params.id}&type=local`;
    return localApiClient.get(url, {
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

function uploadLocalImage(params) {
    let url = Config.LOCAL_EXPENSE_SERVICE.UPLOAD_LOCAL_IMAGE;
    url += `?expense_item_id=${params.sfid}`;

    return localApiClient.post(url, params.payload, {
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

function fetchLocalImage(params) {
    let url = Config.LOCAL_EXPENSE_SERVICE.FETCH_LOCAL_IMAGE;
    url += `?id=${params.id}`;
    return localApiClient.get(url, {
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

export const LocalExpenseService = {
    fetchLocalExpense,
    updateExpense,
    approveRejectLocalExpense,
    fetchExpenseItem,
    sendForApproval,
    addRemarkExpense,
    uploadLocalImage,
    fetchLocalImage
}
