import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './view.html';
import controller_ from './controller';

let component_ = {
	restrict: 'E',
	scope: {},
	template: template,
	controller: controller_,
	controllerAs: 'vm',
	replace: true
};

let component = angular
	.module('hello', [uiRouter])
	.config(($stateProvider) => {
	 	$stateProvider
	    	.state('hello', {
	      		url: '/',
	      		template: '<hello></hello>'
	    	});
	})
	.component('hello', component_);

export default component;