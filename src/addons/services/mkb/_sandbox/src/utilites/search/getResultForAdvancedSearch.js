/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { search } from './index';

/**
 * @description Getting advanced search results on the main page, taking into account the passed search parameter.
Color highlighting words that match the search.
 * @param {string} value - Entered word.
 * @param {string[]} fields - Selected search fields.
 * @returns {Object[]}
 */
export async function getResultForAdvancedSearch(value, fields = []) {
	value = value.trim();
	// get search data
	let dataSearch = await search.searchWordsFields(value.trim(), fields);
	// get highlighting for the required data
	let data = search.getRedFields(dataSearch, value);
	return data;
};
