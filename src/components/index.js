import angular from 'angular';
import hello from './hello';
import dummy from './dummy';

export default angular.module('app.components', [
	hello.name,
	dummy.name
]);
