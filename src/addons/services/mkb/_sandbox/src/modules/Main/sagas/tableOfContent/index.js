import { call, takeEvery, put, select } from 'redux-saga/effects';
import { tocActions } from '../../reducers/tableOfContent';
import { fetchChapter, fetchChildren, fetchList } from '../../api/tableOfContent';
import { flattenTree, addChildren } from "../../../../components/react-accessible-treeview/src";
import isEmpty from "../../../../utilites/isEmpty";
import { listData, getParentChapter, api, href, foundationChildElsewhere } from '../../../../utilites/Icd-11'
import {coordinationActions} from "../../reducers/coordination";
import { system } from '../../../../config'

const getChapters = (state) => state.icd.toc.chapter

const splitArray = (inputArray, perChunk) => {
  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index/perChunk)

    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])
}

export function* fetchChapterWorker({ payload: { pathname, type, cb } }) {
  try {
    const dataChapter = yield select(getChapters);

    if(!isEmpty(dataChapter) && ((window.location.pathname === '/' || window.location.pathname === `${process.env.PUBLIC_URL}`) || window.location.pathname === `${process.env.PUBLIC_URL}/`)) {
      yield call(cb, null, { data: dataChapter, expand: [1] });
    } else {
      const { data: chapters }  = yield call(fetchChapter);
      let children = []
      if(system.api) {
        children = yield call(fetchList, listData(chapters.child));
      } else {
        const endpoints = api.transform.url.linearization(chapters.child)
        children = yield call(fetchChildren, endpoints);
      }

      const layer = children.map( item => {
        return {
          id: api.transform.url.linearization(item[`@id`]),
          classKind: item.classKind,
          exclusion: item.exclusion,
          codingNote: item.codingNote,
          code: item.code,
          title: item.title['@value'],
          child: api.transform.url.linearization(item.child)
        }
      })

      const data = api.transform.chapters(layer)

      let destination = {}
      const tree = []
      let expand = [0]
      const openId = []
      let currentObject = {}
      let destinationFoundationChildElsewhere = []

      
      if((
          pathname.pathname !== '/'
          && window.location.pathname !== '/'
          && !window.location.pathname.startsWith('/coding') 
          && !window.location.pathname.startsWith('/testing')
          && !window.location.pathname.startsWith('/node')
          && !window.location.pathname.startsWith('/testing/coding')
        ) || type === "window") {

        let path = ''
        if(type !== 'window') {
          path = window.location.pathname[window.location.pathname.length -1].includes('/')
              ? (window.location.pathname.replace(/.$/,""))
              : window.location.pathname
        } else {
          path = pathname.pathname
        }

        let url = api.transform.url.linearization(href.encode(path, window.location.pathname.includes('/coding')?'coding': 'page'))

        destination = yield call(fetchChildren, url);
        currentObject = destination

        if(destination.classKind !== 'chapter') {
          let count = 60

          while (count) {
            destinationFoundationChildElsewhere = []

            const currentParent = destination.parent[0]
            const currentId = destination['@id']

            destination = yield call(fetchChildren, api.transform.url.linearization(currentParent));
            destinationFoundationChildElsewhere = yield call(foundationChildElsewhere,destination);

            let allData = []
            let children = {}

            if(system.api) {
              children = yield call(fetchList, listData(destination.child));

              for(let item of children) {
                item.foundationChildElsewhere = yield call(foundationChildElsewhere,item);
              }

            } else {
              children = yield call(fetchChildren, api.transform.url.linearization(destination.child));
            }
            allData = children
            let isSplice = false


            if(!isEmpty(destinationFoundationChildElsewhere)) {
              for(let i = 0; i < children.length; ++i) {
                if(children[i][`@id`].includes('unspecified') || children[i][`@id`].includes('other')) {
                  children.splice(i, 0, ...destinationFoundationChildElsewhere)
                  allData = children
                  isSplice = true
                  break
                }
              }

              if(!isSplice) {
                allData = children.concat(destinationFoundationChildElsewhere);
              }
            }

            const layer = allData.map(item => {
              let data = {
                id: api.transform.url.linearization(item[`@id`]),
                isChild: !!item.isChild || !isEmpty(item.foundationChildElsewhere),
                classKind: item.classKind,
                parent: api.transform.url.linearization(item.parent),
                code: item.code,
                exclusion: item.exclusion,
                codingNote: item.codingNote,
                title: item.title['@value'],
                child: item.child ? api.transform.url.linearization(item.child) : undefined,
                isFoundationChildElsewhere: !!item.isFoundationChildElsewhere
              }

              return data
            })

            const current = api.transform.childrenWithChildren((layer))

            tree.unshift({
              childId: currentId,
              currentId: api.transform.url.linearization(destination['@id']),
              child: current
            })

            if(destination.classKind === 'chapter' || count <= 0) {
              break
            }

            count--;
          }
        }
      }

      if(!isEmpty(tree)) {
        let count = 0
        const addChild = (data, child) => {
          for( let item of data) {
            if(item.link === child.currentId) {
              item.children.pop()
              item.children = child.child
              openId.push(api.transform.url.linearization(child.childId))
              count = count + 1
              if(!isEmpty(tree[count])) {
                addChild(item.children, tree[count])
              } else {
                break
              }
            }
          }
        }
        addChild(data.children[0].children, tree[count])
      }

      let result = yield call(flattenTree, data);

      expand = openId.map(itemId => result.find(item => item.link === itemId).parent)
      expand.unshift(1)
      yield put(tocActions.setChapter(result));
      yield put(tocActions.setCurrent(api.transform.url.linearization(currentObject['@id'])));

      yield call(cb, null, { data: result, expand: expand });
    }

  } catch (error) {
    console.error('error', error);
  } finally {
    yield put(tocActions.setLoading(false));
  }
}

