const closebt = document.getElementById("close");
const openBtn = document.querySelector("#open");
const mainContent = document.querySelector(".main-content");
const sidebar = document.querySelector(".sidebar");
const barSide = document.querySelector(".barSide");
const dashboard = document.querySelector("#dashboard");
const project = document.querySelector("#project");
const user = document.querySelector("#user");
const setting = document.querySelector("#setting");
const acount = document.querySelector("#acount");
const logout = document.querySelector("#logout");
const capita = document.querySelector("#capita");
const logo = document.querySelector("#logo");

const bar = document.querySelector("#bar");
const mobilebar = document.querySelector(".mobile-bar");
const closebar = document.querySelector("#closebar");

bar.addEventListener("click", () => {
  mobilebar.style.left = "0";
});

closebar.addEventListener("click", () => {
  mobilebar.style.left = "-250px";
});

// closebt.addEventListener("click", () => {
//     sidebar.style.width = "100px";
//     barSide.style.width = "100px";
//     logo.style.width = "100%";
//     dashboard.style.display = "none";
//     project.style.display = "none";
//     user.style.display = "none";
//     setting.style.display = "none";
//     acount.style.display = "none";
//     logout.style.display = "none";
//     capita.style.display = "none";
//     closebt.style.display = "none";
//     openBtn.style.display = "inline-flex";
//     mainContent.classList.add("active");
//     console.log('hello');

// })

closebt.addEventListener("click", () => {
  sidebar.style.width = "100px";
  barSide.style.width = "100px";
  closebt.style.display = "none";
  openBtn.style.display = "inline-flex";
  logo.style.width = "100%";
  capita.style.display = "none";
  dashboard.style.display = "none";
  project.style.display = "none";
  user.style.display = "none";
  setting.style.display = "none";
  acount.style.display = "none";
  logout.style.display = "none";
  console.log("sagor");
});

openBtn.addEventListener("click", () => {
  sidebar.style.width = "250px";
  barSide.style.width = "250px";
  // mainContent.classList.remove("active");
  dashboard.style.display = "inline-flex";
  project.style.display = "inline-flex";
  user.style.display = "inline-flex";
  setting.style.display = "inline-flex";
  acount.style.display = "inline-flex";
  logout.style.display = "inline-flex";
  capita.style.display = "inline-flex";
  closebt.style.display = "inline-flex";
  openBtn.style.display = "none";
  logo.style.width = "45%";
});

//chert js

// mobile screen bars
am5.ready(function () {
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chartdiv");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([am5themes_Animated.new(root)]);

  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
    })
  );

  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set(
    "cursor",
    am5xy.XYCursor.new(root, {
      behavior: "zoomX",
    })
  );
  cursor.lineY.set("visible", false);

  var date = new Date();
  date.setHours(0, 0, 0, 0);
  var value = 100;

  function generateData() {
    value = Math.round(Math.random() * 10 - 5 + value);
    am5.time.add(date, "day", 1);
    return {
      date: date.getTime(),
      value: value,
    };
  }

  function generateDatas(count) {
    var data = [];
    for (var i = 0; i < count; ++i) {
      data.push(generateData());
    }
    return data;
  }

  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      maxDeviation: 0,
      baseInterval: {
        timeUnit: "day",
        count: 1,
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 60,
      }),
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}",
      }),
    })
  );

  series.columns.template.setAll({ strokeOpacity: 0 });

  // Add scrollbar
  // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
  chart.set(
    "scrollbarX",
    am5.Scrollbar.new(root, {
      orientation: "horizontal",
    })
  );

  var data = generateDatas(50);
  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);
}); // end am5.ready()
//chert js
