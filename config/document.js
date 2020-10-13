import "canvas";
import { JSDOM } from "jsdom";

const {document} = new JSDOM("<!DOCTYPE html>").window;

export default document;
