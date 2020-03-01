
    var appoggio = [];
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 640 - margin.left - margin.right,
        height = 480 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var xAxis = d3.axisBottom(x);

    var yAxis = d3.axisLeft(y);

    var svg = d3.select("body").select("#svg").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var text = svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -38)
            .attr("y", 15)

            .style("text-anchor", "start")
            .text("Percentage");

        var margin2 = {top: 20, right: 20, bottom: 30, left: 40},
            width2 = 640 - margin2.left - margin2.right,
            height2 = 480 - margin2.top - margin2.bottom;

        var x2 = d3.scaleLinear()
          .range([0, width2]);

        var y2 = d3.scaleLinear()
          .range([height2, 0]);

        var color2 = d3.scaleOrdinal(d3.schemeCategory10);

        var xAxis2 = d3.axisBottom(x2);

        var yAxis2 = d3.axisLeft(y2);

        var svg2 = d3.select("body").select("#svg2").append("svg")
            .attr("width", width2 + margin2.left + margin2.right)
            .attr("height", height2 + margin2.top + margin2.bottom)
          .append("g")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

            svg2.append("g")
                .attr("class", "x axis")
                .attr("id","x2")
                .attr("transform", "translate(0," + height2 + ")")
                .call(xAxis2)
              .append("text")
                //.attr("class", "label")
                .attr("x", width2)
                .attr("y", -6);

                var textX = svg2.append("text")
                //.attr("class", "label")
                .attr("x", width2-50)
                .attr("y", height2-10)
                .style("text-anchor", "start")
                .text("Component 1");

            svg2.append("g")
                .attr("class", "y axis")
                .attr("id","y2")
                .call(yAxis2);


                var textY = svg2.append("text")
                    .attr("transform", "rotate(-90)")
                    //.attr("class", "label")
                    .attr("x", -50)
                    .attr("y", +15)
                    .style("text-anchor", "start")
                    .text("Component 2");



    d3.tsv("data/Varianza_componenti_PCA.tsv", function(error, data)
    {
      x.domain(data.map(function(d) { return d.Component; }));
      y.domain([0,1]);

    //d3.max(data, function(d) { return d.Variance; })

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(90)")
          .attr("y", -100)
          .attr("dy", ".71em")
          //style("text-anchor", "end")
          .text("Percentage");

      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.Component); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.Variance); })
          .attr("height", function(d) { return height - y(d.Variance); })
          .attr("fill","red")
          .attr("selected",false)
          .on("click", function(d,i)
          {
                if (d3.select(this).attr("selected") === "false")
                {
                  if (refVector.length<2)
                  {
                    //console.log("refVector.length: ", refVector.length)
              			d3.select(this)
              			.attr("selected",true)
              		  	.style("fill","green")
              		  	refVector.push(i);
              		  	datVector.push(d.Variance);
                      if (refVector.length == 2)
                      {
                        	d3.selectAll("#scatterDot").remove();
                          d3.select("#x2").remove();
                          d3.select("#y2").remove();

                        d3.tsv("data/Cancer_components2.tsv", function(error, data2)
                        {

                          data2.forEach(function(d)
                            {
                              d.Component1 = +d.Component1;
                              d.Component2 = +d.Component2;
                              d.Component3 = +d.Component3;
                              d.Component4 = +d.Component4;
                              d.Component5 = +d.Component5;
                              d.Component6 = +d.Component6;
                              d.Component7 = +d.Component7;
                              d.Component8 = +d.Component8;
                              d.Component9 = +d.Component9;
                              d.Component10 = +d.Component10;
                              d.Component11 = +d.Component11;
                              d.Component12 = +d.Component12;
                              d.Component13 = +d.Component13;
                              d.Component14 = +d.Component14;
                              d.Component15 = +d.Component15;
                            }
                          );

                          svg2.append("g")
                              .attr("class", "x axis")
                              .attr("id","x2")
                              .attr("transform", "translate(0," + height2 + ")")
                              .call(xAxis2)
                            .append("text")
                              .attr("class", "label")
                              .attr("x", width2)
                              .attr("y", -6)
                              .style("text-anchor", "end")
                              .text("Component 1");

                          svg2.append("g")
                              .attr("class", "y axis")
                              .attr("id","y2")
                              .call(yAxis2)
                            .append("text")
                              .attr("class", "label")
                              .attr("transform", "rotate(-90)")
                              .attr("y", 6)
                              .attr("dy", ".71em")
                              .style("text-anchor", "end")
                              .text("Component 2")

                          svg2.selectAll(".dot")
                              .data(data2)
                            .enter().append("circle")
                              .attr("class", "dot")
                              .attr("id","scatterDot")
                              .attr("r", 3.5);


                          switch(refVector[0])
                          {
                            case 0 :
                            x2.domain(d3.extent(data2, function(d) { return d.Component1; })).nice();
                            svg2.selectAll("circle")
                              .attr("cx", function(d) { return x2(d.Component1); });
                            break;
                            case 1 :
                            x2.domain(d3.extent(data2, function(d) { return d.Component2; })).nice();
                            svg2.selectAll("circle")
                              .attr("cx", function(d) { return x2(d.Component2); });
                            break;
                            case 2 :
                            x2.domain(d3.extent(data2, function(d) { return d.Component3; })).nice();
                            svg2.selectAll("circle")
                              .attr("cx", function(d) { return x2(d.Component3); });
                            break;
                            case 3 :
                            x2.domain(d3.extent(data2, function(d) { return d.Component4; })).nice();
                            svg2.selectAll("circle")
                              .attr("cx", function(d) { return x2(d.Component4); });
                            break;
                            case 4 :
                            x2.domain(d3.extent(data2, function(d) { return d.Component5; })).nice();
                            svg2.selectAll("circle")
                              .attr("cx", function(d) { return x2(d.Component5); });
                            break;
                            case 5 :
                            x2.domain(d3.extent(data2, function(d) { return d.Component6; })).nice();
                            svg2.selectAll("circle")
                              .attr("cx", function(d) { return x2(d.Component6); });
                            break;
                            case 6 :
                            x2.domain(d3.extent(data2, function(d) { return d.Component7; })).nice();
                            svg2.selectAll("circle")
                              .attr("cx", function(d) { return x2(d.Component7); });
                            break;
                            case 7 :
                            x2.domain(d3.extent(data2, function(d) { return d.Component8; })).nice();
                            svg2.selectAll("circle")
                              .attr("cx", function(d) { return x2(d.Component8); });
                            break;
                            case 8 :
                            x2.domain(d3.extent(data2, function(d) { return d.Component9; })).nice();
                            svg2.selectAll("circle")
                              .attr("cx", function(d) { return x2(d.Component9); });
                            break;
                            case 9 :
                            x2.domain(d3.extent(data2, function(d) { return d.Component10; })).nice();
                            svg2.selectAll("circle")
                              .attr("cx", function(d) { return x2(d.Component10); });
                            break;
                            case 10 :
                            x2.domain(d3.extent(data2, function(d) { return d.Component11; })).nice();
                            svg2.selectAll("circle")
                              .attr("cx", function(d) { return x2(d.Component11); });
                            break;
                            case 11 :
                            x2.domain(d3.extent(data2, function(d) { return d.Component12; })).nice();
                            svg2.selectAll("circle")
                              .attr("cx", function(d) { return x2(d.Component12); });
                            break;
                            case 12 :
                            x2.domain(d3.extent(data2, function(d) { return d.Component13; })).nice();
                            svg2.selectAll("circle")
                              .attr("cx", function(d) { return x2(d.Component13); });
                            break;
                            case 13 :
                            x2.domain(d3.extent(data2, function(d) { return d.Component14; })).nice();
                            svg2.selectAll("circle")
                              .attr("cx", function(d) { return x2(d.Component14); });
                            break;
                            case 14 :
                            x2.domain(d3.extent(data2, function(d) { return d.Component15; })).nice();
                            svg2.selectAll("circle")
                              .attr("cx", function(d) { return x2(d.Component15); });
                            break;
                          }

                          switch(refVector[1])
                          {
                            case 0 :
                            y2.domain(d3.extent(data2, function(d) { return d.Component1; })).nice();
                            svg2.selectAll("circle")
                            .attr("cy", function(d) { return y2(d.Component1); });
                            break;
                            case 1 :
                            y2.domain(d3.extent(data2, function(d) { return d.Component2; })).nice();
                            svg2.selectAll("circle")
                            .attr("cy", function(d) { return y2(d.Component2); });
                            break;
                            case 2 :
                            y2.domain(d3.extent(data2, function(d) { return d.Component3; })).nice();
                            svg2.selectAll("circle")
                            .attr("cy", function(d) { return y2(d.Component3); });
                            break;
                            case 3 :
                            y2.domain(d3.extent(data2, function(d) { return d.Component4; })).nice();
                            svg2.selectAll("circle")
                            .attr("cy", function(d) { return y2(d.Component4); });
                            break;
                            case 4 :
                            y2.domain(d3.extent(data2, function(d) { return d.Component5; })).nice();
                            svg2.selectAll("circle")
                            .attr("cy", function(d) { return y2(d.Component5); });
                            break;
                            case 5 :
                            y2.domain(d3.extent(data2, function(d) { return d.Component6; })).nice();
                            svg2.selectAll("circle")
                            .attr("cy", function(d) { return y2(d.Component6); });
                            break;
                            case 6 :
                            y2.domain(d3.extent(data2, function(d) { return d.Component7; })).nice();
                            svg2.selectAll("circle")
                            .attr("cy", function(d) { return y2(d.Component7); });
                            break;
                            case 7 :
                            y2.domain(d3.extent(data2, function(d) { return d.Component8; })).nice();
                            svg2.selectAll("circle")
                            .attr("cy", function(d) { return y2(d.Component8); });
                            break;
                            case 8 :
                            y2.domain(d3.extent(data2, function(d) { return d.Component9; })).nice();
                            svg2.selectAll("circle")
                            .attr("cy", function(d) { return y2(d.Component9); });
                            break;
                            case 9 :
                            y2.domain(d3.extent(data2, function(d) { return d.Component10; })).nice();
                            svg2.selectAll("circle")
                            .attr("cy", function(d) { return y2(d.Component10); });
                            break;
                            case 10 :
                            y2.domain(d3.extent(data2, function(d) { return d.Component11; })).nice();
                            svg2.selectAll("circle")
                            .attr("cy", function(d) { return y2(d.Component11); });
                            break;
                            case 11 :
                            y2.domain(d3.extent(data2, function(d) { return d.Component12; })).nice();
                            svg2.selectAll("circle")
                            .attr("cy", function(d) { return y2(d.Component12); });
                            break;
                            case 12 :
                            y2.domain(d3.extent(data2, function(d) { return d.Component13; })).nice();
                            svg2.selectAll("circle")
                            .attr("cy", function(d) { return y2(d.Component13); });
                            break;
                            case 13 :
                            y2.domain(d3.extent(data2, function(d) { return d.Component14; })).nice();
                            svg2.selectAll("circle")
                            .attr("cy", function(d) { return y2(d.Component14); });
                            break;
                            case 14 :
                            y2.domain(d3.extent(data2, function(d) { return d.Component15; })).nice();
                            svg2.selectAll("circle")
                            .attr("cy", function(d) { return y2(d.Component15); });
                            break;
                          }

                              svg2.selectAll("circle")
                              .style("fill", function(d) { return color2(d.Diagnosis); });

                          var legend2 = svg2.selectAll(".legend")
                              .data(color2.domain())
                            .enter().append("g")
                              .attr("class", "legend")
                              .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

                          legend2.append("rect")
                              .attr("x", width2 - 18)
                              .attr("width", 18)
                              .attr("height", 18)
                              .style("fill", color2);

                          legend2.append("text")
                              .attr("x", width2 - 24)
                              .attr("y", 9)
                              .attr("dy", ".35em")
                              .style("text-anchor", "end")
                              .text(function(d)
                                {
                                  if (d == 1)
                                    d = "Malignant"
                                  else
                                    d = "Benign"
                                    return d;
                                  });
                        });

                      }
                  }
                  else
                  {
                    d3.select(this)
                    .attr("selected",true)
                      .style("fill","gold")
                      refVector.push(i);
                      datVector.push(d.Variance);
                  }
            		}
            		else
            		{
                  if (refVector.length == 1)
                  {
                    d3.selectAll("#scatterDot").remove();
                  }
            		    d3.select(this)
            			.attr("selected",false)
            		  	.style("fill","red")
            		  	var index=refVector.indexOf(i)
            		  	refVector.splice(index,1);
            		  	datVector.splice(index,1);
            		}
          		updateSum(datVector)
          });



    });

    function updateSum(dat)
    {
      	var sum=d3.sum(dat)

      	d3.select("#sumLine").remove();
        d3.select("#sumText").remove();

      if (sum > 0)
      {
        var temp = svg.append("g")
              temp.append("line")
               .attr("id","sumLine")
               .attr("x1", 0)
               .attr("y1", y(sum))
               .attr("x2", width)
               .attr("y2", y(sum))
               .style("stroke","blue");

             temp.append('text')
               .attr("id","sumText")
               .style("fill", "blue")
               .attr("x", 150)
               .attr("y", (y(sum) - 10))
               .text("Total variance = " + parseFloat(sum * 100).toFixed(2) + "%")

      }

    }
