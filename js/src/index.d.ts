import { ModelSet } from "uralsjs-app-abstractions";
export declare const ssrApp: <Keys extends string | number, Deps>(modelSets: Record<Keys, ModelSet<unknown, unknown, Deps>>, html: string, deps: Deps) => string;
