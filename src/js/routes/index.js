import { createRouter } from "../core/core";
import Home from "./Home";
import Profile from "./Profile";

export default createRouter([
    { path: "#/", component: Home },
    { path: "#/profile", component: Profile },
]);
