import axios from 'axios';
import { curryN, gte, is } from 'ramda';
import { Config } from '../../Config';

const isWithin = curryN(3, (min, max, value) => {
    const isNumber = is(Number)
    return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
});
const in200s = isWithin(200, 299)

const expenseApiClient = axios.create({
    baseURL: Config.API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});


function moveLocalToOutstationExpense(params) {
    let url = Config.EXPENSE_SERVICE.MOVE_LOCAL_TO_OUTSTATION;

    return expenseApiClient.post(url, params.payload, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (in200s(response.status)) {
            return response
        }
        return null
    }).catch(error => {
        return error.response.data
    });
}

function moveOutstationToLocalExpense(params) {
    let url = Config.EXPENSE_SERVICE.MOVE_OUTSTATION_TO_LOCAL;
    return expenseApiClient.post(url, params.payload, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (in200s(response.status)) {
            return response
        }
        return null
    }).catch(error => {
        return error.response.data
    });
}

function fetchLocalItem(params) {
    let url = Config.EXPENSE_SERVICE.FETCH_LOCAL_ITEM;
    url += `?month=${params.month}`;
    return expenseApiClient.get(url, {
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
        return error
    });
}

function fetchOutstationItem(params) {
    let url = Config.EXPENSE_SERVICE.FETCH_OUTSTATION_ITEM;
    url += `?month=${params.month}`;

    return expenseApiClient.get(url, {
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

export const ExpenseItemService = {
    moveOutstationToLocalExpense,
    moveLocalToOutstationExpense,
    fetchLocalItem,
    fetchOutstationItem
}
