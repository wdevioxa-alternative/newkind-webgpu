/* eslint-disable no-unsafe-finally */
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import axios from '@src/utilites/API';
import useLinks from './links';
import {search} from './index';
/**
 * @description Getting an entity by code to search in postcoordination
 * @param {string} code - The code by which the entity will be searched
 * @param {string[]} arraySubTree - List of URIs that limit the list of entities to search by code
 * @returns {object[]|[]} - Array with list of entities wich code equiles or an empty array when there is no match for the code
*/
export async function apiSearchCodeCoord(code, arraySubTree) {
	const links = useLinks()
	let result = [];
	try {
		const scale = search.getArrayIdScaleEntity(arraySubTree)
		// const scale = arraySubTree.map(scaleEntity => scaleEntity.id)
		const body = getBodyForApiSearchWords(code, scale);
		const response = await axios.post(
			links.URL_SEARCH_LINEAR_CODE_POSTCOORD,
			body
		);
		if (response.data.code) {
			response.entity = response.data;
			response.entity.isBlueTitle = false;
			response.title = response.entity.title['@value'];
			response.uri = response.entity['@id'].replace(links.URL_PREF_BASE, '/v1');
			delete response.entity.indexTerm;
			delete response.data;
			result.push(response);}
	} catch (error) {
		console.log(error);
	} finally {
		return result;
	}
}

/**
 * @description Creating a Body for a Request
 * @param {string} code - The code by which the entity will be searched
 * @param {string[]} arraySubTree - List of URIs that limit the list of entities to search by code
 * @returns {{code: string, subtree: string[]}} Body for a Request
*/
function getBodyForApiSearchWords(code, arraySubTree) {
  return {
    code: code.toUpperCase().trim(),
    subtree: arraySubTree,
  };
}
