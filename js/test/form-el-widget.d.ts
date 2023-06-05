import { FormEl } from "./form-el-model";
export type FormElWidgetDep = {
    getHelloMsg: () => string;
};
export declare const formElWidget: (m: FormEl, id: string, d: FormElWidgetDep) => string;
