import { Res } from "./res-model";
export declare const resWidgetFactory: (wClass: string) => {
    widget: (m: Res, id: string, d: unknown) => string;
    css: string;
};
