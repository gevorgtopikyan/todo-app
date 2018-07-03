import React, { Component } from "react";

import Main from "./Main";

import withRoot from "./withRoot";

class App extends Component {
    render() {
        return <Main />;
    }
}

export default withRoot(App);
