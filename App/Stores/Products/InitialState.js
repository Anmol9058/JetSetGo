export const INITIAL_STATE = {
    fetchProductsBrandLoader: false,
    fetchCategoryLoader: false,
    fetchGsmLoader: false,
    fetchSubSubCategoryLoader: false,
    fetchSchemesLoader: false,
    fetchItemLoader: false,
    fetchItemPriceLoader: false,
    productBrandList: [],
    BrandList:[],
    productItemList: [],
    productItemPriceList: [],
    schemesSearchFilters: {
        type: 'Product Cat Level'//Order Level, Product Cat Level
    },
    filteredProductList: [],
    schemes: [],
    sizeList: [],
    packagingList: [],
    productCategoryList: [],
    productGsmList: [],
    productSubSubCategoryList: [],

    productCategoryDisplayList: [],
    productSubCategoryDisplayList: [],
    productSubSubCategoryDisplayList: [],

    searchFilters: {
        name: '',
        selectedCategories: [],
        selectedSubCategories: [],
        selectedSubSubCategories: [],
        selectedCategoryParentFilter: 'categories'
    },
    categoryOffset: 0,
    categoryLimit: 1000,
    productLimit: 1000,
    productOffset: 0,
    categoryFiltersList: [
        { id: 'categories', name: 'Categories' },
        { id: 'sub_categories', name: 'Sub/Categories' },
        { id: 'sub_sub_categories', name: 'Sub/Sub/Categories' }
    ],

    editDiscountEdit: false,

    productSizeForm:{
        length: '',
width: "",
id:''

    },

    sizeSearchFilters: {
       
        searchBy: '',
        searchValue: '',
        
       
    
    },

    editRemark: false
}
