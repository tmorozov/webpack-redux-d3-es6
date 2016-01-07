import mainView from "./view/main";
import configureStore from "./store/store";
import {loadMapData} from "./actions/index";


function render() {
    "use strict";

    let geoData = store.getState().geoData;

    if(geoData.isValid) {
        //console.log(geoData)
        mainView.render(geoData.world);
    }
}

const store = configureStore();
store.subscribe(render);


store.dispatch(loadMapData());