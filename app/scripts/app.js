'use strict';

/**
 * @ngdoc overview
 * @name graphApp
 * @description
 * # graphApp
 *
 * Main module of the application.
 */
angular
  .module('graphApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
	'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
	  
	  $stateProvider
		.state('index', {
		  url: "/",
		   reloadOnSearch: false, 
			views: {
				"viewA": {  
					templateUrl: 'views/main.html'
					
				},
				"viewB": {  
					templateUrl: 'views/barsgraph.html',
					controller: 'BarsgraphCtrl',
					controllerAs: 'barsGraph' 
				}
			}	
		})
		.state('line', {
		  url: "/lineChart",
		   reloadOnSearch: false, 
		  views: {
			"viewA": {  
					templateUrl: 'views/main.html'

				},
				"viewB": {  
					templateUrl: 'views/linechart.html',
					controller: 'BarsgraphCtrl',
					controllerAs: 'barsGraph' 
				}
		  }
		})
		.state('pie', {
		  url: "/pieChart",
		   reloadOnSearch: false, 
		  views: {
			  "viewA": {  
					templateUrl: 'views/main.html'
					
				},
				"viewB": {  
					templateUrl: 'views/piechart.html',
					controller: 'BarsgraphCtrl',
					controllerAs: 'barsGraph' 
				}
		  }
		})
	  
  /*  $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/barsGraph', {
        templateUrl: 'views/barsgraph.html',
        controller: 'BarsgraphCtrl',
        controllerAs: 'barsGraph'
      })
      .otherwise({
        redirectTo: '/'
      });*/
  });
