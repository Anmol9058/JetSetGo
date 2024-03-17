import { HelperService } from '../../Services/Utils/HelperService';

export const INITIAL_STATE = {
    searchFilters: {
        // startDate: HelperService.getMonthStartAndEndDateTimestamp()[0],
        startDate: HelperService.getCurrentTimestamp(),
        // endDate: HelperService.getMonthStartAndEndDateTimestamp()[1],
        endDate: HelperService.getCurrentTimestamp(),
        selectedDateType: 'Date', //or Month,
        selectedMonth: (new Date(HelperService.getCurrentTimestamp())).getMonth(),
        selectedTab: 0,
        psm__c: ''
    },
    tabsMapping: {
        '0': 'Targets Achieved',
        '1': 'Summary'
    },

   

    data: {
        siteCount: {},
        visitCount: {},
        eventsCount: {},
        orderValue: {},
        counters: {},
        dashboardSummary:{},
        TargetTeam:{},
    },
    
    loaders: {
        siteCountLoader: false,
        visitCountLoader: false,
        eventsCountLoader: false,
        orderValueLoader: false,
        countersLoader: false,
        TargetTeamLoader: false,
        dashboardSummaryLoader:false
        
    }
}
