import { ModelSet } from "uralsjs-app-abstractions";
export declare const ssrApp: <Keys extends string | number>(modelSets: Record<Keys, ModelSet<unknown, unknown>>, html: string) => string;
