import { ReactiveStorage, Rec } from "uralsjs-reactive-storage";
import { Widget, regroup, ModelSet } from "uralsjs-app-abstractions";
import { parse } from "node-html-parser";
import { mapRecordVals } from "uralsjs-map-record";

const nodeSsrRenderer = <M, Id>(
    getElements: () => Rec<M, Id>[],
    getRootSelector: (el: Rec<M, Id>) => string,
    elWidget: Widget<M>,
    renderId: (id: Id) => string,
    inputHtml: string
): string => {
    const renderEl = (el: Rec<M, Id>): string =>
        elWidget(el.model, renderId(el.id));
    const grouped = regroup(getElements(), getRootSelector);
    const groupedWidgets: {sel: string, arr: string[]}[] = Object.keys(grouped)
        .map(k => ({sel: k, arr: grouped[k].map(el => renderEl(el))}));
    const html = parse(inputHtml);
    groupedWidgets.forEach((el) => {
        const selectedHtml = html.querySelector(el.sel).innerHTML = 
            el.arr.join("");
    });
    return html.toString();
}

export const ssrApp = <Keys extends string | number>(
    modelSets: Record<Keys, ModelSet<unknown, unknown>>, 
    html: string
) => {
    const state = mapRecordVals(modelSets, (el) => el.stor);
    Object.keys(state)
        .forEach((i) => state[i].setReactiveFunc((recs) => {
            html = nodeSsrRenderer(
                () => recs,
                modelSets[i].rootSelector,
                modelSets[i].widget,
                (id) => modelSets[i].idTool.renderId(id),
                html
            );
        }));
    Object.keys(state)
        .forEach((i) => state[i].reinit(modelSets[i].initData));
    return html;
}
