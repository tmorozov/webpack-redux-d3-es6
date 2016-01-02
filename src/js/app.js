import mainView from "./view/main";
import configureStore from "./store/store";
import {loadMapData} from "./actions";


function render() {
    let geoData = store.getState().geoData;
    if(geoData.isValid) {
        mainView.render(geoData.world);
    }
}

const store = configureStore();
store.subscribe(render);


store.dispatch(loadMapData());