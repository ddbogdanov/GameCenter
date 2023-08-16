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
import OverlayPanel from 'primevue/overlaypanel';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Tooltip from 'primevue/tooltip';
import Sidebar from 'primevue/sidebar';
import ScrollPanel from 'primevue/scrollpanel';
import DynamicDialog from 'primevue/dynamicdialog';
import DialogService from 'primevue/dialogservice';
import ProgressSpinner from 'primevue/progressspinner';
import Skeleton from 'primevue/skeleton';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Tag from 'primevue/tag';
import Ripple from 'primevue/ripple';
import InputMask from 'primevue/inputmask';
import ColorPicker from 'primevue/colorpicker';
import Fieldset from 'primevue/fieldset';
import InputNumber from 'primevue/inputnumber';
import Chart from 'primevue/chart';
import ProgressBar from 'primevue/progressbar';

const app = createApp(App)

app.config.globalProperties.$avatarUrl = 'https://api.dicebear.com/6.x/adventurer/svg?'

app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.use(DialogService)

app.component('p-input-text', InputText)
app.component('p-button', Button)
app.component('p-table', DataTable)
app.component('p-column', Column)
app.component('p-column-group', ColumnGroup)
app.component('p-row', Row)
app.component('p-card', Card)
app.component('p-divider', Divider)
app.component('p-toast', Toast)
app.component('p-overlay-panel', OverlayPanel) 
app.component('p-avatar', Avatar)
app.component('p-avatar-group', AvatarGroup)
app.component('p-sidebar', Sidebar)
app.component('p-scroll-panel', ScrollPanel)
app.component('p-dynamic-dialog', DynamicDialog)
app.component('p-progress-spinner', ProgressSpinner)
app.component('p-skeleton', Skeleton)
app.component('p-tab-panel', TabPanel)
app.component('p-tab-view', TabView)
app.component('p-tag', Tag)
app.component('p-input-mask', InputMask)
app.component('p-color-picker', ColorPicker)
app.component('p-fieldset', Fieldset)
app.component('p-input-number', InputNumber)
app.component('p-chart', Chart)
app.component('p-progress-bar', ProgressBar)

app.directive('tooltip', Tooltip)
app.directive('ripple', Ripple)

app.mount('#app')
