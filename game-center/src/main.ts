import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import InputText from "primevue/inputtext"
import Button from 'primevue/button'
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup'; 
import Row from 'primevue/row';
import Divider from 'primevue/divider';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(ElementPlus)

app.component('p-input-text', InputText)
app.component('p-button', Button)
app.component('p-table', DataTable)
app.component('p-column', Column)
app.component('p-column-group', ColumnGroup)
app.component('p-row', Row)
app.component('p-card', Card)
app.component('p-divider', Divider)
app.component('p-toast', Toast)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
