import * as assert from "assert";
import { ssrApp } from "../src/index";
import { describe, it } from "mocha";
import { elModelSet, resModelSet, formElModelSet } from "./sets";

export const run = (html) => ssrApp({
        el: elModelSet,
        res: resModelSet,
        formEl: formElModelSet,
    },
    html,
    {getHelloMsg: () => "He-e-ll-o!"}
);

describe("test ssr", () => {
    it("test-ssr", () => {
        assert.equal(
`<body>
<ol>
<li id="el_0" style="font-weight: bold;">
    el1<ol>
<li id="res_0" class='res-li'>Петров</li>
<li id="res_1" class='res-li'>Сидоров</li></ol>
</li>
<li id="el_1" style="font-weight: normal;">
    el2<ol>
<li id="res_2" class='res-li'>Макарченко</li></ol>
</li></ol>
<div id="formContainer">
<div id="elForm" data-hello="He-e-ll-o!"><h4>Form</h4><input type='text' value=''></div></div>
</body>`, 
            run('<body>\n<ol></ol>\n<div id="formContainer"></div>\n</body>')
        );
    })
});