'use strict';

/**
 * @ngdoc function
 * @name graphApp.controller:BarsgraphCtrl
 * @description
 * # BarsgraphCtrl
 * Controller of the graphApp
 */
angular.module('graphApp')

  .controller('graphCtrl', function ($scope,$interval) {
		$scope.opt1={
				xheader:{'Kia':1,'Nissan':2,'Toyota':3,'Honda':4,'Mazda':5,'Ford':6},
				yheader:{'Year':0},
				
				xfun:function(val){ 
					return function(d){
						return d[val];
					};
				},
				yfun:function(val){ 		
					return function(d){
							return d[val];
					};
				}
			};
		$scope.opt2={
				xheader:{ 'price usd': 'price_usd','price eur': 'price_eur'},
				yheader:{car:"car",year:"year"},
				
				xfun:function(val){ 
					return function(d){
						return d[val];
					};
				},
				yfun:function(val){ 		
					return function(d){
							return d[val];
					};
				}
			};
	

  });
