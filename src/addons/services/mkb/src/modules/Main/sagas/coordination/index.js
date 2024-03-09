import { call, takeEvery, put, select } from 'redux-saga/effects';
import axios, { getApi } from '@src/utilites/API';
import { coordinationActions } from '../../reducers/coordination';
import { fetchChildren, fetchList } from '../../api/tableOfContent';
import { system } from '../../../../config'
// import {href, getList, getAxisName} from '../../../../utilites/Icd-11'
import { search } from '../../../../utilites/search';

import {
  href,
  getList,
  getAxisName,
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

let request = ''

const type = {
  NotFound: {
    first: 'Первый указанный основной код не найден в справочнике МКБ-11',
    else: "Код (коды), выделенные красным цветом, не найдены среди допустимых расширений или дополнений основного диагноза"
  },
  ExtraCode: {
    default: 'Количество указанных кодов расширений (дополнений) превышает количество доступных для них осей посткоординации'
  }
}

let codeStringData = []
const codeString = (code, ext, isError) => {
  if(!isEmpty(ext)) {
    codeStringData.push({
      text: ext,
      match: isError
    })
  }

  codeStringData.push({
    text: code,
    ext: ext,
    match: isError
  })
}
const errorQueue = (title, self, data, count) => {
  if (isEmpty(self[`${title}`])) {
    self[`${title}`] = []
  }
  data.position = count && count >= 0 ? count : 0
  self[`${title}`].push(data)

  return self
}

const filter = (data) => {
  let tmp = {
    data: {
      object: {
        keys: [],
        value: []
      }
    },
    raw: data
  }

  for (let item of data) {
    if (item.axisName) {
      if (isEmpty(tmp.data.object.value[item.axisName])) {
        tmp.data.object.value[item.axisName] = []
      }
      tmp.data.object.value[item.axisName].push(item)
    } else {
      tmp.data.object.value['0'] = item
    }
  }

  tmp.data.object.keys = Object.keys(tmp.data.object.value)
  tmp.raw = data
  return tmp
}

const convert = (data) => {
  let text = ``
  let result = []
  const isError = !isEmpty(data.error)
  let status = true

  let system = ''
  let error = ''

  result.push({
    code: data.code
  })

  if (isError) {
    status = false
    data.error.message = type.NotFound.first
  }

  result[0].id = !isError ? new URL(href.decoder(api.transform.url.linearization(data.id))).pathname : undefined
  result[0].title = !isError ? data.title : ''
  result[0].isError = isError

  if (isError) {
    status = false
    error = errorQueue(type.NotFound.first, error, result[0], 0)
  }

  text = text + `Код: ${request}`
  text = text + `\n     ${data.code} ${result[0].title}`
  system = `${request}: ${data.code} ${result[0].title}`
  codeString(data.code, '', isError)

  if (data.clarification) {
    if (isEmpty(result.axis)) {
      if (!isEmpty(data.clarification)) {
        for (let axis of data.clarification) {
          if (axis.id) {
            axis.id = new URL(href.decoder(api.transform.url.linearization(axis.id))).pathname
          }
          if (isEmpty(axis.error)) {
            axis.axisName = getAxisName(axis.axis)
          } else {
            axis.isError = true
            axis.axisName = 'Ошибка'
            axis.id = axis.id ? axis.id : undefined
            axis.title = axis.title ? axis.title : ''
            status = false
            error = errorQueue(type.NotFound.else, error, axis)
          }
        }
      }

      let object = {
        keys: [],
        value: {}
      }

      for (let item of data.clarification) {
        if (isEmpty(object.value[item.axisName])) {
          object.value[item.axisName] = []
        }

        object.value[item.axisName].push(item)
      }

      object.keys = Object.keys(object.value)

      result[0].axis = {
        ...object,
        raw: data
      }
    }
  }

  if (data.editions) {
    let count = -1
    for (let axis of data.editions) {
      count++
      let datatmp = {}

      datatmp.code = axis.code
      datatmp.title = axis.title
      datatmp.id = axis.id

      if (!isEmpty(axis.error)) {
        status = false
        datatmp.isError = true
        datatmp.axisName = 'Ошибка'
        datatmp.id = datatmp.id ? new URL(href.decoder(api.transform.url.linearization(datatmp.id))).pathname : undefined
        datatmp.title = datatmp.title ? datatmp.title : ''

        if (!isEmpty(axis.clarification)) {
          for (let data of axis.clarification) {
            if (!isEmpty(data.error)) {
              if (isEmpty(datatmp.axis)) {
                datatmp.axis = {}
              }

              if (isEmpty(datatmp.axis[`Ошибка`])) {
                datatmp.axis[`Ошибка`] = []
              }

              data.isError = true
              data.id = data.id ? new URL(href.decoder(api.transform.url.linearization(data.id))).pathname : undefined
              data.title = data.title ? data.title : ''
              error = errorQueue(type.NotFound.else, error, data)
              status = false
              datatmp.axis[`Ошибка`].push(data)
            } else {
              data.axisName = getAxisName(data.axis)

              if (isEmpty(datatmp.axis)) {
                datatmp.axis = {}
              }

              if (isEmpty(datatmp.axis[`${data.axisName}`])) {
                datatmp.axis[`${data.axisName}`] = []
              }

              data.id = new URL(href.decoder(api.transform.url.linearization(data.id))).pathname
              if (!isEmpty(axis.error)) {
                status = false
                error = errorQueue(type.NotFound.else, error, data)
              }
              datatmp.axis[`${data.axisName}`].push(data)
            }
          }
        }

        error = errorQueue(axis.error.errorType === 2 ? type.ExtraCode.default : type.NotFound.else, error, datatmp, count)
      } else {
        datatmp.isError = false
        datatmp.axisName = getAxisName(axis.axis)
        datatmp.id = new URL(href.decoder(api.transform.url.linearization(axis.id))).pathname

        if (axis.clarification) {
          if (!isEmpty(axis.clarification)) {
            for (let data of axis.clarification) {
              if (!isEmpty(data.error)) {
                if (isEmpty(datatmp.axis)) {
                  datatmp.axis = {}
                }

                if (isEmpty(datatmp.axis[`Ошибка`])) {
                  datatmp.axis[`Ошибка`] = []
                }

                data.isError = true
                status = false
                data.id = data.id ? new URL(href.decoder(api.transform.url.linearization(data.id))).pathname : undefined
                data.title = data.title ? data.title : ''
                error = errorQueue(type.NotFound.else, error, data)
                datatmp.axis[`Ошибка`].push(data)
              } else {
                data.axisName = getAxisName(data.axis)

                if (isEmpty(datatmp.axis)) {
                  datatmp.axis = {}
                }

                if (isEmpty(datatmp.axis[`${data.axisName}`])) {
                  datatmp.axis[`${data.axisName}`] = []
                }

                data.id = new URL(href.decoder(api.transform.url.linearization(data.id))).pathname
                datatmp.axis[`${data.axisName}`].push(data)
              }
            }
          }

          datatmp.keys = Object.keys(datatmp.axis)
          datatmp.isSecond = true
        } else {
          datatmp.isSecond = false
        }
      }
      result.push(datatmp)
    }
  }

  result = filter(result)

  if (!isEmpty(result.data.object.keys)) {
    for (let i = 0; i < result.data.object.keys.length; ++i) {
      if (i === 0) {
        const obj = result.data.object.value[result.data.object.keys[i]]
        if (!isEmpty(obj.axis)) {
          if (!isEmpty(obj.axis.keys)) {
            for (let j = 0; j < obj.axis.keys.length; ++j) {
              const item = obj.axis.value[obj.axis.keys[j]]
              system = `${system} & (${obj.axis.keys[j]})`
              text = text + ` \n        ${obj.axis.keys[j]}`
              for (let k = 0; k < item.length; ++k) {
                codeString(item[k].code, '&', !!item[k].isError)
                system = `${system} ${item[k].code} ${item[k].title}`
                text = text + ` \n            ${item[k].code} ${item[k].title}`
              }
            }
          }
        }
      } else {
        const obj = result.data.object.value[result.data.object.keys[i]]
        system = `${system} (${result.data.object.keys[i]})`
        text = text + `\n        ${result.data.object.keys[i]}`
        for (let item of obj) {
          if (item.isSecond) {
            codeString(item.code, '/', !!item.isError)
            system = `${system} / ${item.code} ${item.title}`
            text = text + `\n            ${item.code} ${item.title}`
            for (let l = 0; l < item.keys.length; ++l) {
              system = `${system} & (${item.keys[l]})`
              text = text + `\n                ${item.keys[l]}`
              for (let m = 0; m < item.axis[item.keys[l]].length; ++m) {
                codeString(item.axis[item.keys[l]][m].code, '&', !!item.axis[item.keys[l]][m].isError)
                system = `${system} ${item.axis[item.keys[l]][m].code} ${item.axis[item.keys[l]][m].title}`
                text = text + `\n                    ${item.axis[item.keys[l]][m].code} ${item.axis[item.keys[l]][m].title}`
              }
            }
          } else {
            codeString(item.code, '/', item.isError)
            system = `${system}${item.code} ${item.title}`
            text = text + `\n            ${item.code} ${item.title}`
            if (!isEmpty(item.axis)) {
              for(let key in item.axis) {
                text = text + ` \n                ${key}`
                system = `${system} & (${key})`
                for(let i = 0; i < item.axis[key].length; ++i) {
                  system = `${system} & ${item.axis[key][i].code} ${item.axis[key][i].title}`
                  codeString(item.axis[key][i].code, '&', !!item.axis[key][i].isError)
                  text = text + ` \n                  ${item.axis[key][i].code} ${item.axis[key][i].title}`
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    result: result.data.object,
    status: status
  }
}
export function* getPageWorker({ payload: { root, pathname, cb } }) {
  try {
    // 
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
    let postcoordinationTree = {}

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
      residual = `Данная рубрика является "неуточненной" остаточной рубрикой`
    }

    if(page['@id'].includes('other')) {
      residual = `Данная рубрика является "другой уточненной" остаточной рубрикой`
    }


    let searchParams = new URL(window.location).searchParams;
    // var searchParams = new URLSearchParams(window.location.search);

    if(searchParams.has('axis')) {
      const postcoordination = decodeURIComponent(searchParams.get('axis'))

      request = postcoordination

      const API_DATA =  yield call(getApi)
      const tocInfo = yield call(axios.post,`/v1/icd/release/11/${API_DATA.Release}/mms/codeinfo`,  {
        combination: postcoordination
      });

      let splitRequest = postcoordination.split('/')
      let splitRequestAnd = postcoordination.split('&')
      let resultCodes= new Set();
      let resultCodesParent = new Set();

      if(splitRequest.length + splitRequestAnd.length !== 1) {
        for(let item of splitRequest) {
          if(item.indexOf('&') !== -1) {
            let tmp = item.split('&')
            for(let data of tmp) {
              if(data.length !== 0) {
                const parent = data.split('.')
                if(parent.length > 1) {
                  console.log('==========1 =========', parent[0])
                  resultCodesParent.add(parent[0])
                  if(parent[1].toString().length > 1) {
                    let tmp = Array.from(parent[1].toString())
                    for(let i = 0; i < tmp.length -1; ++i) {
                      console.log('======== 2 ===========', `${parent[0]}.${tmp[i]}`)
                      resultCodesParent.add(`${parent[0]}.${tmp[i]}`)
                    }
                  }
                }
                // resultCodes.add(data)
              }
            }
          } else {
            if(item.length !== 0) {
              const parent = item.split('.')
              if(parent.length > 1) {
                resultCodesParent.add(parent[0])
                if(parent[1].toString().length > 1) {
                  let tmp = Array.from(parent[1].toString())
                  for(let i = 0; i < tmp.length -1; ++i) {
                    resultCodesParent.add(`${parent[0]}.${tmp[i]}`)
                  }
                }
              }
              // resultCodes.add(item)
            }
          }
        }

        postcoordinationTree = convert(tocInfo.data.codeChain)
        postcoordinationTree.request = {
          status: true,
          codes: resultCodes,
          parent: resultCodesParent
        }
      }
    } else {
      postcoordinationTree.status = false
    }

    const result = {
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
      residual: residual,
      postcoordinationTree: postcoordinationTree
    }

    postcoordinationTree.actions = {
      onSetCode: []
    }

    const transformUrl = (array) => {
      return array.map(item => {
        const url = new URL(item)
        return `${window.location.origin}/v1${href.encode(url.pathname)}`
      })
    }

    if(result.postcoordinationTree.status) {
      for(let key of result.postcoordinationTree.result.keys) {
        if(result.postcoordinationTree.result.value[key].hasOwnProperty('axis')) {
          for(let axe of result.postcoordinationTree.result.value[key].axis.keys) {
              for(let item of result.postcoordinationTree.result.value[key].axis.value[axe]) {
                const responseCode = yield call(search.api.apiSearchCode, item.code);
                for(let scaleAxis of result.postcoordinationScale.postcoordinationScale) {
                  if(scaleAxis.axisName.trim().toLowerCase() === axe.trim().toLowerCase()) {
                    responseCode[0].data.ancestor = transformUrl(responseCode[0].data.ancestor)
                    responseCode[0].data.title = responseCode[0].data.title['@value']
                    responseCode[0].data.id = transformUrl([responseCode[0].data[`@id`]])[0]
                    result.postcoordinationTree.actions.onSetCode[`${responseCode[0].data.code}`] = {
                      axis: scaleAxis,
                      element: responseCode[0].data,
                      isSecond: false
                    }
                  }
                }
              }
          }
        } else {
         if(result.postcoordinationTree.result.value[key].hasOwnProperty('length')) {
           for(let item of result.postcoordinationTree.result.value[key]) {
             const responseCode = yield call(search.api.apiSearchCode, item.code);
             for(let scaleAxis of result.postcoordinationScale.postcoordinationScale) {
               if(scaleAxis.axisName.trim().toLowerCase() === item.axisName.trim().toLowerCase()) {
                 responseCode[0].data.ancestor = transformUrl(responseCode[0].data.ancestor)
                 responseCode[0].data.title = responseCode[0].data.title['@value']
                 responseCode[0].data.id = transformUrl([responseCode[0].data[`@id`]])[0]
                 result.postcoordinationTree.actions.onSetCode[`${responseCode[0].data.code}`] = {
                   axis: scaleAxis,
                   element: responseCode[0].data,
                   isSecond: false
                 }
               }
             }

             if(item.hasOwnProperty('axis')) {
               for(let axe in item.axis) {
                 for(let data of item.axis[axe]) {
                   const responseCode = yield call(search.api.apiSearchCode, data.code);
                   for(let scaleAxis of result.postcoordinationScale.postcoordinationScale) {
                     if(scaleAxis.axisName.trim().toLowerCase() === axe.trim().toLowerCase()) {
                       responseCode[0].data.ancestor = transformUrl(responseCode[0].data.ancestor)
                       responseCode[0].data.title = responseCode[0].data.title['@value']
                       responseCode[0].data.id = transformUrl([responseCode[0].data[`@id`]])[0]

                       result.postcoordinationTree.actions.onSetCode[`${responseCode[0].data.code}`] = {
                         axis: scaleAxis,
                         element: responseCode[0].data,
                         isSecond: true
                       }
                     }
                   }
                 }
               }
             }
           }
         }
        }
      }
    }

    yield call(cb, null, result);
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
