
export function filterForPublishedList(array) {
	const filteredRuArray = array.filter(object => object.lang === 'ru');
	const filteredEnArray = array.filter(object => object.lang === 'en');
	const sortedRuArray = filteredRuArray.sort((a, b) => new Date(b.releaseID).getTime() - new Date(a.releaseID).getTime());
	const sortedEnArray = filteredEnArray.sort((a, b) => new Date(b.releaseID).getTime() - new Date(a.releaseID).getTime());
	return [...sortedRuArray, ...sortedEnArray];
}
