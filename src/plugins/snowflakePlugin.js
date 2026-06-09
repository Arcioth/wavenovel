import { registerPlugin } from './manager.js';
import SnowflakeComponent from '../components/snowflake/SnowFlake.vue';

registerPlugin({
    id: 'snowflake',
    name: 'Snowflake',
    icon: 'snowflake',
    component: SnowflakeComponent
});
