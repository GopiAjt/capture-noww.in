import { createApp } from "vue";
import PrimeVue from 'primevue/config';
import App from './App.vue'
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';

import Button from 'primevue/button';
import Password from 'primevue/password';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import FocusTrap from 'primevue/focustrap';


const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
    }
});

app.directive('focustrap', FocusTrap);

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Password', Password);
app.component('Dialog', Dialog);
app.component('FloatLabel', FloatLabel);
app.component('Tabs', Tabs);
app.component('TabList', TabList);
app.component('Tab', Tab);
app.component('TabPanels', TabPanels);
app.component('TabPanel', TabPanel);


app.mount("#app");