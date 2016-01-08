import mainView from "./view/main";
import store from "./store/store";
import {loadMapData, loadLocations, loadLinks, loadCountryNames, loadCityNames, zoom} from "./actions/index";


function render() {
    "use strict";

    let curState = store.getState();
    mainView.render(curState);
}

//const store = configureStore();
store.subscribe(render);


store.dispatch(loadMapData());
store.dispatch(loadLocations());
store.dispatch(loadLinks());
store.dispatch(loadCountryNames());
store.dispatch(loadCityNames());
//store.dispatch(zoom(150, [-73.757222, 42.6525]));