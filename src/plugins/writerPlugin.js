import { registerPlugin } from './manager.js';
import WriterComponent from '../components/writer/WriterMenu.vue';

registerPlugin({
    id: 'writer',
    name: 'Writer',
    icon: 'edit',
    component: WriterComponent
});
