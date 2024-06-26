import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import Aura from '@primevue/themes/aura';


import Card from 'primevue/card';
import Button from 'primevue/button';
import 'primeicons/primeicons.css';                      
// import 'primevue/resources/themes/saga-blue/theme.css'; // choose a theme
// import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura
        
    }
});


app.component('Card', Card);
app.component('Button', Button);
app.mount('#app');