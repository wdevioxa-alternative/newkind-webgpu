/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import axios from '@src/utilites/API';
import useLinks from './links';

/**
 * @description Entity search by word for advanced search on the main page
 * @param {string} word - The word by which the entity will be searched
 * @param {string[]} fields - List of fields that limit the list of entities to search by word
 * @returns {object} Object with result of search
*/
export async function apiSearchWordsFields(word, fields) {
	const links = useLinks()
  try {
    const body = getBodyForApiSearchWords(word, fields);
    const response = await axios.post(
      links.URL_SEARCH_LINEAR,
      body,
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

/**
* @description Creating a Body for a Request
* @param {string} word - The word by which the entity will be searched
* @param {string[]} fields - List of fields that limit the list of entities to search by word
* @returns {{query: string, highlight: boolean, subTree: [], fields: string[]}} Body for a Request
*/
function getBodyForApiSearchWords(word, fields) {
  return {
    query: word,
    highlight: true,
    subTree: [],
    fields,
  };
}
