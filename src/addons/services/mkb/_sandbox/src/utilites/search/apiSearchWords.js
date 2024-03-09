/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import axios from '@src/utilites/API';
import useLinks from './links';

/**
 * @description Getting an entity by word.
 * @param {string} word - The word by which the entity will be searched.
 * @returns {Promise<{config: , data: object[]|[], headers: object, request: object, status: number, statusText: string}>} Object with response axios.
*/
export async function apiSearchWords(word) {
	const links = useLinks()
	try {
		// const scale = search.getArrayIdScaleEntity(arraySubTree)
		const body = getBodyForApiSearchWords(word);

		const response = await axios.post(
			links.URL_SEARCH_LINEAR,
			body
		);
		return response;
	} catch (error) {
		console.log(error);
	}
}

/**
 * @description Creating a Body for a Request.
 * @param {string} word - The word by which the entity will be searched.
 * @returns {{query: string, highlight: boolean, asTree: boolean, fields: string[]}} Body for a Request.
*/
function getBodyForApiSearchWords(word) {
  return {
    query: word,
    highlight: true,
		asTree: false,
		fields: [
			"FieldTitle",
			"FieldIndexTerm",
		],
  };
}
