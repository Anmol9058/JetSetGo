/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {

    sitesList: [],
    siteProductList: [],

    fetchSitesLoader: false,
    fetchSiteProductLoader: false,
    createSiteLoader: false,
    createSiteProductLoader: false,
    updateSiteLoader: false,
    updateSiteProductLoader: false,

    retailerSearchableList: [],
    influencerSearchableList: [],
    dealerSearchableList: [],

    siteSearchFilters: {
        area: '',
        type: 'Sites',
        sortType: 'ASC',
        sortBy: '',
        searchBy: 'name',
        searchValue: ''
    },

    openMoreFilters: false,

    siteForm: {},
    siteFormValidation: {
        invalid: false,
        invalid_field: ''
    },

    siteProductForm: {},
    siteProductFormValidation: {
        invalid: false,
        invalid_field: ''
    },

    projectType: [
        {
            'label': 'Residential',
            'value': 'Residential'
        },
        {
            'label': 'School',
            'value': 'School'
        },
        {
            'label': 'HealthCare',
            'value': 'HealthCare'
        },
        {
            'label': 'Retail',
            'value': 'Retail'
        },
        {
            'label': 'Factory',
            'value': 'Factory'
        }
    ],
    sourceType: [
        {
            'label': 'Sales',
            'value': 'Sales'
        },
        {
            'label': 'Retailer',
            'value': 'Retailer'
        },
        {
            'label': 'Electrician',
            'value': 'Electrician'
        },
        {
            'label': 'Incoming',
            'value': 'Incoming'
        }
    ],
    statusType: [
        {
            'label': 'Funnel',
            'value': 'Funnel'
        },
        {
            'label': 'Lost',
            'value': 'Lost'
        },
        {
            'label': 'Won',
            'value': 'Won'
        },
        {
            'label': 'Rejected',
            'value': 'Rejected'
        }
    ],
    siteStagesType: [
        {
            'label': 'Bricking',
            'value': 'Bricking'
        },
        {
            'label': 'Plastering',
            'value': 'Plastering'
        },
        {
            'label': 'Wiring',
            'value': 'Wiring'
        },
        {
            'label': 'Installing',
            'value': 'Installing'
        }
    ],

    productList: [],
    productCategoryList: [],
    productSubCategoryList: [],
    productSubSubCategoryList: [],
    psmList: [],

    selectedSite: {},
    selectedSiteProduct: {},

    sitesOffset: 0,
    sitesLimit: 1000,

    siteSearchList: [],
    siteProductSearchList: []
}
