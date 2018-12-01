function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('Reports')
        .addItem("Export All Students", "ExportStudents")
        .addItem("Export Current Student", "export_pdf")
        .addToUi()
}

function rename(tmpName) {
    var ss = SpreadsheetApp.getActive()
    ss.setName(ss.getSheetByName('Individual Report').getRange('C3:C4').getDisplayValues().reverse().toString().replace(/,/g, "_"))
    createPdf(ss, 2);
}

function export_pdf() {
    var ss = SpreadsheetApp.getActive()
    var studentName = ss.getSheetByName('Individual Report').getRange('B4').getDisplayValues()
    //ss.setName(ss.getSheetByName('Individual Report').getRange('C3:C4').getDisplayValues().reverse().toString().replace(/,/g, "_"))
    createPdf(ss, 2, studentName);
}

//function createPdf(ss, sheetNum, studentName) {
//  if (studentName === undefined) {
//    studentName = "Student";
//  }
//  var sheets = ss.getSheets();
//  
//  // hide all the sheets we DON'T want in the export
//  sheets.forEach(function (s, i) {
//    if(i !== sheetNum) s.hideSheet()
//      });
//  
//  var url = DriveApp.Files.get(ss.getId())
//  .exportLinks['application/pdf'];
//  url = url + '&size=a4' + //paper size
//    '&portrait=false' + //orientation, false for landscape
//      '&fitw=true' + //fit to width, false for actual size
//        '&sheetnames=false&printtitle=false&pagenumbers=false' + //hide optional
//          '&gridlines=false' + //false = hide gridlines
//            '&fzr=false'; //do not repeat row headers (frozen rows) on each page
//  
//  var token = ScriptApp.getOAuthToken();
//  var fileName = ss.getName();
//  fileName = fileName.replace("Reportbook", studentName);
//  
//  var pdfCreated = false;
//  do {
//    
//    try {
//      
//      var response = UrlFetchApp.fetch(url, {
//        headers: {
//          'Authorization': 'Bearer ' + token
//        }
//      });
//      Logger.log(response.getResponseCode());
//      
//      DriveApp.createFile(response.getBlob()).setName(fileName);
//      pdfCreated = true;
//    } 
//    
//    catch (error) {
//      Logger.log(error);
//    }
//    
//  } while (! pdfCreated);
//  
//  
//  // unhide the sheets
//  sheets.forEach(function (s) {
//    s.showSheet();
//  })
//  
//}

function ExportStudents() {
  var ss = SpreadsheetApp.getActive();
  ss.setActiveSheet(ss.getSheetByName('Grades'), true);
  var rawNames = ss.getRange('D7:D46').getValues();
  Logger.log(rawNames);
  var studentNames = [];
  for each (var n in rawNames) {
    var name = n[0]    
    if (name.length > 1) {
      studentNames.push(name); 
    }
  }
  
  var namesCount = studentNames.length;
  //var names_count = 3; // whilst testing
  
  for (var i = 0; i < namesCount; i++) {
    var studentName = studentNames[i];
    Logger.log(studentName);

    ss.setActiveSheet(ss.getSheetByName('Individual Report'), true);
    ss.getRange('B4').activate();
    
    ss.getCurrentCell()
    .setRichTextValue(
      SpreadsheetApp.newRichTextValue()
      .setText(studentName)
      .build()
    );
    
    createPdf(ss, 2, studentName);
    
    Utilities.sleep(200);
    SpreadsheetApp.flush();
  }
}

