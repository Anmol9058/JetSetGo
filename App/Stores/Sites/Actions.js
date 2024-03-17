import { createActions } from 'reduxsauce'


const { Types, Creators } = createActions({

  fetchSites: ['payload'],
  fetchSitesLoading: null,
  fetchSitesSuccess: ['payload'],
  fetchSitesFailure: null,

  fetchSiteProducts: ['payload'],
  fetchSiteProductsLoading: null,
  fetchSiteProductsSuccess: ['payload'],
  fetchSiteProductsFailure: null,

  updateSearchFilters: ['payload'],

  createSite: ['payload'],
  createSiteLoading: null,
  createSiteSuccess: null,
  createSiteFailure: null,

  updateSite: ['payload'],
  updateSiteLoading: null,
  updateSiteSuccess: null,
  updateSiteFailure: null,


  createSiteProduct: ['payload'],
  createSiteProductLoading: null,
  createSiteProductSuccess: null,
  createSiteProductFailure: null,

  updateSiteProduct: ['payload'],
  updateSiteProductLoading: null,
  updateSiteProductSuccess: null,
  updateSiteProductFailure: null,

  makeRetailerSearchableList: ['payload'],
  makeInfluencerSearchableList: ['payload'],
  makeDealerSearchableList: ['payload'],

  makeProductSubSubCategorySearchableList: ['payload'],
  makeProductSubCategorySearchableList: ['payload'],
  makeProductCategorySearchableList: ['payload'],
  makeProductSearchableList: ['payload'],
  makePsmSearchableList: ['payload'],

  changeSiteForm: ['payload'],
  siteFormValidationFailed: ['payload'],
  extractFormData: ['payload'],

  changeSiteProductForm: ['payload'],
  siteProductFormValidationFailed: ['payload'],
  extractSiteProductFormData: ['payload'],

  openMoreFiltersOption: null,
  closeMoreFiltersOption: null,

  selectSite: ['payload'],
  selectSiteSuccess: ['payload'],

  selectSiteProduct: ['payload'],
  selectSiteProductSuccess: ['payload'],

  doNothing: null,
  clearSelectSite: null,
  clearSelectSiteProduct: null,
  clearSiteForm: null,
  clearSiteProductForm: null,

});

export const SitesTypes = Types
export default Creators
