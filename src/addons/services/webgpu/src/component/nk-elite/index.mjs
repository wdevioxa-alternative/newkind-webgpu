import loader from './modules/newkind-universe/frontend/src/index.mjs'
import wasmBinary from './modules/newkind/wasmBinary.mjs'
import elite from "./modules/newkind/index.mjs";

export default async (self) => {
    let universe = await loader()
    await universe.dom(self.shadowRoot)
    universe.data.wasmBinary = wasmBinary
    let Module = await universe.init()
    elite(Module);
}