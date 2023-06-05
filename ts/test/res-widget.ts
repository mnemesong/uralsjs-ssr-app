import { Res } from "./res-model"

export const resWidgetFactory = (
    wClass: string
) => ({
    widget: (m: Res, id: string, d: unknown) => `
<li id="${id}" class='${wClass}-li'>${m.name}</li>`,
    css: `
.${wClass}-li {font-color: #777;}`,
})