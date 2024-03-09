import { call, takeEvery, put, select } from 'redux-saga/effects';
import { coordinationActions } from '../../reducers/coordination';
import { fetchChildren, fetchList } from '../../api/tableOfContent';
import { system } from '../../../../config'
import { href, getList } from '../../../../utilites/Icd-11'
import {
  api,
  getPostcoordinationScale,
  transformPostcoordinationScale,
  getFoundationChildElsewhere,
  getExclusion,
  getInclusion,
  getAncestor,
  foundationChildElsewhere,
  childForPostcoordination
} from "../../../../utilites/Icd-11";
import isEmpty from "../../../../utilites/isEmpty";
import { listData } from '../../../../utilites/Icd-11'
import {loaderList} from "../../api/auth";
export function* getPageWorker({ payload: { root, pathname, cb } }) {
  try {
    yield put(coordinationActions.setLoading(true));
    yield put(coordinationActions.resetCode());
    const page = yield call(fetchChildren, pathname);

    let postcoordination = undefined
    let exclusionData = undefined
    let inclusionData = undefined
    let foundationChildElsewhereData = undefined
    let ancestor = undefined
    let longDefinition = undefined
    let relatedEntitiesInPerinatalChapter = undefined
    let codingNote = undefined
    let relatedEntitiesInMaternalChapter = undefined
    let exclusionsFromAboveLevels = {}
    let residual = undefined

    if(page.postcoordinationScale) {
      postcoordination = yield call(getPostcoordinationScale, page, []);

      for(let coordination of postcoordination.postcoordinationScale) {
        for(let item of coordination.scaleEntity) {
          if(!isEmpty(item.foundationChildElsewhere)) {
            let childElsewhere = yield call(foundationChildElsewhere,item);
            if(childElsewhere) {
              childElsewhere = childElsewhere.filter(item => {
                let ancestor = item.ancestor
                if(!isEmpty(ancestor)) {
                  let id = ancestor[ancestor.length -1].substring(ancestor[ancestor.length -1].lastIndexOf('/') + 1)
                  if(id === '979408586') {
                    return item
                  }
                } else {
                  console.warn('у этой записи нет предков', item)
                  return item
                }
              })
            }
            let length = childElsewhere ? childElsewhere.length : 0
            coordination.length = coordination.length + length
            if(item.child && !isEmpty(childElsewhere)) {
              item.child = item.child.concat([...childElsewhere])
            } else {
              if(!isEmpty(childElsewhere)) {
                item.child = childElsewhere
              }
            }
          }
        }
      }

      postcoordination = yield call(childForPostcoordination, postcoordination)
      postcoordination = yield call(transformPostcoordinationScale, postcoordination);

      for(let item of postcoordination.postcoordinationScale) {
        yield put(coordinationActions.postcoordinationScale({
          axisName: `${ postcoordination.code }_${item.axisName}`,
          toc: item.toc
        }));
      }

      yield put(coordinationActions.setRoot(postcoordination.code));
    }

    if(!isEmpty(page.foundationChildElsewhere)) {
      let childrens = []
      for( let item of page.foundationChildElsewhere) {
        childrens.push(item.linearizationReference)
      }

      if(system.api) {
        foundationChildElsewhereData = yield call(fetchList, listData(childrens));
        foundationChildElsewhereData = yield call(getFoundationChildElsewhere, foundationChildElsewhereData);
      } else {
        foundationChildElsewhereData = yield call(getFoundationChildElsewhere, childrens);
      }
    }

    if(page.inclusion) {
      inclusionData = yield call(getInclusion, page);
    }

    if(page.exclusion) {
      const endpoints = []
      const exclusionLabel = []

      for(let item of page.exclusion) {
        exclusionLabel.push({
          title: {
            '@value': item.label['@value']
          },
        })
        endpoints.push(item.linearizationReference)
      }

      if(system.api) {
        exclusionData = yield call(fetchList, listData(endpoints));
        for(let i = 0; i < exclusionData.length; ++i) {
          exclusionData[i].title = Object.assign(exclusionData[i].title, page.exclusion[i].label)
        }
        exclusionData = yield call(getExclusion, exclusionData);
      } else {
        exclusionData = yield call(api.get.ChildrenConcepts, api.transform.url.linearization(endpoints));
        exclusionData = yield call(getExclusion, exclusionData);
      }
    }

    if(page.ancestor) {
      if(system.api) {
        ancestor = yield call(fetchList, listData(page.ancestor));

        for(let item of ancestor) {
          if(item.exclusion) {
            for(let data of item.exclusion) {
              if(data.foundationReference && data.linearizationReference) {
                let foundationReferenceID = data.foundationReference.substring(data.foundationReference.lastIndexOf('/') + 1)
                let linearizationReferenceID = data.linearizationReference.substring(data.linearizationReference.lastIndexOf('/') + 1)
                if(foundationReferenceID === linearizationReferenceID) {
                  exclusionsFromAboveLevels = getList(data.linearizationReference, exclusionsFromAboveLevels, item)
                }
              }
            }
          }
        }

        if(!isEmpty(exclusionsFromAboveLevels)) {
          exclusionsFromAboveLevels.array = yield call(fetchList, listData(exclusionsFromAboveLevels.array));
        }

        ancestor = yield call(getAncestor, ancestor);
      } else {
        ancestor = yield call(api.get.ChildrenConcepts, api.transform.url.linearization(page.ancestor));
        ancestor = yield call(getAncestor, ancestor);
      }
    }

    if(page.longDefinition) {
      longDefinition = page.longDefinition['@value']
    }

    if(!isEmpty(page.codingNote)) {
      codingNote = page.codingNote[`@value`]
    }

    if(!isEmpty(page.relatedEntitiesInPerinatalChapter)) {
      relatedEntitiesInPerinatalChapter = yield call(fetchChildren, href.entityToCurrent(page.relatedEntitiesInPerinatalChapter));
    }

    if(!isEmpty(page.relatedEntitiesInMaternalChapter)) {
      relatedEntitiesInMaternalChapter = yield call(fetchChildren, href.entityToCurrent(page.relatedEntitiesInMaternalChapter));
    }

    if(page['@id'].includes('unspecified')) {
      residual = `Данная рубрика являтется "неуточненной" остаточной рубрикой`
    }

    if(page['@id'].includes('other')) {
      residual = `Данная рубрика являтется "другой уточненной" остаточной рубрикой`
    }

    yield call(cb, null, {
      id: api.transform.url.linearization(page['@id'], system.api ? 'pathname' : 'href'),
      code: page.code,
      title: page.title['@value'],
      definition: page.definition['@value'],
      ancestor: ancestor,
      exclusion: exclusionData,
      inclusion: inclusionData,
      foundationChildElsewhere: foundationChildElsewhereData,
      postcoordinationScale: postcoordination,
      longDefinition: longDefinition,
      relatedEntitiesInPerinatalChapter: relatedEntitiesInPerinatalChapter,
      relatedEntitiesInMaternalChapter: relatedEntitiesInMaternalChapter,
      codingNote: codingNote,
      exclusionsFromAboveLevels: exclusionsFromAboveLevels,
      residual: residual
    });
  } catch (e) {
    console.error(e)
  } finally {
    yield put(coordinationActions.setLoading(false));
  }
}
export function* changeCodeWorker({ payload: { data, cb } }) {
  try {
    yield put(coordinationActions.setLoading(true));
  } catch (e) {
    console.error(e)
    yield put(coordinationActions.setLoading(false));
  } finally {
    yield put(coordinationActions.setLoading(false));
  }
}
export function* loaderCheckWorker({ payload: { cb } }) {
  try {
    let isICDLatest = yield call(loaderList, 'ru');
    if(isICDLatest) {
      cb(undefined, isICDLatest)
    } else {
      isICDLatest = yield call(loaderList, 'en');
      cb(undefined, isICDLatest)
    }

  } catch (e) {
    console.error(e)
    cb(e)
  } finally {

  }
}

export function* getPageWatcher() {
  yield takeEvery( coordinationActions.getPage, getPageWorker );
}
export function* changeCodeWatcher() {
  yield takeEvery( coordinationActions.changeCode, changeCodeWorker );
}
export function* loaderCheckWatcher() {
  yield takeEvery( coordinationActions.loaderCheck, loaderCheckWorker );
}

const sagasVersion = [
  getPageWatcher,
  changeCodeWatcher,
  loaderCheckWatcher
];

export default sagasVersion;
