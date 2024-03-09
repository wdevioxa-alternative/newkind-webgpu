/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable import/prefer-default-export */
export function filterChapter(diseases ) {
  let tableOfChapters = {
		'isFull': false,
	};
  if (Array.isArray(diseases) && diseases.length > 0) {
    diseases.map(disease => {
      if (disease.entity.hasOwnProperty('code')) {
        if (tableOfChapters.hasOwnProperty(disease.entity.code[0])) {
          tableOfChapters[disease.entity.code[0]] += 1;
					tableOfChapters.isFull = true;
        }
        if (!tableOfChapters.hasOwnProperty(disease.entity.code[0])) {
          tableOfChapters[disease.entity.code[0]] = 1;
					tableOfChapters.isFull = true;
        }
      }
    });
  }
	return tableOfChapters;
}
