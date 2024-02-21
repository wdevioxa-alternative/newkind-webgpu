import components from '/services/webgpu/src/component/multi-switchrh/index.mjs'
import checklistCheckbox from '/services/webgpu/src/component/checklist-checkbox/index.mjs'
import webgpuAudio from '/services/webgpu/src/component/webgpu-audio/index.mjs'
import { store } from '/services/webgpu/src/this/index.mjs';

store.set('location', {
    pathname: '/services/webgpu/src'
});

export default 'API for DAPP'