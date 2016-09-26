import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './view.html';
import controller_ from './controller';

let component_ = {
	restrict: 'E',
	scope: {},
	template: template,
	controller: controller_,
	controllerAs: 'controller',
	replace: true
};

let component = angular
	.module('dummy', [uiRouter])
	.config(($stateProvider) => {
	 	$stateProvider
	    	.state('dummy', {
	      		url: '/dummy',
	      		template: '<dummy></dummy>'
	    	});
	})
	.component('dummy', component_);

export default component;