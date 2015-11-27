'use strict';

/**
 * @ngdoc function
 * @name graphApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the graphApp
 */
angular.module('graphApp')
  .controller('MainCtrl', function ($rootScope,$scope,$interval,spreadsheetServ) {
		$scope.data1=[
			  {car: "Mercedes A 160", year: 2011, price_usd: 7000, price_eur: 400},
			  {car: "Citroen C4 Coupe", year: 2012, price_usd: 8330, price_eur:230},
			  {car: "Audi A4 Avant", year: 2013, price_usd: 33900, price_eur: 800},
			  {car: "Opel Astra", year: 2014, price_usd: 5000, price_eur: 100},
			  {car: "BMW 320i Coupe", year: 2015, price_usd: 30500, price_eur: 500}
		];

		$scope.data2=[
			  {car: "Mercedes A 160", year: 2011, price_usd: 7000, condition: 'new'},
			  {car: "Citroen C4 Coupe", year: 2012, price_usd: 8330, condition: 'used'},
			  {car: "Audi A4 Avant", year: 2013, price_usd: 33900, condition: 'new'},
			  {car: "Opel Astra", year: 2014, price_usd: 5000, condition: 'used'},
			  {car: "BMW 320i Coupe", year: 2015, price_usd: 30500, condition: 'used'}
		];
		$scope.data3= [
			  ['2012', 100, 11, 12, 13, 15, 16],
			  ['2013', 11, 12, 12, 13, 15, 16],
			  ['2014', 12, 11, 12, 13, 15, 16],
			  ['2015', 13, 12, 12, 13, 15, 16],
			  ['2016', 14, 11, 12, 13, 15, 16]
		];
		
		
		$scope.optionsDefault={
					minSpareRows: 5,
					minSpareCol: 5,
					rowHeaders: true,
					colHeaders: true,
					typer:['text','numeric','numeric','numeric','numeric','numeric','numeric'],
					title:'New Project'
		};
		
		$scope.optionsDefault1={
					minSpareRows: 5,
					minSpareCol: 5,
					rowHeaders: true,
					colHeaders: true,
					typer:['text','text','numeric','numeric'],
					title:'New Project'
		};

	$scope.data4= [[5,5,6,5,6,4],[5,5,6,5,6,4],[5,5,6,5,6,4],[5,5,6,5,6,4]];
		
  }).factory('spreadsheetServ',function(){
	  var checkType=function(data){
		var typer=[];
		if(angular.isArray(data)){
			 for(var i=0;i<data.length;i++){
				 if(angular.isNumber(data[i])){
					 typer.push('numeric')
				 }else{
					  typer.push('text')
				 }  
			  }
		}else{
			for(var key in data){
				 if(angular.isNumber(data[key])){
					 typer.push('numeric')
				 }else{
					  typer.push('text')
				 }  
			}
		}
		  return typer
	  }
	  
	  
	  return{
		  checkType:checkType
	  }
	  
  });
		 