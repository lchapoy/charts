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
		$rootScope.data1=[
			  {car: "Mercedes A 160", year: 2011, price_usd: 7000, price_eur: 400},
			  {car: "Citroen C4 Coupe", year: 2012, price_usd: 8330, price_eur:230},
			  {car: "Audi A4 Avant", year: 2013, price_usd: 33900, price_eur: 800},
			  {car: "Opel Astra", year: 2014, price_usd: 5000, price_eur: 100},
			  {car: "BMW 320i Coupe", year: 2015, price_usd: 30500, price_eur: 500}
		];

		$rootScope.data2=[
			  {car: "Mercedes A 160", year: 2011, price_usd: 7000, condition: 'new'},
			  {car: "Citroen C4 Coupe", year: 2012, price_usd: 8330, condition: 'used'},
			  {car: "Audi A4 Avant", year: 2013, price_usd: 33900, condition: 'new'},
			  {car: "Opel Astra", year: 2014, price_usd: 5000, condition: 'used'},
			  {car: "BMW 320i Coupe", year: 2015, price_usd: 30500, condition: 'used'}
		];
		$rootScope.data3= [
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
		//chartService.newChart('data3',xheader,yheader,xFun,yFun);
		//chartService.newChart('data1',{ 'price usd': 'price_usd','price eur': 'price_eur'},{car:"car",year:"year"},xFun,yFun);
	 /* spreadsheetServ.xFun=function(val){
		  return	function (d){  return              xScale(d[val]); }
	  }
	  spreadsheetServ.yFun=function(val){
		  return	function (d){  return              yScale(d[val]); }
	  }
	  */
    

	$rootScope.data4= [[5,5,6,5,6,4],[5,5,6,5,6,4],[5,5,6,5,6,4],[5,5,6,5,6,4]];
		//$scope.list=spreadsheetServ.getAll;
		

		
	var cont=0;
	$scope.addSpread=function(){
		console.log('luis')
		spreadsheetServ.setData('New Project '+cont, [[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null]]);
		cont++;
	}	
  }).directive("spreadsheet",function($interval,spreadsheetServ){
	  return{
		  scope:{
				info:"=",
				defopt:"="
				},
		  templateUrl:"../../views/spreadsheet.html",
		  link:function(scope,element,attrs){
				
				//var options=spreadsheetServ.getOptions(scope.info);
			
				scope.defopt.data=scope.info;
				scope.valid=true;
				scope.hot={};
				var validation={} ,typer;
				angular.extend(scope.defopt,attrs); 
				scope.title=scope.defopt.title;
				if(angular.equals([],scope.defopt.typer))
					typer=spreadsheetServ.checkType(scope.defopt.data[0])
				else	
					typer=scope.defopt.typer
				scope.defopt.cells= function (row, col, prop) {//set the new renderer for every cell
						//console.log(row, col, prop)
						if(col!=0)
							return {type:typer[col]};
				};
				scope.hot = new Handsontable(element.find("div")[0], scope.defopt);
				
				//spreadsheetServ.setInstance(scope.info,scope.hot);
				scope.hot.updateSettings({
					 afterSelectionEnd: function (e) {
					
							if(angular.equals({},validation)){
									scope.$apply();	
							}
							
						// }

					 },
					afterValidate: function (isValid,value,row,prop,source) {
						console.log(isValid,value,row,prop,source)
						if(!isValid){
							validation[row+"_"+prop]=false;
						}else if(isValid&angular.isDefined(validation[row+"_"+prop])){
							delete validation[row+"_"+prop];
						}

						

					 },

					contextMenu: {
					  callback: function (key, options) {
						if (key === 'add_header') {
						 scope.hot.updateSettings({
							  colHeaders:scope.hot.getDataAtRow(0)
							  
						  });
						 console.log(  scope.hot.getColHeader(1))
						 scope.hot.alter('remove_row',0)
						}
						if (key === 'col_left') {
							console.log('col left')						
						}
						if (key === 'Graph') {
						  scope.hot.updateSettings({
							  colHeaders:scope.hot.getDataAtRow(0)
						  });
						// console.log(  hot.getData())
						 scope.hot.alter('remove_row',0)
						}
					  },
					  items: {
						"row_above": {
						  disabled: function () {
							// if first row, disable this option
							return scope.hot.getSelected()[0] === 0;
						  }
						},
						"row_below": {},
						"hsep1": "---------",
					    "col_left": {
						
						},
						"col_right": {},
						"hsep2": "---------",
						"remove_row": {
						  name: 'Remove this row',
						  disabled: function () {
							// if first row, disable this option
							
							return scope.hot.getSelected()[0] === 0
						  }
						},
						"remove_col": {
						  name: 'Remove this col',
						  disabled: function () {
							// if first col, disable this option
							return scope.hot.getSelected()[1] === 0
						  }
						},
						"hsep2": "---------",
						"add_header": {
							name: 'Add as Header',
							disabled:function(){
								console.log(scope.hot.getColHeader(1))
								return scope.hot.getColHeader(1)!='B'
							}
							
						}
					  }
					}
				  })
				scope.$watch('defopt.data',function(old,newVal){
					scope.hot.render();
				},true);
				
			}
		  
	  }
	  
  }).factory('spreadsheetServ',function(){
	  var options={};
	  var getAll=[],instances={};   
	  var typer={};
	  var optionsDefault={
					minSpareRows: 5,
					minSpareCol: 5,
					rowHeaders: true,
					colHeaders: true,
				    cells: function (row, col, prop) {//set the new renderer for every cell
						//console.log(row, col, prop)
						if(col!=0)
							return {type:typer[name][col]};
					},
					title:'New Project'
				};
				
	/*  var setHeadersType=function(name,datas){
			options[name].columns=[];
			//options[name].colHeaders=[];
			
			var type;
			for(var key in datas){
				if(angular.isNumber(datas[key]))
					type='numeric'
	
				else
					type='text'
				
				options[name].columns.push({type:type});
				// if(!angular.isArray(datas)){
					//options[name].colHeaders.push(key);
				// }
			}
			console.log(options[name].colHeaders)

		};*/
	  
	 /* var setData=function(name,newData){
		  
		 
		 if(angular.isUndefined(options[name])){
			options[name]={}
			angular.copy(optionsDefault,options[name])
			options[name].title=name;
			getAll.push(name);
			options[name].data=newData;
			checkType(newData[0])
			//setHeadersType(name,newData[1]);
		 }
		
	  }*/
	  
	  var checkType=function(data){
		typer=[];
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
	  
	/*
	  
	  var getInstance=function(name){
		  console.log(name,instances[name])
		  return instances[name];
	  }
	  var setInstance=function(name,value){
		   console.log(name,value)
		  instances[name]=value;
	  }
	  var getOptions=function(name){
		  return options[name];
	  }
	   var reset=function(name,element){
		 instances[name].destroy();
		 delete instances[name];
		 delete options[name];
		 console.log(instances)
	  }*/
	  
	  return{
		 /* getOptions:getOptions, 
		  setData:setData,
		  getInstance: getInstance,
		  setInstance: setInstance,
		  getAll:getAll,
		  destroy:reset*/
		  checkType:checkType
	  }
  }).directive('adder',function(){
	  return {
		  templateUrl:"../../views/adder.html",
		  link:function(){
			 
		  }
	  }
  })
  .directive('repeatspread',function(spreadsheetServ){
	  return {
	  template:"<div class='jumbotron' ng-repeat='item in source' name='{{item}}'><button name='remove' class='btn btn-danger glyphicon glyphicon-trash btn-sm' ></button><button name='clear' class='btn btn-success glyphicon glyphicon-file btn-sm'></button><input type='file' name='file' id='{{item}}' class='inputfile' /><label for='{{item}}' class='btn btn-primary glyphicon glyphicon-open-file btn-sm '></label><spreadsheet info='{{item}}'></spreadsheet></div>",
		  scope:{source:"="},
		  link:function(scope,element,attrs){
			 element.on('click',function(ev){
				 if(ev.target.name=='remove'){
					var el= angular.element(ev.target).parent();
					spreadsheetServ.destroy(el.attr('name'));
					el.remove(); 
				 }
				  if(ev.target.name=='clear'){
					var el= angular.element(ev.target).parent();
					spreadsheetServ.getInstance(el.attr('name')).clear();
				 }
			 })
			 
			 /* scope.remove=function(name){
				  console.log( element.find("div")[0])
				  spreadsheetServ.destroy(name);
				  element.find("div")[0].remove();
			  }*/
			  
		  }
	  }
  });
		 