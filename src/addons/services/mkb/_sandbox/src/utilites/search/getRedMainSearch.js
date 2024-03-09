/* eslint-disable no-lonely-if */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-useless-escape */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-regex-literals */
/* eslint-disable import/prefer-default-export */
export function getRedMainSearch(array, word) {
	// const regexpArrayWord = new RegExp("[^а-яёА-ЯËa-zA-Z0-9]", "gi");
	const regexpArrayWord = new RegExp(" +|-+|,+|_+|#+", "gi");

	let arrayWord = word.split(regexpArrayWord);
	arrayWord = deleteExtraAtTheEnd(arrayWord);
	array.map(object => {
		let titleInFragment = '';
		let indexTermInFragment = '';
		object.fragments.map(fragment => {
			if (fragment.field === 'title') {
				titleInFragment = fragment.highlights.join(' ');
			}
			if (fragment.field === 'indexTerm') {
				indexTermInFragment += fragment.highlights.join(' ');
			}
		});
		const regexp = new RegExp("<em>\\w*\\d*[А-ЯËа-яё]*<\/em>", "gi");
		let arrayWordTitle = titleInFragment.match(regexp);
		if (arrayWordTitle) {
			object.entity.countTitle = 0;
			for (let i = 0; i < arrayWordTitle.length; i++) {
				let sliceArrayWordTitle = arrayWordTitle[i].slice(4, -5);
				if (object.title.includes(sliceArrayWordTitle)) {
					object.title = object.title.replace(sliceArrayWordTitle, `<span>${sliceArrayWordTitle}</span>`);
					object.entity.countTitle += 1;
					object.isWords = true;
					if (word.toLowerCase() === sliceArrayWordTitle.toLowerCase()) {
						object.entity.isBlueTitle = true;
					} else {
						if (object.entity.isBlueTitle) {
							object.entity.isBlueTitle = true;
						} else {
							object.entity.isBlueTitle = false;
						}
				}
				} else {
					if (object.isWords) {
						object.isWords = true;
					} else {
						object.isWords = false;
					}
				}
			}
		}

		let arrayWordsIndexTerms = indexTermInFragment.match(regexp);
		arrayWordsIndexTerms = unicValueArray(arrayWordsIndexTerms);

		if (arrayWordsIndexTerms) {
			let newIndexTermArray = [];
			for (let i = 0; i < object.entity.indexTerm.length; i++) {
				object.entity.indexTerm[i].count = 0;
					for (let j = 0; j < arrayWordsIndexTerms.length; j++) {
						let sliceArrayWordsIndexTerms = arrayWordsIndexTerms[j].slice(4, -5);

						if (object.entity.indexTerm[i].label['@value'].includes(sliceArrayWordsIndexTerms)
						// && !object.entity.indexTerm[i].label['@value'].includes('<span>')
						) {
							object.entity.indexTerm[i].label['@value'] = object.entity.indexTerm[i].label['@value'].replace(sliceArrayWordsIndexTerms, `<span>${sliceArrayWordsIndexTerms}</span>`);
							object.entity.indexTerm[i].count += 1;
							object.isWords = true;
					} else {
						if (object.isWords) {
							object.isWords = true;
						} else {
							object.isWords = false;
						}
					}
						if (object.entity.indexTerm[i].label['@value'].includes('<span>') && j === arrayWordsIndexTerms.length - 1) {
							newIndexTermArray.push(object.entity.indexTerm[i])
						}
					}
			}
			object.entity.indexTerm = newIndexTermArray;
		}
	});

	// This is a filter for filtering out erroneous results from the backend without the search words.
	array = array.filter(object => object.isWords);

	return array;
}

function unicValueArray(array) {
	let result = [];
	if (Array.isArray(array)) {

		for (let i = 0; i < array.length; i++) {
			if (!result.includes(array[i])) {
				result.push(array[i]);
			}
		}
	} else {
		result = null;
	}
	return result;
}


function deleteExtraAtTheEnd(array) {
	const regexp = new RegExp(' |\\w+|\\d+|[а-яёА-ЯË]+', 'gi');
	return array.filter(el => el !== '');
}
