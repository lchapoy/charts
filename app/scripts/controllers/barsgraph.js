'use strict';

/**
 * @ngdoc function
 * @name graphApp.controller:BarsgraphCtrl
 * @description
 * # BarsgraphCtrl
 * Controller of the graphApp
 */
angular.module('graphApp')

  .controller('BarsgraphCtrl', function ($scope,$interval) {

		$scope.opt1={
				xheader:{'Kia':1,'Nissan':2,'Toyota':3,'Honda':4,'Mazda':5,'Ford':6},
				yheader:{'Year':0},
				
				xfun:function(val){ 
					return function(d){
						console.log(d[val])
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
						console.log(d[val])
						return d[val];
						
						
					};
				},
				yfun:function(val){ 		
					return function(d){
				
							return d[val];
						
						
					};
				}
			};
	

  })
  .provider('bars', function () {

		var outerWidth = 460;
		var outerHeight = 320;  
		var margin = { left: 40, top: 20, right: 50, bottom: 100 };
		var barPadding = 0.2;

		var xAxisLabelText = "X Axis ";
		var xAxisLabelOffset = 55;

		var innerWidth  = outerWidth  - margin.left - margin.right;
		var innerHeight = outerHeight - margin.top  - margin.bottom;
		var ticks=6;

		this.outerSize = function(width,height) {
			outerWidth = width;
			outerHeight = height;
		};
		
		this.margin = function(marObj,padding) {
			margin = marObj;
			barPadding = padding;
		};


		
	  this.$get = function() {
		  var CreateBarsSvg=function(el){
			  
			   var svg = d3.select(el.find('.col-xs-10')[0]).append("svg")
				.attr("width",  outerWidth)
				.attr("height", outerHeight);
			  var g = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			  var xAxisG = g.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + innerHeight + ")");
			  var xAxisLabel = xAxisG.append("text")
				.style("text-anchor", "middle")
				.attr("x", innerWidth / 2)
				.attr("y", xAxisLabelOffset)
				.attr("class", "label");
				//.text(xAxisLabelText);
			  var yAxisG = g.append("g")
				.attr("class", "y axis");
			  var colors=d3.scale.category10();
			  var xScale = d3.scale.ordinal().rangeBands([0, innerWidth], barPadding);
			  var yScale = d3.scale.linear().range([innerHeight, 0]);
		
			  var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
				.outerTickSize(0);         // Turn off the marks at the end of the axis.
				
			  var yAxis = d3.svg.axis().scale(yScale).orient("left")
				.ticks(ticks)                   // Use approximately 5 ticks marks.
				.tickFormat(d3.format("s")) // Use intelligent abbreviations, e.g. 5M for 5 Million
				.outerTickSize(0);          // Turn off the marks at the end of the axis.      // Turn off the marks at the end of the axis. 
			
			
			var  render=function render(data,xFun,yFun){
				
				xScale.domain(data.map( xFun).sort());
				var limits=d3.extent(data, yFun);
				limits[0]=limits[0]/Math.pow(2,(Math.log10(limits[1]+100)-Math.log10(limits[0])));
				yScale.domain(limits);
				colors.domain=xScale.domain();
				xAxisG.call(xAxis);
				yAxisG.call(yAxis);
				var bars = g.selectAll("rect").data(data);
				bars.enter().append("rect");
				 
				 
				
				bars
				  .transition().duration(1000).ease("linear")
				   .attr("width", xScale.rangeBand())
				  .attr("x",      function (d){  return              xScale(xFun(d)); })
				  .attr("y",      function (d){ return               yScale(yFun(d)); })
				  .attr("height", function (d){  return innerHeight - yScale(yFun(d)); })
				   .attr("fill",      function (d){ return colors(xFun(d)); });
				   
				bars.exit().remove();

				xAxisG.selectAll('text')
				.attr("transform", "rotate(45)" )	
				.attr("x",40);

			  };
			  

			  var type=function type(d){
				 /*
					Place something for csv
				 */
				return d;
			  };
			
				this.draw=function(ref,xVar,yVar){
					if(angular.isString(ref)){
						d3.csv(ref, type, render);
					}else{
						render(ref,xVar,yVar);
					}
				};
				
				/*this.options=function(){
					
				}*/
				
		  };
		  
		  var CreateLineSvg=function(el){
			  //var path={};
			   var svg = d3.select(el.find('.col-xs-10')[0]).append("svg")
				.attr("width",  outerWidth)
				.attr("height", outerHeight);
			  var g = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			 //for( var key in yheader){
			   var path = g.append("path")
				.attr("class", "chart-line");
			//}
			  var xAxisG = g.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + innerHeight + ")");
			  var xAxisLabel = xAxisG.append("text")
				.style("text-anchor", "middle")
				.attr("x", innerWidth / 2)
				.attr("y", xAxisLabelOffset)
				.attr("class", "label");
				//.text(xAxisLabelText);
			  var yAxisG = g.append("g")
				.attr("class", "y axis");
			  //var colors=d3.scale.category10();
			  
			  var xScale = d3.scale.ordinal().rangePoints([0, innerWidth]);
			  var yScale = d3.scale.linear().range([innerHeight, 0]);

			  var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
				.innerTickSize(-innerHeight)
				.outerTickSize(0)
				.ticks(5);
			  var yAxis = d3.svg.axis().scale(yScale).orient("left")
				.ticks(5)
				.innerTickSize(-innerWidth)
				.tickFormat(d3.format("s"))
				.outerTickSize(0);
			 

			var  render=function render(data,xFun,yFun){
				 data=data.sort();
				 xScale.domain(data.map( xFun));
				 var line = d3.svg.line()
				   .x(function(d) { return xScale(xFun(d)); })
				   .y(function(d) { return yScale(yFun(d)); });
				
				//xScale.domain(d3.extent(data, xFun));
				d3.extent(data, yFun);
				var limits=d3.extent(data, yFun);
				limits[0]--;
				limits[1]++;
				yScale.domain(limits);
				//console.log(xScale.range(),xScale.domain())
				xAxisG.call(xAxis);
				yAxisG.call(yAxis);

				path.transition().duration(1000).ease("linear").attr("d", line(data)).sort();
				
				xAxisG.selectAll('text')
				.attr("transform", "rotate(45)" )	
				.attr("x",40);
				
			  };
			  

			  var type=function type(d){
				 /*
					Place something for csv
				 */
				return d;
			  };
			
				this.draw=function(ref,xVar,yVar){
					if(angular.isString(ref)){
						d3.csv(ref, type, render);
					}else{
						render(ref,xVar,yVar);
					}
				};
				
				/*this.options=function(){
					
				}*/
				
		  };
		  
		  var CreatePieSvg=function(el,r,data,yFun,key){
			 
			var rad=r;
			var svg = d3.select(el.find('.col-xs-10')[0]).append("svg")
				.attr("width",  outerWidth)
				.attr("height", outerHeight);
			var marTop=margin.top+rad
			var marLeft=margin.left+rad
				
			var g = svg.append("g")
				.attr("transform", "translate(" + marLeft + "," + marTop+ ")");
				
			var color = d3.scale.category20();
			  
			var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
					.outerRadius(rad);
					
			var pie = d3.layout.pie().value(yFun).sort(null);
			
			var path = g.datum(data).selectAll("path")
			  .data(pie)
			  .enter().append("path")
				.attr("fill", function(d,i){ return color(i); })
				.attr("d", arc)
				.attr("data-legend", function(d){ return d.data[key]})
				.each(function(d){ this._current = d; })
				.attr("class","piechart");
				
			//arcs.append("path")
				
			  
			var legendMar=340;
			var legend = svg.append("g")
				.attr("class", "legend")
				.attr("transform", "translate(" +legendMar+",30)")
				.style("font-size", "14px")
				.call(d3.legend)
			this.render=function render(data,yFun,keys){
				 //data=data.sort();
				 // g.datum(data);
				legend.remove();
				console.log(keys)
				pie.value(yFun); // change the value function
				
				g.datum(data).selectAll("path").data(pie).attr("data-legend", function(d){return d.data[keys]}).transition().duration(1000).attrTween("d", arcTween)
				
				g.datum(data).selectAll("path")
				  .data(pie)
				  .enter()
				  .append("path")
					.attr("fill", function(d,i){ return color(i); })
					.attr("d", arc)
					.transition().duration(1000).attrTween("d", arcTween)
					.each(function(d){ this._current = d; });
					
				legend = svg.append("g")
				.attr("class", "legend")
				.attr("transform", "translate(" +legendMar+",30)")
				.style("font-size", "14px")
				.call(d3.legend);				
				
				 g.datum(data).selectAll("g.piechart")
					.data(pie).exit().remove();	
				
				
			
				
			
				/*arcs.datum(data).selectAll('text').data(pie).enter().append("text")                                  //add a label to each slice
						.attr("transform", function(d) {                    //set the label's origin to the center of the arc
						//we have to make sure to set these before calling arc.centroid
						console.log(arc.centroid(d))
						d.innerRadius = 0;
						d.outerRadius = r;
						return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
					})
					.attr("text-anchor", "middle")                          //center the text on it's origin
					.text(function(d, i) { return data[i][0]; });        //get the label from our original data array*/

			  };
			  
				function arcTween(a) {
				  var i = d3.interpolate(this._current, a);
				  this._current = i(0);
				  return function(t) {
					return arc(i(t));
				  };
				}
				
				
			  var type=function type(d){
				 /*
					Place something for csv
				 */
				return d;
			  };
			
			/*	this.draw=function(ref,xVar,yVar){
					if(angular.isString(ref)){
						d3.csv(ref, type, render);
					}else{
						render(ref,xVar,yVar);
					}
				};
				*/
				/*this.options=function(){
					
				}*/
				
		  };
		  
			return{
				createBars:CreateBarsSvg,
				createLine:CreateLineSvg,
				createPie:CreatePieSvg,
			};

		 

		 

					// let's assume that the UnicornLauncher constructor was also changed to
					// accept and use the useTinfoilShielding argument
			
		};
	}).directive("barchart",function(bars,$interval){
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
				//scope.data=[];
				//var opt=chartService.getOptions(scope.info);
				//console.log(opt);
				scope.xaxis=scope.options.xheader;
				scope.yaxis=scope.options.yheader;
				
				//console.log(scope.xaxis);
				//console.log(scope.yaxis);
				
				var xfun=scope.options.xfun;
				var yfun=scope.options.yfun;
				
				//if(scope.info.split(".")[1]!="csv")
					scope.data=scope.info;
				//else{
				//	scope.data=scope.info
				//}
				//console.log(scope.data)

				scope.varAx.y=scope.yaxis[Object.keys(scope.yaxis)[0]];
				scope.varAx.x=scope.xaxis[Object.keys(scope.xaxis)[0]];
				var bChart= new bars.createBars(el);
				scope.$watch('varAx',function(newValue,oldValue){
					bChart.draw(scope.data.filter(function(d){return d[scope.varAx.y]!==null;}),xfun(scope.varAx.y),yfun(scope.varAx.x));
				},true);
				scope.$watch('data',function(newValue,oldValue){
					bChart.draw(scope.data.filter(function(d){return d[scope.varAx.y]!==null;}),xfun(scope.varAx.y),yfun(scope.varAx.x));
				
				},true);


			}
		};
		
	}).directive("linechart",function(bars,$interval){
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
		
	}).directive("piechart",function(bars,$interval){
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
					//pChart(scope.data.filter(function(d){return d[scope.varAx.y]!==null;}),yfun(scope.varAx.x));
				},true);

				  


			}
	}
	});
