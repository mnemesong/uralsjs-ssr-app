import { ReactiveStorage, Rec } from "uralsjs-reactive-storage";
import { Widget, regroup, ModelSet } from "uralsjs-app-abstractions";
import { parse } from "node-html-parser";
import { mapRecordVals } from "uralsjs-map-record";

const nodeSsrRenderer = <M, Id, D>(
    getElements: () => Rec<M, Id>[],
    getRootSelector: (el: Rec<M, Id>) => string,
    elWidget: Widget<M, D>,
    renderId: (id: Id) => string,
    inputHtml: string,
    deps: D
): string => {
    const renderEl = (el: Rec<M, Id>): string =>
        elWidget(el.model, renderId(el.id), deps);
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

export const ssrApp = <Keys extends string | number, Deps>(
    modelSets: Record<Keys, ModelSet<unknown, unknown, Deps>>, 
    html: string,
    deps: Deps
) => {
    const state = mapRecordVals(modelSets, (el) => el.stor);
    Object.keys(state)
        .forEach((i) => state[i].setReactiveFunc((recs) => {
            html = nodeSsrRenderer(
                () => recs,
                modelSets[i].rootSelector,
                modelSets[i].widget,
                (id) => modelSets[i].idTool.renderId(id),
                html,
                deps
            );
        }));
    Object.keys(state)
        .forEach((i) => state[i].reinit(modelSets[i].initData(deps)));
    return html;
}
