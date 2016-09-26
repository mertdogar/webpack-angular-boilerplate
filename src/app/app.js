import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Components from '../components';
import config from './app.config';
import '../style/app.css';

angular
    .module('myApp', [
        uiRouter,
        Components.name
    ])
    .config(config);

const MODULE_NAME = 'myApp';
export default MODULE_NAME;