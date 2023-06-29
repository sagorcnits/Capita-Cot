am5.ready(function() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("employed");
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Generate random data
    var value = 100;
    
    function generateChartData() {
      var chartData = [];
      var firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 1000);
      firstDate.setHours(0, 0, 0, 0);
    
      for (var i = 0; i < 50; i++) {
        var newDate = new Date(firstDate);
        newDate.setSeconds(newDate.getSeconds() + i);
    
        value += (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10;
    
        chartData.push({
          date: newDate.getTime(),
          value: value
        });
      }
      return chartData;
    }
    
    var data = generateChartData();
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      focusable: true,
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX:true
    }));
    
    var easing = am5.ease.linear;
    
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.5,
      groupData: false,
      extraMax:0.1, // this adds some space in front
      extraMin:-0.1,  // this removes some space form th beginning so that the line would not be cut off
      baseInterval: {
        timeUnit: "second",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 50
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));
    
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "{valueY}"
      })
    }));
    
    // tell that the last data item must create bullet
    data[data.length - 1].bullet = true;
    series.data.setAll(data);
    
    
    // Create animating bullet by adding two circles in a bullet container and
    // animating radius and opacity of one of them.
    series.bullets.push(function(root, series, dataItem) {  
      // only create sprite if bullet == true in data context
      if (dataItem.dataContext.bullet) {    
        var container = am5.Container.new(root, {});
        var circle0 = container.children.push(am5.Circle.new(root, {
          radius: 5,
          fill: am5.color(0xff0000)
        }));
        var circle1 = container.children.push(am5.Circle.new(root, {
          radius: 5,
          fill: am5.color(0xff0000)
        }));
    
        circle1.animate({
          key: "radius",
          to: 20,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity
        });
        circle1.animate({
          key: "opacity",
          to: 0,
          from: 1,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity
        });
    
        return am5.Bullet.new(root, {
          locationX:undefined,
          sprite: container
        })
      }
    })
    
    
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      xAxis: xAxis
    }));
    cursor.lineY.set("visible", false);
    
    
    // Update data every second
    setInterval(function () {
      addData();
    }, 1000)
    
    
    function addData() {
      var lastDataItem = series.dataItems[series.dataItems.length - 1];
    
      var lastValue = lastDataItem.get("valueY");
      var newValue = value + ((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
      var lastDate = new Date(lastDataItem.get("valueX"));
      var time = am5.time.add(new Date(lastDate), "second", 1).getTime();
      series.data.removeIndex(0);
      series.data.push({
        date: time,
        value: newValue
      })
    
      var newDataItem = series.dataItems[series.dataItems.length - 1];
      newDataItem.animate({
        key: "valueYWorking",
        to: newValue,
        from: lastValue,
        duration: 600,
        easing: easing
      });
    
      // use the bullet of last data item so that a new sprite is not created
      newDataItem.bullets = [];
      newDataItem.bullets[0] = lastDataItem.bullets[0];
      newDataItem.bullets[0].get("sprite").dataItem = newDataItem;
      // reset bullets
      lastDataItem.dataContext.bullet = false;
      lastDataItem.bullets = [];
    
    
      var animation = newDataItem.animate({
        key: "locationX",
        to: 0.5,
        from: -0.5,
        duration: 600
      });
      if (animation) {
        var tooltip = xAxis.get("tooltip");
        if (tooltip && !tooltip.isHidden()) {
          animation.events.on("stopped", function () {
            xAxis.updateTooltip();
          })
        }
      }
    }
    
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    
    }); // end am5.ready()


    // Salary start

 
 
    am5.ready(function() {

      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      var root = am5.Root.new("salary");
      
      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);
      
      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        pinchZoomX:true
      }));
      
      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none"
      }));
      cursor.lineY.set("visible", false);
      
      var colorSet = am5.ColorSet.new(root, {});
      
      // The data
      var data = [
        {
          year: "2014",
          value: 23.5,
          strokeSettings: {
            stroke: colorSet.getIndex(0)
          },
          fillSettings: {
            fill: colorSet.getIndex(0),
          },
          bulletSettings: {
            fill: colorSet.getIndex(0)
          }
        },
        {
          year: "2015",
          value: 26,
          bulletSettings: {
            fill: colorSet.getIndex(0)
          }
        },
        {
          year: "2016",
          value: 30,
          bulletSettings: {
            fill: colorSet.getIndex(0)
          }
        },
        {
          year: "2017",
          value: 20,
          bulletSettings: {
            fill: colorSet.getIndex(0)
          }
        },
        {
          year: "2018",
          value: 30,
          strokeSettings: {
            stroke: colorSet.getIndex(3)
          },
          fillSettings: {
            fill: colorSet.getIndex(3),
          },
          bulletSettings: {
            fill: colorSet.getIndex(3)
          }
        },
        {
          year: "2019",
          value: 30,
          bulletSettings: {
            fill: colorSet.getIndex(3)
          }
        },
        {
          year: "2020",
          value: 31,
          bulletSettings: {
            fill: colorSet.getIndex(3)
          }
        },
        {
          year: "2021",
          value: 34,
          strokeSettings: {
            stroke: colorSet.getIndex(6)
          },
          fillSettings: {
            fill: colorSet.getIndex(6),
          },
          bulletSettings: {
            fill: colorSet.getIndex(6)
          }
        },
        {
          year: "2022",
          value: 33,
          bulletSettings: {
            fill: colorSet.getIndex(6)
          }
        },
        {
          year: "2023",
          value: 34,
          bulletSettings: {
            fill: colorSet.getIndex(6)
          }
        },
        {
          year: "2024",
          value: 36,
          bulletSettings: {
            fill: colorSet.getIndex(6)
          }
        }
      ];
      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xRenderer = am5xy.AxisRendererX.new(root, {});
      xRenderer.grid.template.set("location", 0.5);
      xRenderer.labels.template.setAll({
        location: 0.5,
        multiLocation: 0.5
      });
      
      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      }));
      
      xAxis.data.setAll(data);
      
      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxPrecision: 0,
        renderer: am5xy.AxisRendererY.new(root, {})
      }));
      
      var series = chart.series.push(am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "year",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
          dy:-5
        })
      }));
      
      series.strokes.template.setAll({
        templateField: "strokeSettings",
        strokeWidth: 2
      });
      
      series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.5,
        templateField: "fillSettings"
      });
      
      
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            templateField: "bulletSettings",
            radius: 5
          })
        });
      });
      
      series.data.setAll(data);
      series.appear(1000);
      
      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal",
        marginBottom: 20
      }));
      
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
      
      }); // end am5.ready()

      //salary end

      //maps

      am5.ready(function() {

        // Create root and chart
        var root = am5.Root.new("sales"); 
        
        // Set themes
        root.setThemes([
          am5themes_Animated.new(root)
        ]);
        
        
        // ====================================
        // Create map
        // ====================================
        
        var map = root.container.children.push(
          am5map.MapChart.new(root, {
            panX: "none",
            projection: am5map.geoNaturalEarth1()
          })
        );
        
        // Create polygon series
        var polygonSeries = map.series.push(
          am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_continentsLow,
            exclude: ["antarctica"],
            fill: am5.color(0xbbbbbb)
          })
        );
        
        var pointSeries = map.series.push(
          am5map.MapPointSeries.new(root, {})
        );
        
        var colorSet = am5.ColorSet.new(root, {step:2});
        
        pointSeries.bullets.push(function(root, series, dataItem) {
          var value = dataItem.dataContext.value;
        
          var container = am5.Container.new(root, {});
          var color = colorSet.next();
          var radius = 15 + value / 20 * 20;
          var circle = container.children.push(am5.Circle.new(root, {
            radius: radius,
            fill: color,
            dy: -radius * 2
          }))
        
          var pole = container.children.push(am5.Line.new(root, {
            stroke: color,
            height: -40,
            strokeGradient: am5.LinearGradient.new(root, {
              stops:[
                { opacity: 1 },
                { opacity: 1 },
                { opacity: 0 }
              ]
            })
          }));
        
          var label = container.children.push(am5.Label.new(root, {
            text: value + "%",
            fill: am5.color(0xffffff),
            fontWeight: "400",
            centerX: am5.p50,
            centerY: am5.p50,
            dy: -radius * 2
          }))
        
          var titleLabel = container.children.push(am5.Label.new(root, {
            text: dataItem.dataContext.title,
            fill: color,
            fontWeight: "500",
            fontSize: "1em",
            centerY: am5.p50,
            dy: -radius * 2,
            dx: radius
          }))
         
          return am5.Bullet.new(root, {
            sprite: container
          });
        });
        
        
        
        
        // ====================================
        // Create pins
        // ====================================
        
        var data = [{
          "title": "United States",
          "latitude": 39.563353,
          "longitude": -99.316406,
          "width": 100,
          "height": 100,
          "value":12
        }, {
          "title": "European Union",
          "latitude": 50.896104,
          "longitude": 19.160156,
          "width": 50,
          "height": 50,
          "value":15
        }, {
          "title": "Asia",
          "latitude": 47.212106,
          "longitude": 103.183594,
          "width": 80,
          "height": 80,
          "value":8  
        }, {
          "title": "Africa",
          "latitude": 11.081385,
          "longitude": 21.621094,
          "width": 50,
          "height": 50,
          "value":5
        }];
        
        for (var i = 0; i < data.length; i++) {
          var d = data[i];
          pointSeries.data.push({
            geometry: { type: "Point", coordinates: [d.longitude, d.latitude] },
            title: d.title,
            value: d.value
          });
        }
        
        }); // end am5.ready()
      //maps