function CreateChart() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('Q15').activate();
  var sheet = spreadsheet.getActiveSheet();
  var charts = sheet.getCharts();
  var chart = charts[charts.length - 1];

  sheet.removeChart(chart);

  chart = sheet.newChart()
  .asScatterChart()
  .addRange(spreadsheet.getRange('percents!D7:D30'))
  .addRange(spreadsheet.getRange('percents!H7:X30'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(true)
  .setNumHeaders(1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('useFirstColumnAsDomain', false)
  .setOption('legend.position', 'none')
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
  .setOption('hAxis.slantedText', true)
  .setOption('hAxis.slantedTextAngle', 30)
  .setOption('hAxis.textStyle.fontName', 'Arial')
  .setOption('hAxis.textStyle.fontSize', 11)
  .setOption('hAxis.textStyle.color', '#434343')
  .setOption('hAxis.titleTextStyle.fontName', 'Arial')
  .setOption('hAxis.titleTextStyle.fontSize', 11)
  .setOption('hAxis.titleTextStyle.color', '#222222')
  .setOption('hAxis.titleTextStyle.italic', true)
  .setYAxisTitle('')
  .setOption('vAxes.0.viewWindow.max', 1.2)
  .setOption('vAxes.0.viewWindow.min', -0.1)
  .setOption('vAxes.0.viewWindowMode', 'pretty')
  .setOption('vAxes.0.textStyle.fontName', 'Arial')
  .setOption('vAxes.0.textStyle.fontSize', 11)
  .setOption('vAxes.0.textStyle.color', '#434343')
  .setOption('vAxes.0.titleTextStyle.fontName', 'Arial')
  .setOption('vAxes.0.titleTextStyle.fontSize', 11)
  .setOption('vAxes.0.titleTextStyle.color', '#434343')
  .setOption('vAxes.0.titleTextStyle.italic', true)
  
  .setOption('series.0.color', '#999999')
  .setOption('series.0.dataLabelPlacement', 'below')
  .setOption('series.0.pointSize', 7)
  .setOption('series.0.labelInLegend', 'Megan Brand')
  .setOption('series.0.lineWidth', 2)
  .setOption('series.1.color', '#999999')
  .setOption('series.1.dataLabelPlacement', 'above')
  .setOption('series.1.pointSize', 7)
  .setOption('series.1.labelInLegend', 'Gaye Justinia Delos Santos ')
  .setOption('series.1.lineWidth', 3)
  .setOption('series.2.color', '#999999')
  .setOption('series.2.pointSize', 7)
  .setOption('series.2.labelInLegend', 'Naomi Zhia Gabriel')
  .setOption('series.3.color', '#999999')
  .setOption('series.3.pointSize', 7)
  .setOption('series.3.labelInLegend', 'Jayden Greenfield')
  .setOption('series.4.color', '#999999')
  .setOption('series.4.pointSize', 7)
  .setOption('series.4.labelInLegend', 'Germaine Han')
  .setOption('series.5.color', '#999999')
  .setOption('series.5.pointSize', 7)
  .setOption('series.5.labelInLegend', 'Sieun Han')
  .setOption('series.6.color', '#999999')
  .setOption('series.6.pointSize', 7)
  .setOption('series.6.labelInLegend', 'Ju An Hwang')
  .setOption('series.7.color', '#999999')
  .setOption('series.7.pointSize', 7)
  .setOption('series.7.labelInLegend', 'Eun Hye Kim')
  .setOption('series.8.color', '#999999')
  .setOption('series.8.pointSize', 20)
  .setOption('series.8.labelInLegend', 'Hogi Kim')
  .setOption('series.9.color', '#999999')
  .setOption('series.9.pointSize', 7)
  .setOption('series.9.labelInLegend', 'Tolaka Kim')
  .setOption('series.10.color', '#999999')
  .setOption('series.10.pointSize', 7)
  .setOption('series.10.labelInLegend', 'Hudson Kliewer')
  .setOption('series.11.color', '#999999')
  .setOption('series.11.pointSize', 7)
  .setOption('series.11.labelInLegend', 'ZhiHao Lu')
  .setOption('series.12.color', '#999999')
  .setOption('series.12.pointSize', 7)
  .setOption('series.12.labelInLegend', 'Thanith Muy')
  .setOption('series.13.color', '#999999')
  .setOption('series.13.pointSize', 7)
  .setOption('series.13.labelInLegend', 'Byung Kyu Park')
  .setOption('series.14.color', '#999999')
  .setOption('series.14.pointSize', 7)
  .setOption('series.14.labelInLegend', 'Seong Min Park')
  .setOption('series.15.color', '#999999')
  .setOption('series.15.pointSize', 7)
  .setOption('series.15.labelInLegend', 'Matthieu Peduzy')
  .setOption('series.16.color', '#999999')
  .setOption('series.16.pointSize', 7)
  .setOption('series.16.labelInLegend', 'Sovatey Prak')
  .setOption('series.17.color', '#999999')
  .setOption('series.17.pointSize', 7)
  .setOption('series.17.labelInLegend', 'Sujal Shrestha')
  .setOption('series.18.color', '#999999')
  .setOption('series.18.pointSize', 7)
  .setOption('series.18.labelInLegend', 'Shekinah Tsui')
  .setOption('series.19.color', '#999999')
  .setOption('series.19.pointSize', 7)
  .setOption('series.19.labelInLegend', 'Pich Ty')
  .setOption('series.20.color', '#999999')
  .setOption('series.20.pointSize', 7)
  .setOption('series.20.labelInLegend', 'Brynne Whitaker')
  .setOption('series.21.color', '#999999')
  .setOption('series.21.pointSize', 7)
  .setOption('series.21.labelInLegend', 'Samuel Wong')
  .setOption('series.22.color', '#999999')
  .setOption('series.22.pointSize', 7)
  .setOption('series.22.labelInLegend', 'Seung Won Yang')
  .setOption('series.23.color', '#999999')
  .setOption('series.23.pointSize', 7)
  .setOption('series.23.labelInLegend', 'Seung Won Yang')

  .setOption('width', 1327)
  .setPosition(11, 2, 1, 4)
  .build();
  sheet.insertChart(chart);
};

function pink() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('E3').activate();
  var sheet = spreadsheet.getActiveSheet();
  var charts = sheet.getCharts();
  var chart = charts[charts.length - 1];
  sheet.removeChart(chart);
  chart = sheet.newChart()
  .asScatterChart()
  .addRange(spreadsheet.getRange('percents!D7:D30'))
  .addRange(spreadsheet.getRange('percents!H7:X30'))
  .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
  .setTransposeRowsAndColumns(true)
  .setNumHeaders(1)
  .setHiddenDimensionStrategy(Charts.ChartHiddenDimensionStrategy.IGNORE_BOTH)
  .setOption('useFirstColumnAsDomain', false)
  .setOption('curveType', 'none')
  .setOption('legend.position', 'none')
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
  .setOption('hAxis.slantedText', true)
  .setOption('hAxis.slantedTextAngle', 30)
  .setOption('hAxis.textStyle.fontName', 'Arial')
  .setOption('hAxis.textStyle.fontSize', 11)
  .setOption('hAxis.textStyle.color', '#434343')
  .setOption('hAxis.titleTextStyle.fontName', 'Arial')
  .setOption('hAxis.titleTextStyle.fontSize', 11)
  .setOption('hAxis.titleTextStyle.color', '#222222')
  .setOption('hAxis.titleTextStyle.italic', true)
  .setOption('vAxes.0.viewWindow.max', 1.2)
  .setOption('vAxes.0.viewWindow.min', -0.1)
  .setOption('vAxes.0.viewWindowMode', 'pretty')
  .setOption('vAxes.0.textStyle.fontName', 'Arial')
  .setOption('vAxes.0.textStyle.fontSize', 11)
  .setOption('vAxes.0.textStyle.color', '#434343')
  .setOption('vAxes.0.titleTextStyle.fontName', 'Arial')
  .setOption('vAxes.0.titleTextStyle.fontSize', 11)
  .setOption('vAxes.0.titleTextStyle.color', '#434343')
  .setOption('vAxes.0.titleTextStyle.italic', true)
  .setOption('series.0.color', '#999999')
  .setOption('series.0.dataLabelPlacement', 'below')
  .setOption('series.0.pointSize', 7)
  .setOption('series.0.labelInLegend', 'Megan Brand')
  .setOption('series.0.lineWidth', 2)
  .setOption('series.1.color', '#999999')
  .setOption('series.1.dataLabelPlacement', 'above')
  .setOption('series.1.pointSize', 7)
  .setOption('series.1.labelInLegend', 'Gaye Justinia Delos Santos ')
  .setOption('series.1.lineWidth', 3)
  .setOption('series.2.color', '#999999')
  .setOption('series.2.pointSize', 7)
  .setOption('series.2.labelInLegend', 'Naomi Zhia Gabriel')
  .setOption('series.3.color', '#999999')
  .setOption('series.3.pointSize', 7)
  .setOption('series.3.labelInLegend', 'Jayden Greenfield')
  .setOption('series.4.color', '#999999')
  .setOption('series.4.pointSize', 7)
  .setOption('series.4.labelInLegend', 'Germaine Han')
  .setOption('series.5.color', '#999999')
  .setOption('series.5.pointSize', 7)
  .setOption('series.5.labelInLegend', 'Sieun Han')
  .setOption('series.6.color', '#999999')
  .setOption('series.6.pointSize', 7)
  .setOption('series.6.labelInLegend', 'Ju An Hwang')
  .setOption('series.7.color', '#999999')
  .setOption('series.7.pointSize', 7)
  .setOption('series.7.labelInLegend', 'Eun Hye Kim')
  .setOption('series.8.color', '#9900ff')
  .setOption('series.8.pointSize', 20)
  .setOption('series.8.labelInLegend', 'Hogi Kim')
  .setOption('series.9.color', '#999999')
  .setOption('series.9.pointSize', 7)
  .setOption('series.9.labelInLegend', 'Tolaka Kim')
  .setOption('series.10.color', '#999999')
  .setOption('series.10.pointSize', 7)
  .setOption('series.10.labelInLegend', 'Hudson Kliewer')
  .setOption('series.11.color', '#999999')
  .setOption('series.11.pointSize', 7)
  .setOption('series.11.labelInLegend', 'ZhiHao Lu')
  .setOption('series.12.color', '#999999')
  .setOption('series.12.pointSize', 7)
  .setOption('series.12.labelInLegend', 'Thanith Muy')
  .setOption('series.13.color', '#999999')
  .setOption('series.13.pointSize', 7)
  .setOption('series.13.labelInLegend', 'Byung Kyu Park')
  .setOption('series.14.color', '#999999')
  .setOption('series.14.pointSize', 7)
  .setOption('series.14.labelInLegend', 'Seong Min Park')
  .setOption('series.15.color', '#999999')
  .setOption('series.15.pointSize', 7)
  .setOption('series.15.labelInLegend', 'Matthieu Peduzy')
  .setOption('series.16.color', '#999999')
  .setOption('series.16.pointSize', 7)
  .setOption('series.16.labelInLegend', 'Sovatey Prak')
  .setOption('series.17.color', '#999999')
  .setOption('series.17.pointSize', 7)
  .setOption('series.17.labelInLegend', 'Sujal Shrestha')
  .setOption('series.18.color', '#999999')
  .setOption('series.18.pointSize', 7)
  .setOption('series.18.labelInLegend', 'Shekinah Tsui')
  .setOption('series.19.color', '#999999')
  .setOption('series.19.pointSize', 7)
  .setOption('series.19.labelInLegend', 'Pich Ty')
  .setOption('series.20.color', '#999999')
  .setOption('series.20.pointSize', 7)
  .setOption('series.20.labelInLegend', 'Brynne Whitaker')
  .setOption('series.21.color', '#999999')
  .setOption('series.21.pointSize', 7)
  .setOption('series.21.labelInLegend', 'Samuel Wong')
  .setOption('series.22.color', '#999999')
  .setOption('series.22.pointSize', 7)
  .setOption('series.22.labelInLegend', 'Seung Won Yang')
  .setOption('series.23.color', '#999999')
  .setOption('series.23.pointSize', 7)
  .setOption('series.23.labelInLegend', 'Seung Won Yang')
  .setOption('width', 1327)
  .setPosition(11, 2, 1, 4)
  .build();
  sheet.insertChart(chart);
};