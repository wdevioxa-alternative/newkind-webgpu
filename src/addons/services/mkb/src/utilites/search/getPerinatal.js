import { search } from '.';
import * as links from './links';

export async function getPerinatal(objects) {
		const res = await Promise.all(objects.map(async (object) => {
		try {
			console.log('------------- objects -------------', objects)
			if (object.entity.relatedEntitiesInPerinatalChapter) {
				const newRelatedEntitiesInPerinatalChapter = changeArrayUrlForGetLinearization(object.entity.relatedEntitiesInPerinatalChapter);
				object.entity.relatedEntitiesInPerinatalChapter = newRelatedEntitiesInPerinatalChapter;
				const perinatalEntity = await getEntitiesInPerinatal(object.entity.relatedEntitiesInPerinatalChapter);
				object.entity.relatedEntitiesInPerinatalChapter = perinatalEntity;
				return object;
			} else {
				return object;
			};

		} catch (error) {
			console.log(error);
		}
	})).then(newObjects => {
		return newObjects;
	}).catch(error => console.log(error));
	return res;
};

// замена запроса для получения линейных ссылок
function changeArrayUrlForGetLinearization(linksArray) {
	return linksArray.map((link) => {
		const entityId = link.match(/\d{0,15}$/);
		return `${links.URL_PREF_LINEAR}${entityId}`;
		// return `${links.URL_PREF_LINEAR}${entityId}/unspecified`;
	});
};

// замена ссылки на содержание
async function getEntitiesInPerinatal(array) {
	try {
		const resultRequests = await Promise.allSettled(
			array.map(
						async link => {
							const response = await search.api.apiGetEntityLin(link);
							if (response.data.codeRange) {
								const code = response.data.blockId.slice(-3);
								const responseCode = await search.api.apiSearchCode(code + 'Z')
								response.data = responseCode[0].data;
							}
							let oldUri = response.data['@id'];
							if (oldUri.includes('id.who.in')) {
								let uriPathname = new URL(oldUri).pathname;
								if (uriPathname.includes('unspecified')) {
									uriPathname = uriPathname.slice(0, -12);
									let id = uriPathname.substring(uriPathname.lastIndexOf('/') + 1);
									let uri = links.URL_PREF_LINEAR + id + "/unspecified";
									response.data.uri = uri;
								} else if (uriPathname.includes('other')) {
									uriPathname = uriPathname.slice(0, -6);
									let id = uriPathname.substring(uriPathname.lastIndexOf('/') + 1);
									let uri = links.URL_PREF_LINEAR + id + "/other";
									response.data.uri = uri;
								} else {
									let id = uriPathname.substring(uriPathname.lastIndexOf('/') + 1);
									let uri = links.URL_PREF_LINEAR + id;
									response.data.uri = uri;
								}
							}
							return response.data;
						}
					)
			);
			const resultFilter = resultRequests.filter((obj) => (obj.hasOwnProperty("value"))); // избавляемся от reject
			const result = resultFilter.map(obj => obj.value); // оставляем value из resolve
			return result;

	} catch (error) {
		console.log(error);
	};
};

