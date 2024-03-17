import { call, put, select, take } from 'redux-saga/effects';
import { siteService } from '../Services/Api/SitesService';
import NavigationService from '../Services/NavigationService';
import { HelperService } from '../Services/Utils/HelperService';
import { ValidationService } from '../Services/ValidationService';
import { getConnectionStatus } from '../Stores/Common/Selectors';
import SiteActions, { SitesTypes } from '../Stores/Sites/Actions';
import { offlineApiCall } from './OfflineSaga';

export function* watchCreateSiteRequest() {
	while (true) {
		const { payload } = yield take(SitesTypes.CREATE_SITE)

		try {
			const validationFailed = yield call(ValidationService.validateSiteForm, payload);
			if (validationFailed) {
				HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
				yield put(SiteActions.siteFormValidationFailed(validationFailed));
				continue;
			}
		} catch (err) {
			console.log(err)
		}

		yield call(createSite, payload)
	}
}


export function* watchUpdateSiteRequest() {
	while (true) {
		const { payload } = yield take(SitesTypes.UPDATE_SITE)
		try {
			const validationFailed = yield call(ValidationService.validateSiteForm, payload);
			if (validationFailed) {
				HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
				yield put(SiteActions.siteFormValidationFailed(validationFailed));
				continue;
			}
		} catch (err) {
			console.log(err)
		}
		yield call(updateSite, payload)
	}
}

export function* watchCreateSiteProductRequest() {
	while (true) {
		const { payload } = yield take(SitesTypes.CREATE_SITE_PRODUCT)

		try {
			const validationFailed = yield call(ValidationService.validateSiteProductForm, payload);
			if (validationFailed) {
				HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
				yield put(SiteActions.siteProductFormValidationFailed(validationFailed));
				continue;
			}
		} catch (err) {
			console.log(err)
		}

		yield call(createSiteProduct, payload)
	}
}


export function* watchUpdateSiteProductRequest() {
	while (true) {
		const { payload } = yield take(SitesTypes.UPDATE_SITE_PRODUCT)
		try {
			const validationFailed = yield call(ValidationService.validateSiteProductForm, payload);
			if (validationFailed) {
				HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
				yield put(SiteActions.siteProductFormValidationFailed(validationFailed));
				continue;
			}
		} catch (err) {
			console.log(err)
		}
		yield call(updateSiteProduct, payload)
	}
}



export function* createSite(payload) {
	yield put(SiteActions.createSiteLoading());
	try {
		let offlinActionData = {
			apiCall: (siteService.createSite),
			resource: 'createSite', //specify for which reducer we are using it
			callName: 'create', //specify operation
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (SiteActions.createSiteSuccess),
			failureCallback: (SiteActions.createSiteFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);

		if (successData) { //Todo : change it to userData
			yield put(SiteActions.createSiteSuccess(payload));
			HelperService.showToast({ message: 'Lead Added Successfully.', duration: 1000, buttonText: '' });
			NavigationService.navigate('SiteListScreen');
		} else {
			yield put(SiteActions.createSiteFailure())
			HelperService.showToast({ message: 'Cannot Create Lead. Try after some time', duration: 2000, buttonText: 'Okay' });

		}
	} catch (error) {
		console.log('Error', error)
		yield put(SiteActions.createSiteFailure());
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
	}
}



export function* updateSite(payload) {
	yield put(SiteActions.updateSiteLoading());
	try {
		let offlinActionData = {
			apiCall: (siteService.updateSite),
			resource: 'updateSite', //specify for which reducer we are using it
			callName: 'create', //specify operation
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (SiteActions.updateSiteSuccess),
			failureCallback: (SiteActions.updateSiteFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);

		if (successData) { //Todo : change it to userData
			yield put(SiteActions.updateSiteSuccess(payload));
			HelperService.showToast({ message: 'Lead Updated Successfully', duration: 1000, buttonText: '' });
			NavigationService.navigateAndReset('SiteListScreen', { 'payload': 'update' });
		} else {
			yield put(SiteActions.updateSiteFailure())
			HelperService.showToast({ message: 'Lead Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });

		}
	} catch (error) {
		yield put(SiteActions.updateSiteFailure());
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
	}
}


export function* createSiteProduct(payload) {
	yield put(SiteActions.createSiteProductLoading());
	try {
		let offlinActionData = {
			apiCall: (siteService.createSiteProduct),
			resource: 'createSiteProduct', //specify for which reducer we are using it
			callName: 'create', //specify operation
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (SiteActions.createSiteProductSuccess),
			failureCallback: (SiteActions.createSiteProductFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);

		if (successData) { //Todo : change it to userData
			yield put(SiteActions.createSiteProductSuccess(payload));
			HelperService.showToast({ message: 'LeadProduct Added Successfully.', duration: 1000, buttonText: '' });
			NavigationService.navigate('SiteProductListScreen');
		} else {
			yield put(SiteActions.createSiteProductFailure())
			HelperService.showToast({ message: 'Cannot Create Lead. Try after some time', duration: 2000, buttonText: 'Okay' });
		}
	} catch (error) {
		console.log('Error', error)
		yield put(SiteActions.createSiteProductFailure());
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
	}
}



export function* updateSiteProduct(payload) {
	yield put(SiteActions.updateSiteProductLoading());
	try {
		let offlinActionData = {
			apiCall: (siteService.updateSiteProduct),
			resource: 'updateSiteProduct', //specify for which reducer we are using it
			callName: 'create', //specify operation
			params: HelperService.decorateWithLocalId(payload),
			timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (SiteActions.updateSiteProductSuccess),
			failureCallback: (SiteActions.updateSiteProductFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);

		if (successData) { //Todo : change it to userData
			yield put(SiteActions.updateSiteProductSuccess(payload));
			HelperService.showToast({ message: 'LeadProduct Updated Successfully', duration: 1000, buttonText: '' });
			NavigationService.navigateAndReset('SiteProductListScreen', { 'payload': 'update' });
		} else {
			yield put(SiteActions.updateSiteProductFailure())
			HelperService.showToast({ message: 'LeadProduct Updation failed!! Try Again.', duration: 2000, buttonText: 'Okay' });
		}
	} catch (error) {
		yield put(SiteActions.updateSiteProductFailure());
		HelperService.showToast({ message: error, duration: 2000, buttonText: 'Okay' });
	}
}


export function* fetchSites({ payload }) {
	const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
	if (!isOnline) {
		yield put(SiteActions.doNothing());
		return;
	}
	yield put(SiteActions.fetchSitesLoading());
	try {
		let successData = yield call(siteService.fetchSites, payload);
		if (successData) {
			yield put(SiteActions.fetchSitesSuccess(successData));
		} else {
			yield put(SiteActions.fetchSitesFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(SiteActions.fetchSitesFailure());
	}
}

export function* fetchSiteProducts({ payload }) {
	const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
	if (!isOnline) {
		yield put(SiteActions.doNothing());
		return;
	}
	yield put(SiteActions.fetchSiteProductsLoading());
	try {
		let successData = yield call(siteService.fetchSiteProducts, payload);
		if (successData) {
			yield put(SiteActions.fetchSiteProductsSuccess(successData));
		} else {
			yield put(SiteActions.fetchSiteProductsFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(SiteActions.fetchSiteProductsFailure());
	}
}


