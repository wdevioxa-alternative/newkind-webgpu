import axios from "axios"
import {getCode} from "../../modules/Main/components/Main/Coder";
export function analyticsPluginMkb(userConfig) {
  return {
    name: 'mkb-plugin',
    bootstrap: ({ payload, config, instance }) => {
      // Do whatever on `bootstrap` event
    },
    pageStart: ({ payload, config, instance }) => {
      // Fire custom logic before analytics.page() calls
    },
    pageEnd: ({ payload, config, instance }) => {
      // Fire custom logic after analytics.page() calls
      // console.log(instance)
      // console.log(instance.user().userId)
      // console.log(instance.user().traits)
      let traits = {};
      const action = instance.user().traits.action
      switch (action) {
        case 'select_entity':
          traits.userAgent = instance.user().traits.userAgent;
          traits.deseaseCode = instance.user().traits.deseaseCode;
          traits.action = instance.user().traits.action;
          break
        case 'copy_postcoordination_code':
          traits.userAgent = instance.user().traits.userAgent;
          traits.deseaseCode = instance.user().traits.deseaseCode;
          traits.action = instance.user().traits.action;
          break
        case 'select_postcoordination_code':
          traits.userAgent = instance.user().traits.userAgent;
          traits.deseaseCode = instance.user().traits.deseaseCode;
          traits.action = instance.user().traits.action;
          break
        case 'select_entity_from_search_results':
          traits.userAgent = instance.user().traits.userAgent;
          traits.deseaseCode = instance.user().traits.deseaseCode;
          traits.action = instance.user().traits.action;
          break
        case 'coding_select_entity':
          traits.userAgent = instance.user().traits.userAgent;
          traits.deseaseCode = instance.user().traits.deseaseCode;
          traits.action = instance.user().traits.action;
          break
        case 'coding_click_code_entity':
          traits.userAgent = instance.user().traits.userAgent;
          traits.deseaseCode = instance.user().traits.deseaseCode;
          traits.action = instance.user().traits.action;
          break
        case 'coding_view_entity_browser_window':
          traits.userAgent = instance.user().traits.userAgent;
          traits.deseaseCode = instance.user().traits.deseaseCode;
          traits.action = instance.user().traits.action;
          break
        case 'coding_select_postcoordination_code':
          traits.userAgent = instance.user().traits.userAgent;
          traits.deseaseCode = instance.user().traits.deseaseCode;
          traits.action = instance.user().traits.action;
          break
        case 'coding_copy_postcoordination_code':
          traits.userAgent = instance.user().traits.userAgent;
          traits.deseaseCode = instance.user().traits.deseaseCode;
          traits.action = instance.user().traits.action;
          break
        case 'copying_decoding_result':
          traits.userAgent = instance.user().traits.userAgent;
          traits.deseaseCode = instance.user().traits.deseaseCode;
          traits.action = instance.user().traits.action;
          break
        case 'select_entity_from_decoding_result':
          traits.userAgent = instance.user().traits.userAgent;
          traits.deseaseCode = instance.user().traits.deseaseCode;
          traits.action = instance.user().traits.action;
          break
        default:
          console.log('не обрабатывается', action)
          break
      }

      // if(instance.user().traits.noDCode === true) {
      //   traits.userAgent = instance.user().traits.userAgent
      //   traits.type = instance.user().traits.type
      // } else {
      // }

      const analyticsObj = {
        mkbUser: {
          userId: instance.user().userId,
          traits: traits,
        },
        visitedPage: payload.properties
      }

      // TODO change http://172.17.0.2:9600 to public stat collector API
      if(window.location.origin !== 'http://localhost:3000') {
        axios.post('/mms/stats', analyticsObj)
      } else {
        console.log('Статистика: ', analyticsObj)
      }
      // axios.get('http://172.17.0.2:9600/metrics').then(data => console.log(data))
    },
    trackStart: ({ payload, config, instance }) => {
      // Fire custom logic before analytics.track() calls
    },
    trackEnd: ({ payload, config, instance }) => {
      // Fire custom logic after analytics.track() calls
    },
    // ... hook into other events
  }
}
