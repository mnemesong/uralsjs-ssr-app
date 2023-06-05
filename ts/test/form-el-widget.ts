import { FormEl } from "./form-el-model";

export type FormElWidgetDep = {
    getHelloMsg: () => string,
}

export const formElWidget = (
    m: FormEl,
    id: string,
    d: FormElWidgetDep
) => `
<div id="${id}" data-hello="${d.getHelloMsg()}"><h4>Form</h4><input type='text' value='${m.header}'></div>`