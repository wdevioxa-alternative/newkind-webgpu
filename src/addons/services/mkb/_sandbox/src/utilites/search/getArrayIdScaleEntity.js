/* eslint-disable import/prefer-default-export */
import * as links from './links'

/**
 * Something type. Correct in future.
 * @typedef {any} arrayScaleEntity
 */

/**
 * Getting array id of scale entity
 * @param {arrayScaleEntity} arrayScaleEntity
 * @returns {arrayScaleEntity}
 */
export	function getArrayIdScaleEntity(arrayScaleEntity) {
	if (arrayScaleEntity.length > 0) {
		return arrayScaleEntity.map(scaleEntity => scaleEntity.id.replace(links.URL_LOCALHOST_STANDART_V1, links.URL_PREF_BASE));
	};
	return arrayScaleEntity;
};

