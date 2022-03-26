import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { focusDirective } from './directives';
import { formatRelative } from 'date-fns';
import ElementPlus from 'element-plus';
import VueGoogleMaps from '@fawmi/vue-google-maps';
// import Datepicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css';

import './assets/scss/styles.scss';
import 'material-icons/iconfont/material-icons.css';
import 'element-plus/dist/index.css';



//price range
import HistogramSlider from 'vue-histogram-slider';
import 'vue-histogram-slider/dist/histogram-slider.css';


const app = createApp(App);

app.component(HistogramSlider.name, HistogramSlider);
app.config.productionTip = false;

app.config.globalProperties.$filters = {
  formatTime(time) {
    return formatRelative(new Date(time), new Date());
  },
};

app.directive('focus', focusDirective);

app.use(ElementPlus);
app.use(router);
app.use(store);
app.use(HistogramSlider);
// app.use(Datepicker);

app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBshrF2SW5c1FqFPoDUnBoIBpoQps7jU10',
  },
});


app.mount('#app');
