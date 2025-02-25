<template>
  <div class="w3-container w3-half">
    <div id="myChart" style="width:100%; max-width:600px; height:500px;"></div>
  </div>

</template>

<script>

export default {
  mounted() {

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  },
  methods: {
    drawChart() {
      const data = google.visualization.arrayToDataTable([
        ["Country", "Mhl"],
        ["China", 54.8],
        ["India", 48.6],
        ["United States", 44.4],
        ["Indonesia", 23.9],
        ["Pakistan", 14.5],
        ["Brazil", 13.6]
      ]);

      const options = {
        title: 'Wordwide Market Share',
        is3D: true,
      };

      const chart = new google.visualization.PieChart(document.getElementById('myChart'));
      chart.draw(data, options);
    }
  }
}
</script>