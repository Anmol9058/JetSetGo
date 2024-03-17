import { createActions } from 'reduxsauce'


const { Types, Creators } = createActions({

  fetchInfluencers: ['payload'],
  fetchInfluencersLoading: null,
  fetchInfluencersSuccess: ['payload'],
  fetchInfluencersFailure: null,
  fetchInfluencersLoadingStop: null,

  fetchInfluencerSites: ['payload'],
  fetchInfluencerSiteLoading: null,
  fetchInfluencerSiteSuccess: ['payload'],
  fetchInfluencerSiteFailure: null,

  updateSearchFilters: ['payload'],

  createInfluencer: ['payload'],
  createInfluencerLoading: null,
  createInfluencerSuccess: ['payload'],
  createInfluencerFailure: null,
  createInfluencerLoadingStop: null,

  openMoreFilterOption: null,
  closeMoreFilterOption: null,

  updateInfluencer: ['payload'],
  updateInfluencerLoading: null,
  updateInfluencerSuccess: ['payload'],
  updateInfluencerFailure: null,
  updateInfluencerLoadingStop: null,

  changeInfluencerForm: ['payload'],
  influencerFormValidationFailed: ['payload'],

  extractFormData: ['payload'],
  extractInfluencerInfoData: ['payload'],

  selectInfluencer: ['payload'],
  selectInfluencerSuccess: ['payload'],
  makeRetailerSearchableList: ['payload'],
  makeDealerSearchableList: ['payload'],
  makePsmSearchableList: ['payload'],

  clearInfluencerForm: null,
  clearSelectInfluencer: null,

  doNothing: null,

});

export const InfluencersTypes = Types
export default Creators
