/* eslint-disable prefer-destructuring */
/* eslint-disable no-lonely-if */
/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { search } from './index';

export async function getResultMain(value, scale = [], fields = []) {
	value = value.trim();
	let dataSearch = await search.searchWordsMain(value, scale, fields);
	let data = search.getRedMainSearch(dataSearch, value);
	const arrayTitles = data.map(el => el.title);
	let resultTitleArray = [];
	for (let i = 0; i < arrayTitles.length; i++) {
		const arrayTitleWords = arrayTitles[i].split(' ');
		let isHasTitle = false;
		for (let j = 0; j < arrayTitleWords.length; j++) {
			if (arrayTitleWords[j].toLowerCase().includes(value)) {
				resultTitleArray.push({
					title: data[i].title,
					uri: data[i].uri,
					entity: data[i].entity,
					id: data[i].entityId,
					field: data[i].field,
					descendants: data[i].descendants || null,
				});
				isHasTitle = true;
				break;
			}
			if (j === arrayTitleWords.length - 1 && !isHasTitle) {
				resultTitleArray.push({
					title: data[i].title,
					uri: data[i].uri,
					fragments: data[i].fragments,
					entity: data[i].entity,
					id: data[i].entityId,
					field: data[i].field,
					descendants: data[i].descendants || null,
				});
			}
		}
	}

	await search.getDescendantsMain(value, resultTitleArray);

	// const arrayCode = [];
	// const arrayWithoutCode = [];

	// resultTitleArray.map(object => {
	// 	if (object.entity.hasOwnProperty('code')) {
	// 		arrayCode.push(object);
	// 	} else {
	// 		arrayWithoutCode.push(object);
	// 	}
	// });

	// arrayCode.sort((a, b) => {
	// 	if (a.entity.code < b.entity.code) return -1;
	// 	if (a.entity.code > b.entity.code) return 1;
	// 	if (a.entity.code === b.entity.code) return 0;
	// });
	// arrayCode.map(object => {
	// 	if (object.descendants) {
	// 		object.descendants.sort((a, b) => {
	// 			if (a.code < b.code) return -1;
	// 			if (a.code > b.code) return 1;
	// 			if (a.code === b.code) return 0;
	// 		});
	// 		return object;
	// 	}
	// 	object.sortCode = object.entity.code;
	// 	return object;
	// });

	resultTitleArray.map(object => {
	// arrayWithoutCode.map(object => {
		getSortCode(object);
		if (object.descendants) {
			// eslint-disable-next-line consistent-return
			object.descendants.sort((a, b) => {
				if (a.code < b.code) return -1;
				if (a.code > b.code) return 1;
				if (a.code === b.code) return 0;
			});
			return object;
		}
		return object;
	});
	resultTitleArray.sort((a, b) => {
	// arrayWithoutCode.sort((a, b) => {
		if (a.sortCode < b.sortCode) return -1;
		if (a.sortCode > b.sortCode) return 1;
		if (a.sortCode === b.sortCode) return 0;
	});

	return resultTitleArray;

	// const resultArray = [...arrayCode, ...arrayWithoutCode];
	// resultArray.sort((a, b) => {
	// 	if (a.sortCode < b.sortCode) return -1;
	// 	if (a.sortCode > b.sortCode) return 1;
	// 	if (a.sortCode === b.sortCode) return 0;
	// });
  // return resultArray;
}


function getSortCode(object) {
	let sortCode;
	if (object.entity.hasOwnProperty('code')) {
		object.sortCode = object.entity.code;
	} else {

		if (Array.isArray(object.descendants) && object.descendants.length > 0) {

			for (let i = 0; i < object.descendants.length; i++) {
				if (object.descendants[i].hasOwnProperty('code')) {
					sortCode = object.descendants[i].code[0];
					break;
				} else {
					sortCode = getSortCode(object.descendants[i]);
				}
			}

			if (!sortCode) {
				sortCode = '1';
			}

			object.sortCode = sortCode;
		}
	}
	return sortCode;
}
