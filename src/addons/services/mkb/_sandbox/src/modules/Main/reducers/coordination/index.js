import { createSymbiote } from 'redux-symbiote';
import isEmpty from "../../../../utilites/isEmpty";
import relation from '../../../../utilites/Icd-11/predcoordination'

export const initialState = {
    isLoading: false,
    postcoordinationScale: {},
    post: {},
    coordination: [],
};

const predcoordination = (coordination, code) => {

    if(relation.data.has(coordination[0].substrate)) {
        let excludeItem = ''
        let exclude = relation.data.get(coordination[0].substrate).filter(item => {
           if(item.exclude === code) {
               excludeItem = item.exclude
               return true
           }
        })
        if(!isEmpty(exclude)) {
            coordination[0].relation.push({
                root: coordination[0].substrate,
                current: exclude[0].result,
                relation: excludeItem
            })
        }
    }

    return coordination
}

export const {
  actions: coordinationActions,
  reducer: coordinationReducer
} = createSymbiote(
    initialState,  {
    setLoading: (state, _payload) => ({
        ...state,
        isLoading: _payload
    }),
    loaderCheck: (state, _payload) => ({
        ...state
    }),
    setRoot: (state, _payload) => {
        state.coordination = []

        state.coordination.push({
            substrate: _payload,
            property: [],
            relation: []
        })

        state.coordination = [...state.coordination]

        return state
    },
    getPage: (state, _payload) => {
        return state
    },
    postcoordinationScale: (state, _payload) => {
        if(!isEmpty(state.postcoordinationScale[`${_payload.axisName}`])) {
            state.postcoordinationScale[`${_payload.axisName}`] = []
        }

        state.postcoordinationScale[`${_payload.axisName}`] = _payload.toc

        state.postcoordinationScale = {
            ...state.postcoordinationScale
        }

        return state
    },
    resetCode: (state, _payload) => {
        state.post = {}
        state.coordination = []
        return state
    },
    fetchObject: (state, _payload) => state,
    changeCode: (state, _payload) => {
        const { data, cb } = _payload
        if(data.type === "delete") {
            let index = -1
            state.post[`${data.key}`].forEach((item, key) => {
                if(item.id === data.id) {
                    index = key
                }
            })

            if (index > -1) {
                state.post[`${data.key}`].splice(index, 1);
                if(isEmpty(state.post[data.key])) {
                    delete state.post[data.key]
                }
            }

            if(state.coordination[0].relation.some(item => item.relation === _payload.data.code)) {
                state.coordination[0].relation = []
            }

            for(let i = 0; i < state.coordination.length; ++i) {
                if(!isEmpty(state.coordination[i].property)) {
                    for(let j = 0; j < state.coordination[i].property.length; ++j ) {
                        if(state.coordination[i].property[j].substrate === '/' && isEmpty(data.code)) {
                            state.coordination[i].property.splice(j, 1)
                            break
                        }
                        if(data.code === state.coordination[i].property[j].substrate) {
                            state.coordination[i].property.splice(j, 1)
                            break
                        }
                    }
                }

                const removedCode = data.isUnspecified ? data.unspecified : data.code
                if(removedCode === state.coordination[i].substrate) {
                    state.coordination.splice(i, 1)
                    break
                }
            }

            state.post = {...state.post }
            return state
        } else if (data.type === "reset") {
            state.post = {}
            state.post = {...state.post }
            return state
        } else {
            state.coordination = predcoordination(state.coordination, _payload.data.object.code)

            if(isEmpty(state.post[`${data.root}_${data.axisName}`])) {
                state.post[`${data.root}_${data.axisName}`] = []
            }

            if(!state.post[`${data.root}_${data.axisName}`].some(item => item.id === data.object.id)) {
                let isExists = false
                if(data.object.isAdditional) {
                    if(data.allowMultipleValues === "AllowedExceptFromSameBlock") {
                    } else if(data.allowMultipleValues === "NotAllowed") {
                    } else {
                        if(data.object.isNextLayer) {
                            if(isEmpty(data.object.layer)) {
                                data.object.layer = []
                            }

                            data.object.layer.push(data.object.code)
                        }

                        state.post[`${data.root}_${data.axisName}`].push(data.object)

                        let substrate = ''
                        if(data.object.isUnspecified) {
                            substrate = data.object.unspecified
                        } else {
                            substrate = data.object.isBlock ? '' : data.object.code
                        }

                        state.coordination.push({
                            substrate: substrate,
                            property: [],
                            relation: []
                        })
                    }
                } else {
                    if(isEmpty(state.coordination) && data.object.isXV) {
                        if(data.allowMultipleValues === "AllowedExceptFromSameBlock") {
                        } else if(data.allowMultipleValues === "NotAllowed") {
                        } else {
                            let isCodeInObject = false
                            let keyInObject = ''
                            if(!isEmpty(data.object.code)) {
                                for(let key in state.post) {
                                    const id = key.split('_')[0]
                                    if(data.object.code === id) {
                                        isCodeInObject = true
                                        keyInObject = key
                                    }
                                }

                                if(isCodeInObject) {
                                    if(isEmpty(state.post[keyInObject].axis)) {
                                        state.post[keyInObject].axis = []
                                    }

                                    state.post[keyInObject].axis.push({
                                        id: `${data.root}_${data.axisName}`,
                                        data: data.object
                                    })
                                } else {
                                    state.post[`${data.root}_${data.axisName}`].push(data.object)
                                }

                            } else {
                                console.error('НЕТ КОДА')
                            }

                                state.coordination.push({
                                    substrate: data.root,
                                    property: [{
                                        substrate: data.object.code,
                                        property: [],
                                        relation: []
                                    }],
                                    relation: []
                                })
                            }
                    } else {
                        let count = 0;
                        for(let item of state.coordination) {
                            if(item.substrate === data.root) {
                                if(data.allowMultipleValues === "AllowedExceptFromSameBlock") {
                                    if(isEmpty(item.property)) {
                                        let isCodeInObject = false
                                        let keyInObject = ''

                                        if(!isEmpty(data.object.code)) {
                                            for(let key in state.post) {
                                                const id = key.split('_')[0]
                                                if(data.object.code === id) {
                                                    isCodeInObject = true
                                                    keyInObject = key
                                                }
                                            }

                                            if(isCodeInObject) {
                                                if(isEmpty(state.post[keyInObject].axis)) {
                                                    state.post[keyInObject].axis = []
                                                }

                                                state.post[keyInObject].axis.push({
                                                    id: `${data.root}_${data.axisName}`,
                                                    data: data.object
                                                })
                                            } else {
										       state.post[`${data.root}_${data.axisName}`].push(data.object)
                                            }

                                            item.property.push({
                                                substrate: data.object.code,
                                                property: [],
                                                relation: [{
                                                    substrate: data.allowMultipleValues,
                                                    property: data.parentBlock,
                                                    relation: []
                                                }]
                                            })
                                       } else {
                                            state.post[`${data.root}_${data.axisName}`].push(data.object)
                                            item.property.push({
                                                substrate: '/',
                                                property: [],
                                                relation: [{
                                                    substrate: data.allowMultipleValues,
                                                    property: data.parentBlock,
                                                    relation: []
                                                }]
                                            })
                                       }
                                    } else {
                                        for(let i =0; i< item.property.length; ++i) {
                                            for(let type of item.property[i].relation) {
                                                if(type.property === data.parentBlock) {
                                                    isExists = true
                                                    count = i
                                                    break
                                               }
                                           }
                                        }

                                        if(isExists) {
                                            if(!isEmpty(data.object.code)) {
                                                for(let key in state.post) {
                                                    const id = key.split('_')[0]
                                                    if(data.object.code === id) {
                                                        if(isEmpty(state.post.axis)) {
                                                          state.post.axis = []
                                                        }

                                                        state.post.axis.push({
                                                            id: `${data.root}_${data.axisName}`,
                                                            data: data.object
                                                        })
                                                    }
                                                }
                                            }

                                            if(item.property[count].substrate !== '/') {
                                                state.post[`${data.root}_${data.axisName}`].splice(count, 1)
                                            }

                                            state.post[`${data.root}_${data.axisName}`].push(data.object)

                                            if(item.property[count].substrate !== '/') {
                                                item.property.splice(count, 1)
                                            }

                                            item.property.push({
                                                substrate: data.object.code,
                                                property: [],
                                                relation: [{
                                                    substrate: data.allowMultipleValues,
                                                    property: data.parentBlock,
                                                    relation: []
                                               }]
                                           })
                                        } else {
                                            let isCodeInObject = false
                                            let keyInObject = ''

                                            if(!isEmpty(data.object.code)) {
                                                for(let key in state.post) {
                                                    const id = key.split('_')[0]
                                                    if(data.object.code === id) {
                                                        isCodeInObject = true
                                                        keyInObject = key
                                                    }
                                                }

                                                if(isCodeInObject) {
                                                    if(isEmpty(state.post[keyInObject].axis)) {
                                                        state.post[keyInObject].axis = []
                                                    }

                                                    state.post[keyInObject].axis.push({
                                                        id: `${data.root}_${data.axisName}`,
                                                        data: data.object
                                                    })
                                                } else {
                                                    state.post[`${data.root}_${data.axisName}`].push(data.object)
                                                }

                                                item.property.push({
                                                    substrate: data.object.code,
                                                    property: [],
                                                    relation: [{
                                                        substrate: data.allowMultipleValues,
                                                        property: data.parentBlock,
                                                        relation: []
                                                    }]
                                                })
                                            } else {
                                                state.post[`${data.root}_${data.axisName}`].push(data.object)
                                                item.property.push({
                                                    substrate: '/',
                                                    property: [],
                                                    relation: [{
                                                        substrate: data.allowMultipleValues,
                                                        property: data.parentBlock,
                                                        relation: []
                                                    }]
                                                })
                                            }
                                        }
                                    }
                                } else if(data.allowMultipleValues === "NotAllowed") {
                                    count = 0
                                    if(isEmpty(item.property)) {
                                        state.post[`${data.root}_${data.axisName}`].push(data.object)

                                        if(data.object.code || data.object.isUnspecified) {
                                            item.property.push({
                                                substrate: data.object.code,
                                                property: [],
                                                relation: [{
                                                    substrate: data.allowMultipleValues,
                                                    property: data.axisName,
                                                    relation: []
                                                }]
                                            })
                                        } else {
                                            item.property.push({
                                                substrate: '/',
                                                property: [],
                                                relation: [{
                                                    substrate: data.allowMultipleValues,
                                                    property: data.axisName,
                                                    relation: []
                                                }]
                                            })
                                        }
                                    } else {
                                        for(let i = 0; i< item.property.length; ++i) {
                                            for(let relation of item.property[i].relation) {
                                                if(relation.property === data.axisName) {
                                                    isExists = true
                                                    count = i
                                                    break
                                                }
                                            }

                                            if(isExists) {
                                                break
                                            }
                                        }

                                        if(isExists) {
                                            if(!isEmpty(state.post[`${data.root}_${data.axisName}`])) {
                                                state.post[`${data.root}_${data.axisName}`].pop()
                                            }

                                            state.post[`${data.root}_${data.axisName}`].push(data.object)

                                            if(data.object.code || data.object.isUnspecified) {
                                                item.property.splice(count, 1, {
                                                    substrate: data.object.code,
                                                    property: [],
                                                    relation: [{
                                                        substrate: data.allowMultipleValues,
                                                        property: data.axisName,
                                                        relation: []
                                                    }]
                                                })
                                            } else {
                                                item.property.splice(count, 1, {
                                                    substrate: '/',
                                                    property: [],
                                                    relation: [{
                                                        substrate: data.allowMultipleValues,
                                                        property: data.axisName,
                                                        relation: []
                                                    }]
                                                })
                                            }

                                        } else {
                                            item.property.push({
                                                substrate: data.object.code,
                                                property: [],
                                                relation: [{
                                                    substrate: data.allowMultipleValues,
                                                    property: data.axisName,
                                                    relation: []
                                                }]
                                            })

                                            state.post[`${data.root}_${data.axisName}`].push(data.object)
                                        }
                                   }



                               } else {
                                    const isInclude = state.post[`${data.root}_${data.axisName}`].some(item => item.code === data.object.code)

                                    if(!isInclude) {
                                        state.post[`${data.root}_${data.axisName}`].push(data.object);
                                    }

                                    if(isEmpty(state.coordination[0].relation)) {
                                        if(!isInclude) {
                                            item.property.push({
                                                substrate: data.object.code,
                                                property: [],
                                                relation: []
                                            })
                                        }
                                    } else {
                                        if (state.coordination[0].relation[0].relation !== data.object.code) {
                                           item.property.push({
                                               substrate: data.object.code,
                                               property: [],
                                               relation: []
                                           })
                                       }
                                   }
                               }
                           } else {
                                // data.object.isBlock ?
                                // console.log('F################# не знаю что такое ########################',item.substrate, data.root, data, item)
                            }
                        }
                    }
                }

                state.coordination = [...state.coordination]
                state.post = {
                    ...state.post
                }

                cb()
                return state
            }

            cb()
            return state
        }
    }
  },'@coordination'
);

