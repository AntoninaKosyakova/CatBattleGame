export class Template {
    constructor(rootElement) {
        this.rootElement = rootElement;
    }

    field(name) {
        return this.rootElement.querySelector(`[data-element="${name}"]`);
    }
}
