import { createElement } from "./tbtk-create-element";

// CDNに公開したい場合は、windowオブジェクトの下にぶら下げる流儀の模様。
(<any>window).createElement = createElement;
