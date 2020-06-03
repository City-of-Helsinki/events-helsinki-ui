import "canvas";
import { JSDOM } from "jsdom";

export default new JSDOM("<!DOCTYPE html>").window.document;
