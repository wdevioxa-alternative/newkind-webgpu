/* eslint-disable camelcase */
import { getApi } from '../API'

export default () => {

	const API_DATA = getApi()

	const URL_SEARCH_FOUND_tmp = `/v1/icd/entity/search`;
	const URL_SEARCH_LINEAR_tmp = `/v1/icd/release/11/${API_DATA.Release}/mms/search`;

	const URL_PREF_BASE_tmp = 'http://id.who.int';
	const URL_PREF_FOUND_tmp = '/v1/icd/entity/';
	const URL_POSTF_FOUND_tmp = `?releaseId=${API_DATA.Release}`;

	const URL_PREF_LINEAR_tmp = `/v1/icd/release/11/${API_DATA.Release}/mms/`;

	const URL_CODE_FOUND_tmp = `/v1/icd/release/11/${API_DATA.Release}/mms/codeinfo`;

	const URL_LOCALHOST_tmp = 'http://localhost:3333';
	const URL_LOCALHOST_STANDART_tmp = `${window.location.origin}`;
	const URL_LOCALHOST_STANDART_V1_tmp = `${window.location.origin}/v1`;

	const optionsGetEntity_tmp = {
		mode: 'no-cors',
		headers: {
			'Accept-Language': API_DATA.Lang,
		}
	};

	const URL_SEARCH_LINEAR_CODE_tmp = `/v1/icd/release/11/${API_DATA.Release}/mms/bycode/`;

	const URL_SEARCH_LINEAR_CODE_POSTCOORD_tmp = `/v1/icd/release/11/${API_DATA.Release}/mms/bycode-st`;

	return {
		URL_SEARCH_LINEAR_CODE_POSTCOORD: URL_SEARCH_LINEAR_CODE_POSTCOORD_tmp,
		URL_SEARCH_LINEAR_CODE: URL_SEARCH_LINEAR_CODE_tmp,
		optionsGetEntity: optionsGetEntity_tmp,
		URL_LOCALHOST_STANDART_V1: URL_LOCALHOST_STANDART_V1_tmp,
		URL_LOCALHOST_STANDART: URL_LOCALHOST_STANDART_tmp,
		URL_LOCALHOST: URL_LOCALHOST_tmp,
		URL_CODE_FOUND: URL_CODE_FOUND_tmp,
		URL_PREF_LINEAR: URL_PREF_LINEAR_tmp,
		URL_POSTF_FOUND: URL_POSTF_FOUND_tmp,
		URL_PREF_FOUND: URL_PREF_FOUND_tmp,
		URL_PREF_BASE: URL_PREF_BASE_tmp,
		URL_SEARCH_LINEAR: URL_SEARCH_LINEAR_tmp,
		URL_SEARCH_FOUND: URL_SEARCH_FOUND_tmp
	}
}
