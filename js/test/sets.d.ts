import { El } from "./el-model";
import { ModelSet } from "uralsjs-app-abstractions";
import { Res } from "./res-model";
import { FormEl } from "./form-el-model";
import { FormElWidgetDep } from "./form-el-widget";
export declare const elModelSet: ModelSet<El, number, null>;
export declare const resModelSet: ModelSet<Res, number, null>;
export declare const formElModelSet: ModelSet<FormEl, null, FormElWidgetDep>;
