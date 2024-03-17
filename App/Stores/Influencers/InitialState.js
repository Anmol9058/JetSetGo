/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {

    influencersList: [],
    influencerSiteList: [],
    fetchInfluencersLoader: false,
    fetchInfluencerSiteLoader: false,
    influencerSearchFilters: {
        area: '',
        type: 'Influencers',
        sortType: 'ASC',
        sortBy: '',
        searchBy: 'name | email | number',
        searchValue: ''
    },
    openMoreFilters: false,
    influencerForm: {},
    influencerFormValidation: {
        invalid: false,
        invalid_field: ''
    },
    createInfluencerLoader: false,
    updateInfluencerLoader: false,
    selectedInfluencer: {},
    influencerOffset: 0,
    influencerLimit: 1000,
    retailerSearchableList: [],
    dealerSearchableList: [],
    contactForm: {},
    psmList: [],
    potentialType: [{
        'label': 'Low',
        'value': 'Low'
    },
    {
        'label': 'Medium',
        'value': 'Medium'
    },
    {
        'label': 'High',
        'value': 'High'
    }
    ],
    statusType: [{
        'label': 'Active',
        'value': 'Active'
    },
    {
        'label': 'Inactive',
        'value': 'Inactive'
    }],
    titleType: [{
        'label': 'Mr.',
        'value': 'Mr.'
    }, {
        'label': 'Mrs.',
        'value': 'Mrs.'
    }],

    categoryType: [{
        'label': 'ASM',
        'value': 'ASM'
    }, {
        'label': 'PSM',
        'value': 'PSM'

    }]
}
