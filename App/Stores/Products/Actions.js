import { createActions } from 'reduxsauce'


const { Types, Creators } = createActions({
	fetchProductsBrand: ['payload'],
	fetchProductsBrandSuccess: ['payload'],
	fetchProductsBrandFailure: ['payload'],
	fetchProductsBrandLoading: null,
	fetchProductsBrandLoadingStop: null,



	fetchProductCategories: ['payload'],
	fetchProductCategoriesSuccess: ['payload'],
	fetchProductCategoriesFailure: ['payload'],
	fetchProductCategoriesLoading: null,
	fetchProductCategoriesLoadingStop: null,

	makeCategoryDisplayList: ['payload'],
	makeSubCategoryDisplayList: ['payload'],
	makeSubSubCategoryDisplayList: ['payload'],


	makeCategoryDisplayListSuccess: ['payload'],
	makeSubCategoryDisplayListSuccess: ['payload'],
	makeSubSubCategoryDisplayListSuccess: ['payload'],


	fetchProductGsm: ['payload'],
	fetchProductGsmSuccess: ['payload'],
	fetchProductGsmFailure: null,
	fetchProductGsmLoading: null,
	fetchProductGsmLoadingStop: null,

	fetchProductItem: ['payload'],
	fetchProductItemSuccess: ['payload'],
	fetchProductItemFailure: null,
	fetchProductItemLoading: null,
	fetchProductItemLoadingStop: null,

	fetchProductItemPrice: ['payload'],
	fetchProductItemPriceSuccess: ['payload'],
	fetchProductItemPriceFailure: null,
	fetchProductItemPriceLoading: null,
	fetchProductItemPriceLoadingStop: null,



	fetchProductSubSubCategories: ['payload'],
	fetchProductSubSubCategoriesSuccess: ['payload'],
	fetchProductSubSubCategoriesFailure: ['payload'],
	fetchProductSubSubCategoriesLoading: null,
	fetchProductSubSubCategoriesLoadingStop: null,



	fetchSchemes: ['payload'],
	fetchSchemesSuccess: ['payload'],
	fetchSchemesFailure: ['payload'],
	fetchSchemesLoading: null,
	fetchSchemesLoadingStop: null,
	changeSchemesSearchFilters: ['payload'],


	changeSearchFilters: ['payload'],
	//changeSearchFiltersSuccess: ['payload'],

	doNothing: null,

	openDealerDiscountEdit: null,
  closeDealerDiscountEdit: null,
  changeDealerDiscount: ['payload'],
  changeDealerDiscountSuccess: ['payload'],

  openRemarkEdit: null,
  closeRemarkEdit: null,
  changeRemark: ['payload'],
  changeRemarkSuccess: ['payload'],

  changeSizeForm:['payload'],
  clearSizeForm: null,


  updateSizeSearchFilters: ['payload'],


  clearProductFilter:null
});

export const ProductTypes = Types
export default Creators
