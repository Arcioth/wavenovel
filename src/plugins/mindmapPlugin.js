import { registerPlugin } from './manager.js';
import MindmapComponent from '../components/mindmap/MindMapHome.vue';

registerPlugin({
    id: 'mindmap',
    name: 'Mindmap',
    icon: 'share-2',
    component: MindmapComponent
});
