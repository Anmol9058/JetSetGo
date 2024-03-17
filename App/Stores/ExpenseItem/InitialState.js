import { HelperService } from '../Services/Utils/HelperService';
export const INITIAL_STATE = {

    localItemList: [],
    outstationItemList: [],

    fetchLocalItemLoader: false,
    fetchOutstationItemLoader: false,

    monthNumber: '',

    searchFilters: {
        selectedMonth: (new Date(HelperService.getCurrentTimestamp())).getMonth(),
    }
}
