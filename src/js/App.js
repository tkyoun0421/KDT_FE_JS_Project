import { Component } from "./core/core";

export default class App extends Component {
    constructor() {
        super({
            tagName: "h1",
        });
    }
    render() {
        this.el.textContent = "hello";
    }
}
