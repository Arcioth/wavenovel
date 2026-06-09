import { registerPlugin } from './manager.js';
import PlanningBoardComponent from '../components/planningboard/PlanningBoardMenu.vue';

registerPlugin({
    id: 'planningboard',
    name: 'Planning Board',
    icon: 'trello',
    component: PlanningBoardComponent
});
