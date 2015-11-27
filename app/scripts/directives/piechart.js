'use strict';

/**
 * @ngdoc directive
 * @name graphApp.directive:piechart
 * @description
 * # piechart
 */
angular.module('graphApp')
  .directive("piechart",function(bars,$interval){
		return {
			templateUrl:"../../views/bg.html",
			scope:{info:'=',
					options:'=',
					title:'@'
				  },
		    link:function(scope,el,attr){

				scope.varAx={};

				scope.xaxis=scope.options.xheader;
				scope.yaxis=scope.options.yheader;

				var xfun=scope.options.xfun;
				var yfun=scope.options.yfun;

				scope.data=scope.info;
	
				scope.varAx.y=scope.yaxis[Object.keys(scope.yaxis)[0]];
				scope.varAx.x=scope.xaxis[Object.keys(scope.xaxis)[0]];
				var pChart= new bars.createPie(el,140,scope.data,yfun(scope.varAx.x),scope.varAx.y);
				scope.$watch('varAx',function(newValue,oldValue){
					pChart.render(scope.data.filter(function(d){return d[scope.varAx.y]!==null;}),yfun(scope.varAx.x),scope.varAx.y);
				},true);
				scope.$watch('data',function(newValue,oldValue){
					pChart.render(scope.data.filter(function(d){return d[scope.varAx.y]!==null;}),yfun(scope.varAx.x),scope.varAx.y);
				},true);

				  


			}
	}
	});
