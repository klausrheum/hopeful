function moveChart() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('B11').activate();
  var sheet = spreadsheet.getActiveSheet();
  var charts = sheet.getCharts();
  var chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asLineChart()
  .addRange(spreadsheet.getRange('B6:B8'))
  .addRange(spreadsheet.getRange('F6:AC8'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(true)
  .setNumHeaders(1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('useFirstColumnAsDomain', true)
  .setOption('curveType', 'none')
  .setOption('interpolateNulls', false)
  .setOption('legend.position', 'top')
  .setOption('chartArea.left', '6.351%')
  .setOption('chartArea.top', '18.059%')
  .setOption('chartArea.width', '89.763%')
  .setOption('chartArea.height', '61.72500000000001%')
  .setOption('domainAxis.direction', 1)
  .setOption('title', '')
  .setOption('treatLabelsAsText', false)
  .setOption('legend.textStyle.fontName', 'Arial')
  .setOption('legend.textStyle.fontSize', 11)
  .setOption('legend.textStyle.color', '#434343')
  .setOption('titleTextStyle.fontName', 'Arial')
  .setOption('titleTextStyle.fontSize', 16)
  .setOption('titleTextStyle.color', '#000000')
  .setOption('titleTextStyle.bold', true)
  .setOption('width', 1054)
  .setPosition(12, 2, 1, 14)
  .build();
  sheet.insertChart(chart);
};
