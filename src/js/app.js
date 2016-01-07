import mainView from "./view/main";
import configureStore from "./store/store";
import {loadMapData, loadLocations, loadLinks} from "./actions/index";


function render() {
    "use strict";

    let curState = store.getState();
    mainView.render(curState);
}

const store = configureStore();
store.subscribe(render);


store.dispatch(loadMapData());
store.dispatch(loadLocations());
store.dispatch(loadLinks());
