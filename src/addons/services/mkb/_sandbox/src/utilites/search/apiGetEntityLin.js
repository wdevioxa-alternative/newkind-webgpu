/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import axios from '@src/utilites/API';
import useLinks from './links';

/**
 * @description Getting an entity from the linearezation table
 * @param {string} uri - '/v1/icd/release/11/2022-02/mms/{956664712}'
 * @return {Promise<{config: object, data: object, headers: object, request: object, status: number, statusText: string}>} According to the URI, the essence is obtained.
*/
export async function apiGetEntityLin(uri) {
	const links = useLinks()
	return await axios.get(uri, links.optionsGetEntity);
};
