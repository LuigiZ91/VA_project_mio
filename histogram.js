
  var refVector=[];
  var datVector=[];
  var referenceSymmetry;
  var referenceSmoothness;

  var div = d3.select("#svg4").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


  var symmetryLine = []
  var smoothnessLine = []

  var margin4 = {top: 20, right: 20, bottom: 30, left: 40},
      width4 = 640 - margin4.left - margin4.right,
      height4 = 480 - margin4.top - margin4.bottom;


  var svg4 = d3.select("body").select("#svg4").append("svg")
    .attr("width", width4 + margin4.left + margin4.right)
    .attr("height", height4 + margin4.top + margin4.bottom)
  .append("g")
    .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

    var textX = svg4.append("text")
      //.attr("class", "label")
      .attr("x", width4-70)
      .attr("y", height4-10)
      .style("text-anchor", "start")
      .text("removed attribute");
    var textY = svg4.append("text")
      .attr("transform", "rotate(-90)")
      //.attr("class", "label")
      .attr("x", -8)
      .attr("y", +15)
      .style("text-anchor", "start")
      .text("ratio");


    var x4 = d3.scaleOrdinal();

    var y4 = d3.scaleLinear()
        .range([height4, 0]);

    y4.domain([0.85, 1.06]);

    var xAxis4 = d3.axisBottom(x4);

    var yAxis4 = d3.axisLeft(y4);

    x4.range([0,width4]);

    svg4.append("g")
        .attr("class", "x axis")
        .attr("id","x4")
        .attr("transform", "translate(0," + height4 + ")")
        .call(xAxis4)

    svg4.append("g")
        .attr("class", "y axis")
        .attr("id","y4")
        .call(yAxis4)

        // Define the div for the tooltip
    var divBox = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

  var margin3 = {top: 20, right: 20, bottom: 30, left: 40},
      width3 = 640 - margin3.left - margin3.right,
      height3 = 480 - margin3.top - margin3.bottom; //450

  var x3 = d3.scaleOrdinal()
      .range([0,170,width3-130, width3])

  var y3 = d3.scaleLinear()
      .range([height3, 0]);

  var color3 = d3.scaleOrdinal(d3.schemeCategory10);

  var xAxis3 = d3.axisBottom(x3);

  var yAxis3 = d3.axisLeft(y3);

  x3.domain(["","Benign","Malignant",""]);
  y3.domain([0.08, 0.21]);

  var svg3 = d3.select("body").select("#svg3").append("svg")
      .attr("width", width3 + margin3.left + margin3.right)
      .attr("height", height3 + margin3.top + margin3.bottom)
      .append("g")
      .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

      svg3.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height3 + ")")
          .text("Prova" )
          .call(xAxis3);


      svg3.append("g")
          .attr("class", "y axis")
          .text("Prova" )
          .call(yAxis3)



  d3.tsv("data/wdbc.tsv", function(error, data3)
  {
    data3.forEach(function(d)
    {
      d.symmetry = +d.symmetry;
      d.smoothness = +d.smoothness;
    });
    referenceSymmetry = (d3.mean(data3.filter(d => d.diagnosis === "1"), d => d.symmetry))/(d3.mean(data3.filter(d => d.diagnosis === "0"), d => d.symmetry))
    referenceSmoothness = (d3.mean(data3.filter(d => d.diagnosis === "1"), d => d.smoothness))/(d3.mean(data3.filter(d => d.diagnosis === "0"), d => d.smoothness))

    createHistogram(data3)
  });


  function createHistogram(data3)
  {
    var meanSymmetryB = d3.mean(data3.filter(d => d.diagnosis === "0"), d => d.symmetry)
        meanSymmetryM = d3.mean(data3.filter(d => d.diagnosis === "1"), d => d.symmetry)
        meanSmothnessB = d3.mean(data3.filter(d => d.diagnosis === "0"), d => d.smoothness)
        meanSmothnessM = d3.mean(data3.filter(d => d.diagnosis === "1"), d => d.smoothness)

    var symmetryVector = [meanSymmetryB, meanSymmetryM]
        smoothnessVector = [meanSmothnessB, meanSmothnessM];



    var temp_S_M = svg3.append("g")
      temp_S_M.append("rect")
      .attr("id", "symmetryM")
      .attr("class", "bar")
      .attr("x", function(d) { return x3(1)-217; })
      .attr("width", 85)
      .attr("y",function(d) { return y3(symmetryVector[1]); })
      .attr("height",  function(d) { return height3 - y3(symmetryVector[1]); })
      .attr("fill","DarkSlateBlue")


      temp_S_M.append("text")
      .attr("id", "temp_S_M")
      .attr("x",  function(d) { return x3(1)-196; })
      .attr("y",function(d) { return y3(symmetryVector[1])-5; })
      .text(symmetryVector[1].toFixed(5))
      .attr("font-family", "sans-serif")
      .attr("font-size", "10px")

    var temp_Sm_M = svg3.append("g")
      temp_Sm_M.append("rect")
      .attr("id", "smoothnessM")
      .attr("class", "bar")
      .attr("x", function(d) { return x3(1)-127; })
      .attr("width", 85)
      .attr("y",function(d) { return y3(smoothnessVector[1]); })
      .attr("height",  function(d) { return height - y3(smoothnessVector[1]); })
      .attr("fill","DarkGoldenRod")

      temp_S_M.append("text")
      .attr("id", "temp_Sm_M")
      .attr("x",  function(d) { return x3(1)-100; })
      .attr("y",function(d) { return y3(smoothnessVector[1])-5; })
      .text(smoothnessVector[1].toFixed(5))
      .attr("font-family", "sans-serif")
      .attr("font-size", "10px")

    var temp_S_B = svg3.append("g")
      temp_S_B.append("rect")
      .attr("id", "symmetryB")
      .attr("class", "bar")
      .attr("x", function(d) { return (x3(0)+83); })
      .attr("width", 85)
      .attr("y",function(d) { return y3(symmetryVector[0]); })
      .attr("height",  function(d) { return height3 - y3(symmetryVector[0]); })
      .attr("fill","DarkSlateBlue")

      temp_S_M.append("text")
      .attr("id", "temp_S_B")
      .attr("x",  function(d) { return x3(0)+107; })
      .attr("y",function(d) { return y3(symmetryVector[0])-5; })
      .text(symmetryVector[0].toFixed(5))
      .attr("font-family", "sans-serif")
      .attr("font-size", "10px")

    var temp_Sm_B = svg3.append("g")
      temp_S_B.append("rect")
      .attr("id", "smoothnessB")
      .attr("class", "bar")
      .attr("x", function(d) { return (x3(0)+174); })
      .attr("width", 85)
      .attr("y",function(d) { return y3(smoothnessVector[0]); })
      .attr("height",  function(d) { return height3 - y3(smoothnessVector[0]); })
      .attr("fill","DarkGoldenRod")

      temp_S_M.append("text")
      .attr("id", "temp_Sm_B")
      .attr("x",  function(d) { return x3(0)+197; })
      .attr("y",function(d) { return y3(smoothnessVector[0])-5; })
      .text(smoothnessVector[0].toFixed(5))
      .attr("font-family", "sans-serif")
      .attr("font-size", "10px")

      var legend3 = svg3.append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });


      legend3.append("rect")
          .attr("x", width3 - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", "DarkGoldenRod");

      legend3.append("text")
          .attr("x", width3 - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text("Smoothness");

      legend3.append("rect")
          .attr("x", width3 - 18)
          .attr("y", 20)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", "DarkSlateBlue");

      legend3.append("text")
          .attr("x", width3 - 24)
          .attr("y", 30)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text("Symmetry");


  }

  function reloadBar(attribute)
  {
    d3.tsv("wdbc.tsv", function(error, dataNew)
    {
      d3.select("#symmetryM").remove();
      d3.select("#symmetryB").remove();
      d3.select("#smoothnessB").remove();
      d3.select("#smoothnessM").remove();
      d3.select("#temp_Sm_B").remove();
      d3.select("#temp_S_B").remove();
      d3.select("#temp_Sm_M").remove();
      d3.select("#temp_S_M").remove();
      //modificare i dati e richiamare funzione per creare barre.
        switch(attribute)
        {
          case "radius" :
            var meanRadius = d3.mean(dataNew, function(d) { return d.radius; })
            var temp_A = dataNew.filter(d => d.radius> meanRadius);
            var occor = 0;

            createHistogram(temp_A);
            var op = symmetryLine.filter(temp_A => (temp_A.attributo == attribute));
            if(op.length == 0)
            {

              var meanSymmetryB = d3.mean(temp_A.filter(d => d.diagnosis === "0"), d => d.symmetry)
                  meanSymmetryM = d3.mean(temp_A.filter(d => d.diagnosis === "1"), d => d.symmetry)
                  meanSmothnessB = d3.mean(temp_A.filter(d => d.diagnosis === "0"), d => d.smoothness)
                  meanSmothnessM = d3.mean(temp_A.filter(d => d.diagnosis === "1"), d => d.smoothness)

              var symmetryVector = [meanSymmetryB, meanSymmetryM]
                  smoothnessVector = [meanSmothnessB, meanSmothnessM];

                  symmetryLine.push({"attributo":attribute ,"value":meanSymmetryM/meanSymmetryB})
                  smoothnessLine.push({"attributo":attribute ,"value":meanSmothnessM/meanSmothnessB})
                  console.log("smoothnessLineRadius", smoothnessLine)

            }

            createChartline();
            break;
          case "perimeter" :
            var meanPerimeter = d3.mean(dataNew, function(d) { return d.perimeter; })
            var temp_A2 = dataNew.filter(d => d.perimeter> meanPerimeter);


            createHistogram(temp_A2);
            var op = symmetryLine.filter(temp_A2 => (temp_A2.attributo == attribute));
            if(op.length == 0)
            {

              var meanSymmetryB = d3.mean(temp_A2.filter(d => d.diagnosis === "0"), d => d.symmetry)
                  meanSymmetryM = d3.mean(temp_A2.filter(d => d.diagnosis === "1"), d => d.symmetry)
                  meanSmothnessB = d3.mean(temp_A2.filter(d => d.diagnosis === "0"), d => d.smoothness)
                  meanSmothnessM = d3.mean(temp_A2.filter(d => d.diagnosis === "1"), d => d.smoothness)

              var symmetryVector = [meanSymmetryB, meanSymmetryM]
                  smoothnessVector = [meanSmothnessB, meanSmothnessM];

                  symmetryLine.push({"attributo":attribute ,"value":meanSymmetryM/meanSymmetryB})
                  smoothnessLine.push({"attributo":attribute ,"value":meanSmothnessM/meanSmothnessB})
                  console.log("smoothnessLinePerimeter", smoothnessLine)
            }
            createChartline();
            break;
          case "texture" :
            var meanTexture = d3.mean(dataNew, function(d) { return d.texture; })
            var temp_A3 = dataNew.filter(d => d.texture> meanTexture);


            createHistogram(temp_A3);
            var op = symmetryLine.filter(temp_A3 => (temp_A3.attributo == attribute));
            if(op.length == 0)
            {

              var meanSymmetryB = d3.mean(temp_A3.filter(d => d.diagnosis === "0"), d => d.symmetry)
                  meanSymmetryM = d3.mean(temp_A3.filter(d => d.diagnosis === "1"), d => d.symmetry)
                  meanSmothnessB = d3.mean(temp_A3.filter(d => d.diagnosis === "0"), d => d.smoothness)
                  meanSmothnessM = d3.mean(temp_A3.filter(d => d.diagnosis === "1"), d => d.smoothness)

              var symmetryVector = [meanSymmetryB, meanSymmetryM]
                  smoothnessVector = [meanSmothnessB, meanSmothnessM];

                  symmetryLine.push({"attributo":attribute ,"value":meanSymmetryM/meanSymmetryB})
                  smoothnessLine.push({"attributo":attribute ,"value":meanSmothnessM/meanSmothnessB})
                  console.log("smoothnessLineTexture", smoothnessLine)
            }
            createChartline();
            break;
          case "compactness" :
            var meanCompactness = d3.mean(dataNew, function(d) { return d.compactness; })
            var temp_A4 = dataNew.filter(d => d.compactness> meanCompactness);


            createHistogram(temp_A4);
            var op = symmetryLine.filter(temp_A4 => (temp_A4.attributo == attribute));
            if(op.length == 0)
            {

              var meanSymmetryB = d3.mean(temp_A4.filter(d => d.diagnosis === "0"), d => d.symmetry)
                  meanSymmetryM = d3.mean(temp_A4.filter(d => d.diagnosis === "1"), d => d.symmetry)
                  meanSmothnessB = d3.mean(temp_A4.filter(d => d.diagnosis === "0"), d => d.smoothness)
                  meanSmothnessM = d3.mean(temp_A4.filter(d => d.diagnosis === "1"), d => d.smoothness)

              var symmetryVector = [meanSymmetryB, meanSymmetryM]
                  smoothnessVector = [meanSmothnessB, meanSmothnessM];

                  symmetryLine.push({"attributo":attribute ,"value":meanSymmetryM/meanSymmetryB})
                  smoothnessLine.push({"attributo":attribute ,"value":meanSmothnessM/meanSmothnessB})
                  console.log("smoothnessLineCompactness", smoothnessLine)
            }

            createChartline();
            break;
          case "concavity" :
            var meanConcavity = d3.mean(dataNew, function(d) { return d.concavity; })
            var temp_A5 = dataNew.filter(d => d.concavity> meanConcavity);


            createHistogram(temp_A5);
            var op = symmetryLine.filter(temp_A5 => (temp_A5.attributo == attribute));
            if(op.length == 0)
            {

              var meanSymmetryB = d3.mean(temp_A5.filter(d => d.diagnosis === "0"), d => d.symmetry)
                  meanSymmetryM = d3.mean(temp_A5.filter(d => d.diagnosis === "1"), d => d.symmetry)
                  meanSmothnessB = d3.mean(temp_A5.filter(d => d.diagnosis === "0"), d => d.smoothness)
                  meanSmothnessM = d3.mean(temp_A5.filter(d => d.diagnosis === "1"), d => d.smoothness)

              var symmetryVector = [meanSymmetryB, meanSymmetryM]
                  smoothnessVector = [meanSmothnessB, meanSmothnessM];

                  symmetryLine.push({"attributo":attribute ,"value":meanSymmetryM/meanSymmetryB})
                  smoothnessLine.push({"attributo":attribute ,"value":meanSmothnessM/meanSmothnessB})
                  console.log("smoothnessLineConcavity", smoothnessLine)
            }

            createChartline();
            break;

          //area  fractal_dimension   concave_points
          case "area" :
            var meanArea = d3.mean(dataNew, function(d) { return d.area; })
            var temp_A6 = dataNew.filter(d => d.area> meanArea);


            createHistogram(temp_A6);
            var op = symmetryLine.filter(temp_A6 => (temp_A6.attributo == attribute));
            if(op.length == 0)
            {

              var meanSymmetryB = d3.mean(temp_A6.filter(d => d.diagnosis === "0"), d => d.symmetry)
                  meanSymmetryM = d3.mean(temp_A6.filter(d => d.diagnosis === "1"), d => d.symmetry)
                  meanSmothnessB = d3.mean(temp_A6.filter(d => d.diagnosis === "0"), d => d.smoothness)
                  meanSmothnessM = d3.mean(temp_A6.filter(d => d.diagnosis === "1"), d => d.smoothness)

              var symmetryVector = [meanSymmetryB, meanSymmetryM]
                  smoothnessVector = [meanSmothnessB, meanSmothnessM];

                  symmetryLine.push({"attributo":attribute ,"value":meanSymmetryM/meanSymmetryB})
                  smoothnessLine.push({"attributo":attribute ,"value":meanSmothnessM/meanSmothnessB})
                  console.log("smoothnessLineArea", smoothnessLine)
            }

            createChartline();
            break;

          case "fractal_dim" :
            var meanFractal_dimension = d3.mean(dataNew, function(d) { return d.fractal_dimension; })
            var temp_A7 = dataNew.filter(d => d.fractal_dimension> meanFractal_dimension);


            createHistogram(temp_A7);
            var op = symmetryLine.filter(temp_A7 => (temp_A7.attributo == attribute));
            if(op.length == 0)
            {

              var meanSymmetryB = d3.mean(temp_A7.filter(d => d.diagnosis === "0"), d => d.symmetry)
                  meanSymmetryM = d3.mean(temp_A7.filter(d => d.diagnosis === "1"), d => d.symmetry)
                  meanSmothnessB = d3.mean(temp_A7.filter(d => d.diagnosis === "0"), d => d.smoothness)
                  meanSmothnessM = d3.mean(temp_A7.filter(d => d.diagnosis === "1"), d => d.smoothness)

              var symmetryVector = [meanSymmetryB, meanSymmetryM]
                  smoothnessVector = [meanSmothnessB, meanSmothnessM];

                  symmetryLine.push({"attributo":attribute ,"value":meanSymmetryM/meanSymmetryB})
                  smoothnessLine.push({"attributo":attribute ,"value":meanSmothnessM/meanSmothnessB})
                  console.log("smoothnessLineFractal_dim", smoothnessLine)
            }

            createChartline();
            break;
          case "concave_pts" :
            var meanConcave_points = d3.mean(dataNew, function(d) { return d.concave_points; })
            var temp_A8 = dataNew.filter(d => d.concave_points> meanConcave_points);


            createHistogram(temp_A8);
            var op = symmetryLine.filter(temp_A8 => (temp_A8.attributo == attribute));
            if(op.length == 0)
            {

              var meanSymmetryB = d3.mean(temp_A8.filter(d => d.diagnosis === "0"), d => d.symmetry)
                  meanSymmetryM = d3.mean(temp_A8.filter(d => d.diagnosis === "1"), d => d.symmetry)
                  meanSmothnessB = d3.mean(temp_A8.filter(d => d.diagnosis === "0"), d => d.smoothness)
                  meanSmothnessM = d3.mean(temp_A8.filter(d => d.diagnosis === "1"), d => d.smoothness)

              var symmetryVector = [meanSymmetryB, meanSymmetryM]
                  smoothnessVector = [meanSmothnessB, meanSmothnessM];

                  symmetryLine.push({"attributo":attribute ,"value":meanSymmetryM/meanSymmetryB})
                  smoothnessLine.push({"attributo":attribute ,"value":meanSmothnessM/meanSmothnessB})
                  console.log("smoothnessLineConcave_pts", smoothnessLine)
            }

            createChartline();
            break;

          case "clear" :
            createHistogram(dataNew)
            d3.selectAll("#ratioLine").remove()
            d3.selectAll("#ratioLineSmothness").remove()
            d3.selectAll("#circle1").remove()
            d3.selectAll("#circle2").remove();



            i = 0;
            j = 0;

          for (var contatore = 0; contatore<symmetryLine.length; contatore ++)
          {
            symmetryLine.splice(contatore)
            smoothnessLine.splice(contatore)
            //console.log("DENTROOOOOO")
            console.log("smoothnessLine: ", smoothnessLine)
            //console.log("symmetryLine dopo clear: ", symmetryLine)
            d3.selectAll("#pathID").remove();

          }

          break;

        }
    });
  }

  function createChartline ()
  {
    d3.select("#x4").remove();
    d3.select("#y4").remove();


    var x4 = d3.scaleOrdinal();

    var y4 = d3.scaleLinear()
        .range([height4, 0]);

    y4.domain([0.85, 1.06]);

    var xAxis4 = d3.axisBottom(x4);
    var yAxis4 = d3.axisLeft(y4);

    x4.range([0,64,128,192,256,320,384,448,512,570]);
    x4.domain(symmetryLine.map(function(d) { return d.attributo; }));


    svg4.append("g")
        .attr("class", "x axis")
        .attr("id","x4")
        .attr("transform", "translate(0," + height4 + ")")
        .call(xAxis4)

    svg4.append("g")
        .attr("class", "y axis")
        .attr("id","y4")
        .call(yAxis4)


    svg4.selectAll(".dot")
        .data(symmetryLine)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("id", "circle1")
        .attr("fill", "DarkSlateBlue")
        .attr("stroke-width", 0)
        .attr("cx", function(d) { return (x4(d.attribute))-64 })
        .attr("cy", function(d) { return y4(d.value) })
        .attr("r", 4)
        .on("mouseover", function(d) {

          div.transition()
           .duration(70)
           .style("opacity", .9);
          div.html(d.value.toFixed(4) )
           .style("left", (d3.event.pageX -15) + "px")
           .style("top", (d3.event.pageY - 45) + "px")
           .style("height", 15 + "px");
          d3.select(this).
          attr("r",8);
       })
   .on("mouseout", function(d) {
       div.transition()
           .duration(200)
           .style("opacity", 0);
           d3.select(this).
           attr("r",4);
   });

   svg4.selectAll(".dot1")
       .data(smoothnessLine)
       .enter().append("circle") // Uses the enter().append() method
       .attr("class", "dot1") // Assign a class for styling
       .attr("id", "circle1")
       .attr("fill", "DarkGoldenRod")
       .attr("stroke-width", 0)
       .attr("cx", function(d) { return (x4(d.attribute))-64 })
       .attr("cy", function(d) { return y4(d.value) })
       .attr("r", 4)
       .on("mouseover", function(d) {

         div.transition()
          .duration(70)
          .style("opacity", .9);
         div.html(d.value.toFixed(4) )
          .style("left", (d3.event.pageX -15) + "px")
          .style("top", (d3.event.pageY - 45) + "px")
          .style("height", 15 + "px");
         d3.select(this).
         attr("r",8);
      })
   .on("mouseout", function(d) {
      div.transition()
          .duration(200)
          .style("opacity", 0);
          d3.select(this).
          attr("r",4);
   });

   svg4.append("path")
       .datum(smoothnessLine)
       .attr("fill", "none")
       .attr("id","pathID")
       .attr("stroke", "DarkGoldenRod")
       .attr("stroke-width", 1.5)
       .attr("d", d3.line()
         .x(function(d) { return x4(d.attributo) })
         .y(function(d) { return y4(d.value) })
         )

    svg4.append("path")
        .datum(symmetryLine)
        .attr("fill", "none")
        .attr("id","pathID")
        .attr("stroke", "DarkSlateBlue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return x4(d.attributo) })
          .y(function(d) { return y4(d.value) })
          )





          var temp4 = svg4.append("g")
                temp4.append("line")
                 .attr("id","avgRatio")
                 .attr("x1", 0)
                 .attr("y1", y4(referenceSymmetry))
                 .attr("x2", width)
                 .attr("y2", y4(referenceSymmetry))
                 .style("stroke","DarkSlateBlue")
                 .style("stroke-dasharray", ("5, 5"));

         var temp4 = svg4.append("g")
               temp4.append("line")
                .attr("id","avgRatio")
                .attr("x1", 0)
                .attr("y1", y4(referenceSmoothness))
                .attr("x2", width)
                .attr("y2", y4(referenceSmoothness))
                .style("stroke","DarkGoldenRod")
                .style("stroke-dasharray", ("5, 5"));

  }
