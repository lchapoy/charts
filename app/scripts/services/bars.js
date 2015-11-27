'use strict';

/**
 * @ngdoc service
 * @name graphApp.bars
 * @description
 * # bars
 * Provider in the graphApp.
 */
angular.module('graphApp')
  
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
			  
			
				this.draw=function(ref,xVar,yVar){
					if(angular.isString(ref)){
						d3.csv(ref, type, render);
					}else{
						render(ref,xVar,yVar);
					}
				};

				
		  };
		  
		  var CreateLineSvg=function(el){

			   var svg = d3.select(el.find('.col-xs-10')[0]).append("svg")
				.attr("width",  outerWidth)
				.attr("height", outerHeight);
			  var g = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			   var path = g.append("path")
				.attr("class", "chart-line");

			  var xAxisG = g.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + innerHeight + ")");
			  var xAxisLabel = xAxisG.append("text")
				.style("text-anchor", "middle")
				.attr("x", innerWidth / 2)
				.attr("y", xAxisLabelOffset)
				.attr("class", "label");

			  var yAxisG = g.append("g")
				.attr("class", "y axis");
		  
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
				
				
				d3.extent(data, yFun);
				var limits=d3.extent(data, yFun);
				limits[0]--;
				limits[1]++;
				yScale.domain(limits);
			
				xAxisG.call(xAxis);
				yAxisG.call(yAxis);

				path.transition().duration(1000).ease("linear").attr("d", line(data)).sort();
				
				xAxisG.selectAll('text')
				.attr("transform", "rotate(45)" )	
				.attr("x",40);
				
			  };
			  
				this.draw=function(ref,xVar,yVar){
					if(angular.isString(ref)){
						d3.csv(ref, type, render);
					}else{
						render(ref,xVar,yVar);
					}
				};
				
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
			  
			var arc = d3.svg.arc()   
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

			  
			var legendMar=340;
			var legend = svg.append("g")
				.attr("class", "legend")
				.attr("transform", "translate(" +legendMar+",30)")
				.style("font-size", "14px")
				.call(d3.legend)
			this.render=function render(data,yFun,keys){

				legend.remove();

				pie.value(yFun); 
				
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

			  };
			  
				function arcTween(a) {
				  var i = d3.interpolate(this._current, a);
				  this._current = i(0);
				  return function(t) {
					return arc(i(t));
				  };
				}

		  };
		  
			return{
				createBars:CreateBarsSvg,
				createLine:CreateLineSvg,
				createPie:CreatePieSvg,
			};

			
		};
	});