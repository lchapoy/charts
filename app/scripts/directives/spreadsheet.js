'use strict';

/**
 * @ngdoc directive
 * @name graphApp.directive:spreadsheet
 * @description
 * # spreadsheet
 */
angular.module('graphApp')
  .directive("spreadsheet",function($interval,spreadsheetServ){
	  return{
		  scope:{
				info:"=",
				defopt:"="
				},
		  templateUrl:"../../views/spreadsheet.html",
		  link:function(scope,element,attrs){
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
				scope.defopt.cells= function (row, col, prop) {
						if(col!=0)
							return {type:typer[col]};
				};
				scope.hot = new Handsontable(element.find("div")[0], scope.defopt);
				
				scope.hot.updateSettings({
					 afterSelectionEnd: function (e) {
					
							if(angular.equals({},validation)){
									scope.$apply();	
							}
							

					 },
					afterValidate: function (isValid,value,row,prop,source) {
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
						 scope.hot.alter('remove_row',0)
						}
						if (key === 'col_left') {
							console.log('col left')						
						}
						if (key === 'Graph') {
						  scope.hot.updateSettings({
							  colHeaders:scope.hot.getDataAtRow(0)
						  });
						 scope.hot.alter('remove_row',0)
						}
					  },
					  items: {
						"row_above": {
						  disabled: function () {
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
							
							return scope.hot.getSelected()[0] === 0
						  }
						},
						"remove_col": {
						  name: 'Remove this col',
						  disabled: function () {
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
	  
  })
