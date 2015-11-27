'use strict';

/**
 * @ngdoc directive
 * @name graphApp.directive:linechart
 * @description
 * # linechart
 */
angular.module('graphApp')
  .directive("linechart",function(bars,$interval){
		return {
			templateUrl:"../../views/bg.html",
			scope:{info:'=',
					options:'=',
					title:'@'
				  },
		    link:function(scope,el,attr){
				scope.keysLetter=[];
				scope.keysNumber=[];
				scope.varAx={};

				scope.xaxis=scope.options.xheader;
				scope.yaxis=scope.options.yheader;

				var xfun=scope.options.xfun;
				var yfun=scope.options.yfun;

				scope.data=scope.info;
	
				scope.varAx.y=scope.yaxis[Object.keys(scope.yaxis)[0]];
				scope.varAx.x=scope.xaxis[Object.keys(scope.xaxis)[0]];
				var bChart= new bars.createLine(el);
				scope.$watch('varAx',function(newValue,oldValue){
					bChart.draw(scope.data.filter(function(d){return d[scope.varAx.y]!==null;}),xfun(scope.varAx.y),yfun(scope.varAx.x));
				},true);
				scope.$watch('data',function(newValue,oldValue){
					bChart.draw(scope.data.filter(function(d){return d[scope.varAx.y]!==null;}),xfun(scope.varAx.y),yfun(scope.varAx.x));
				},true);


			}
		};
		
	});
