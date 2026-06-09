import { registerPlugin } from './manager.js';
import GridplannerComponent from '../components/gridplanner/GridPlannerHome.vue';

registerPlugin({
    id: 'gridplanner',
    name: 'Grid Planner',
    icon: 'grid',
    component: GridplannerComponent
});
