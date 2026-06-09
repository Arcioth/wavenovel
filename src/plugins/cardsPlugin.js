import { registerPlugin } from './manager.js';
import CardsComponent from '../components/cardsdatabase/CardsDatabaseHome.vue';

registerPlugin({
    id: 'cards',
    name: 'Cards',
    icon: 'database',
    component: CardsComponent
});
