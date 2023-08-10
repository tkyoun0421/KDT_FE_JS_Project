export class Component {
    constructor(payload = {}) {
        const { tagName = "div", state = {}, props = {} } = payload;
        this.el = document.createElement(tagName);
        this.state = state;
        this.props = props;
        this.render();
    }

    render() {}
}

function routeRender(routes) {
    if (!location.hash) {
        history.replaceState(null, "", "/#/");
    }

    const routerView = document.querySelector("router-view");
    const [hash, queryString = ""] = location.hash.split("?")[0];

    const currentRoute = routes.find((route) =>
        new RegExp(`${route.path}/?$`).test(hash)
    );
    routerView.innerHTML = "";
    routerView.append(new currentRoute.component().el);
}

export function createRouter(routes) {
    return function () {
        window.addEventListener("popstate", () => {
            routeRender(routes);
        });
        routeRender(routes);
    };
}
