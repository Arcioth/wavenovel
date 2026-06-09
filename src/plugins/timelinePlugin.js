import { registerPlugin } from './manager.js';
import TimelineComponent from '../components/timeline/TimeLine.vue';

registerPlugin({
    id: 'timeline',
    name: 'Timeline',
    icon: 'clock',
    component: TimelineComponent
});