export function* fetchChildrenWorker({ payload: { root, type, axisName, isChild, child, cb, previous, id, classKind, link, isFoundationChildElsewhere } }) {
  try {
    let allData = []

    let self = {}
    let isSplice = false

    if(link) {
      self = yield call(fetchChildren, link);
      self.child = yield call(fetchList,listData(self.child));

      self.foundationChildElsewhere = yield call(foundationChildElsewhere, self)

      if(type === 'postcoordination' && !isEmpty(self.foundationChildElsewhere)) {
        self.foundationChildElsewhere = self.foundationChildElsewhere.filter(item => {
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

      for(let data of self.child) {
        if(!isEmpty(data.foundationChildElsewhere)) {
          for(let item of data.foundationChildElsewhere) {
            let foundationReference = item.foundationReference.substring(item.foundationReference.lastIndexOf('/') + 1)
            let linearizationReference = item.linearizationReference.substring(item.linearizationReference.lastIndexOf('/') + 1)

            if (linearizationReference === foundationReference) {
              data.isChild = true
              break
            }
          }
        }
      }

      allData = self.child

      if(!isEmpty(self.foundationChildElsewhere)) {
        for(let i = 0; i < self.child.length; ++i) {
          if(self.child[i][`@id`].includes('unspecified') || self.child[i][`@id`].includes('other')) {
            self.child.splice(i, 0, ...self.foundationChildElsewhere)
            allData = self.child
            isSplice = true
            break
          }
        }

        if(!isSplice) {
          allData = self.child.concat(self.foundationChildElsewhere);
        }
      }

      if(isFoundationChildElsewhere) {
        self.child.map(item => item.isFoundationChildElsewhere = true)
      }
    } else {
      console.error('должно быть поле link')
    }

    let layer = []
    for(let item of allData) {
      if(item.ancestor) {
        const chapter = yield call(getParentChapter, api.transform.url.linearization(item.ancestor[item.ancestor.length - 1]));
        layer.push({
          id: api.transform.url.linearization(item[`@id`]),
          ancestor: api.transform.url.linearization(item.ancestor),
          classKind: item.classKind,
          isChild: !!item.isChild,
          parent: api.transform.url.linearization(item.parent),
          code: item.code,
          chapter: chapter.code,
          postcoordinationScale: item.postcoordinationScale,
          codeRange: item.codeRange,
          title: item.title['@value'],
          child: item.child ? api.transform.url.linearization(item.child) : undefined,
          isFoundationChildElsewhere: isFoundationChildElsewhere ? isFoundationChildElsewhere : !!item.isFoundationChildElsewhere
        })
      } else {
        if(item.classKind === "chapter") {
          const chapter = item.code

          layer.push({
            id: api.transform.url.linearization(item[`@id`]),
            ancestor: api.transform.url.linearization(item.ancestor),
            classKind: item.classKind,
            isChild: !!item.isChild,
            parent: api.transform.url.linearization(item.parent),
            code: item.code,
            chapter: chapter.code,
            postcoordinationScale: item.postcoordinationScale,
            codeRange: item.codeRange,
            title: item.title['@value'],
            child: item.child ? api.transform.url.linearization(item.child) : undefined,
            isFoundationChildElsewhere: isFoundationChildElsewhere ? isFoundationChildElsewhere : !!item.isFoundationChildElsewhere
          })
        }
      }
    }

    if(self.classKind === 'block') {
      for(let i = 0; i < layer.length; ++i) {
        if(layer[i].classKind === 'block') {
          for(let j = 0; j < layer[i].child.length; ++j) {
            if(layer[i].child[j].includes('unspecified')) {
              layer[i].child[j] = yield call(fetchChildren, layer[i].child[j]);
            }
          }
        }
      }
    }

    const data = api.transform.children((layer))
    const result = addChildren(previous, data, id)

    if(axisName && root && type === 'postcoordination') {
      yield put(coordinationActions.postcoordinationScale({
        axisName: `${root}_${axisName}`,
        toc: result
      }));
    }

    if(type !== 'postcoordination') {
      yield put(tocActions.setChapter(result));
    }

    yield call(cb, null, { data: result });
  } catch (error) {
    console.error('error', error);
  } finally {
    yield put(tocActions.setLoading(false));
    yield put(coordinationActions.setLoading(false));
  }
}

export function* fetchSearchWorker({ payload: { pathname, type, cb } })   {
  try {
    const dataChapter = yield select(getChapters);

    if(!isEmpty(dataChapter)
        && ((window.location.pathname === '/'
            || window.location.pathname === `${process.env.PUBLIC_URL}`)
            || window.location.pathname === `${process.env.PUBLIC_URL}/`)) {
      yield call(cb, null, { data: dataChapter, expand: [1] });
    } else {
      const { data: chapters }  = yield call(fetchChapter);
      let children = []
      if(system.api) {
        children = yield call(fetchList, listData(chapters.child));
      } else {
        const endpoints = api.transform.url.linearization(chapters.child)
        children = yield call(fetchChildren, endpoints);
      }
      const layer = children.map( item => {
        return {
          id: api.transform.url.linearization(item[`@id`]),
          classKind: item.classKind,
          exclusion: item.exclusion,
          codingNote: item.codingNote,
          code: item.code,
          title: item.title['@value'],
          child: api.transform.url.linearization(item.child)
        }
      })

      const data = api.transform.chapters(layer)

      let destination = {}
      const tree = []
      let expand = [0]
      const openId = []
      let currentObject = {}
      let destinationFoundationChildElsewhere = []

      if((window.location.pathname !== '/'
          && window.location.pathname !== '/coding'
          && window.location.pathname !== '/testing'
          && window.location.pathname !== '/testing/coding'
          && window.location.pathname !== '/testing/') || type === "window") {

        let path = ''
        if(type !== 'window') {
          path = window.location.pathname[window.location.pathname.length -1].includes('/')
              ? (window.location.pathname.replace(/.$/,""))
              : window.location.pathname
        } else {
          path = pathname.pathname
        }

        let url = api.transform.url.linearization(href.encode(path, window.location.pathname.includes('/coding')?'coding': 'page'))

        destination = yield call(fetchChildren, url);
        currentObject = destination

        if(destination.classKind !== 'chapter') {
          let count = 60

          while (count) {
            destinationFoundationChildElsewhere = []

            const currentParent = destination.parent[0]
            const currentId = destination['@id']

            destination = yield call(fetchChildren, api.transform.url.linearization(currentParent));
            destinationFoundationChildElsewhere = yield call(foundationChildElsewhere,destination);

            let allData = []
            let children = {}

            if(system.api) {
              children = yield call(fetchList, listData(destination.child));

              for(let item of children) {
                item.foundationChildElsewhere = yield call(foundationChildElsewhere,item);
              }

            } else {
              children = yield call(fetchChildren, api.transform.url.linearization(destination.child));
            }
            allData = children
            let isSplice = false

            if(!isEmpty(destinationFoundationChildElsewhere)) {
              for(let i = 0; i < children.length; ++i) {
                if(children[i][`@id`].includes('unspecified') || children[i][`@id`].includes('other')) {
                  children.splice(i, 0, ...destinationFoundationChildElsewhere)
                  allData = children
                  isSplice = true
                  break
                }
              }

              if(!isSplice) {
                allData = children.concat(destinationFoundationChildElsewhere);
              }
            }

            const layer = allData.map(item => {
              let data = {
                id: api.transform.url.linearization(item[`@id`]),
                isChild: !!item.isChild || !isEmpty(item.foundationChildElsewhere),
                classKind: item.classKind,
                parent: api.transform.url.linearization(item.parent),
                code: item.code,
                exclusion: item.exclusion,
                codingNote: item.codingNote,
                title: item.title['@value'],
                child: item.child ? api.transform.url.linearization(item.child) : undefined,
                isFoundationChildElsewhere: !!item.isFoundationChildElsewhere
              }

              return data
            })

            const current = api.transform.childrenWithChildren((layer))

            tree.unshift({
              childId: currentId,
              currentId: api.transform.url.linearization(destination['@id']),
              child: current
            })

            if(destination.classKind === 'chapter' || count <= 0) {
              break
            }

            count--;
          }
        }
      }

      if(!isEmpty(tree)) {
        let count = 0
        const addChild = (data, child) => {
          for( let item of data) {
            if(item.link === child.currentId) {
              item.children.pop()
              item.children = child.child
              openId.push(api.transform.url.linearization(child.childId))
              count = count + 1
              if(!isEmpty(tree[count])) {
                addChild(item.children, tree[count])
              } else {
                break
              }
            }
          }
        }
        addChild(data.children[0].children, tree[count])
      }


      let result = yield call(flattenTree, data);

      expand = openId.map(itemId => result.find(item => item.link === itemId).parent)
      expand.unshift(1)
      yield put(tocActions.setChapter(result));
      yield put(tocActions.setCurrent(api.transform.url.linearization(currentObject['@id'])));

      yield call(cb, null, { data: result, expand: expand });
    }

  } catch (error) {
    console.error('error', error);
  } finally {
    yield put(tocActions.setLoading(false));
  }
}

export function* fetchChapterWatcher() {
  yield takeEvery( tocActions.fetchChapter, fetchChapterWorker );
}

export function* fetchChildrenWatcher() {
  yield takeEvery( tocActions.fetchChildren, fetchChildrenWorker );
}

export function* fetchSearchWatcher() {
  yield takeEvery( tocActions.fetchSearch, fetchSearchWorker );
}


const sagasVersion = [
  fetchChapterWatcher,
  fetchChildrenWatcher,
  fetchSearchWatcher
];

export default sagasVersion;
