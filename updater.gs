// updater.gs ==================================================
// 1. add columns to teacher RBs (Comments, Date, Tabs, ExportYN
// 2. update formulas in teacher RBs and student portfolios
// =============================================================

//var COLS = {
//  "COMMENT":{"col":25}, // "text": "Comment", "width": 
//  "TABS": {"col": 26},
//  "DATE": {"col":27},
//  "EXPORTYN": {"col": 28}
//};
//Logger.log(COLS.COMMENT);

var OLD = 0;
var NEW = 1;

function updatePortfolios() {
  // add attendance
  // add Cheryl's blurb
  // copy Pastoral Comment, sometimes, extra-curric & absent to RB Tracker
  
  version = OLD;
  
  var startTime = new Date();
  console.warn(
    "updatePortfolios: STARTED " + startTime );

  for (var i=0; i < top.students.length; i++) {
    var student = top.students[i];
    // SAFETY CATCH =============================
    
    if (i>2) break; // stop after two reportbooks
    
    // END SAFETY CATCH =========================
    var id = student.fileid;
    var ss = SpreadsheetApp.openById(id);
    console.info("Backing up " + ss.getName());
    var comment = backupPortfolio(ss);
  }
  
  var endTime = new Date();
  var elapsedTime = (endTime - startTime)/1000;
  console.warn(
    "updatePortfolios: COMPLETED %s in %s secs", endTime, elapsedTime);

}

function test_backupPortfolio() {
  var ss = SpreadsheetApp.openById(lily);
  version = NEW;
  var data = backupPortfolio(ss);
  if (comment.slice(0, 4) != "Lily") {
    throw "FAIL (backupPortfolio): text not found in " + comment;
  }
}

function backupPortfolio(ss) {
  
  // UNFINISHED - DO NOT USE //
  
  var pastoral = {
    "studentname": ["B4", "B4"],
    "comment": ["B20", "B7"],
    "extra": ["B8", "B12"],
    "attributes": ["C10:C18", "C15:C23"]
  }

  var sheet = ss.getSheetByName("Pastoral");
  var raw = sheet.getDataRange().getValues();
  var data = {};
  data.name = raw[3, 1];
  data.comment = raw[19, 1];
  data.extra = raw[6, 1];
  data.attributes = sheet.getRange("");
  return data;
}

function updateReportbooks() {
  var rbIds = getRbIds();
  
  var aaa_testerbook = "1cLCGk3RBa-Y5zqf7CT8GEwDRD-GtJBOka7_41NUsi5U";
  var phy09copy = "1dQra-gLWOZ0oLiUCsGXPGeGNnZQaqI2rEynAYbstdS8";
  var englit09 = "1qvEbFGLUMEAxGfk0Bmfnb1Y5nvUGMICWPdNcCXQ9__E";
  var csc10 = "1jI0UpPD9Imz9SUXwcRUI8CaucrHuKhOg_Mi5GQJKJFI";
  //var rbIds = [csc10];
  
  for (var i=0; i < rbIds.length; i++) {
    
    // SAFETY CATCH =============================
    
    if (i>2) break; // stop after two reportbooks
    
    // END SAFETY CATCH =========================
    
    id = rbIds[i];
    var ss = SpreadsheetApp.openById(id);
    console.info("Updating " + ss.getName());
    
    //    updateCommentsColumn(ss);
    //    updateExportColumns(ss);
    //    updateFreezeRows(ss);
    //    updateRBFormulas(ss);
    //    updateDeleteUnusedDatesAndTitles(ss);
    updateGradeScale(ss);
    // updateConditionalFormatting(ss); // doesn't work in this scope :(
    
    //   sheet(report)
    //     // display comment
    //     .insertFormula(I4, 
    //      =iferror(index(Grades!$D$7:$Y$46, match($B$4,Grades!$D$7:$D$46,0),22),"")
    //     .chartType(scatter)
    //     .trendLines(false)
    
    SpreadsheetApp.flush();
  }
}

function updateDeleteUnusedDatesAndTitles(ss) {
  var sheet = ss.getSheetByName(template.gradesSheetName);    
  updateValues(sheet, "H2:3", ["Title", "Date"], ["", ""]);
}

function updateCommentsColumn(ss) {
  var sheet = ss.getSheetByName(template.gradesSheetName);    
  sheet.setWrap
  // ensure we have 28 columns 'Comment' column
  var lastCol = sheet.getLastColumn();
  while (lastCol < 28) {
    sheet.insertColumnBefore(lastCol);
    lastCol ++;
  }
  
  // if column 25 isn't 'Comment', make it so
  var title = sheet.getRange(3, 25).getValue();
  Logger.log(title);
  if (title == "") {
    sheet.getRange("Y3:Y4").setValues([["Comment"],[""]]);
  }
  sheet.getRange("Y1:Y")
  .setHorizontalAlignment("left")
  .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  
  sheet.setColumnWidth(25, 250);  
}
// END updateCommentsColumn


function updateExportColumns(ss) {
  // not working in this scope, using Y/N for now :/
  //  var checkBoxes = 
  //    SpreadsheetApp
  //    .newDataValidation()
  //    .setAllowInvalid(false)
  //    .requireCheckbox()
  //    .build();
  
  var sheet = ss.getSheetByName("Grades");
  
  // add admin columns
  var lastCol = sheet.getLastColumn();
  while (lastCol < 28) {
    sheet.insertColumnAfter(sheet.getLastColumn());
    lastCol ++;
  }
  
  sheet.getRange("Y:AB")
  .setBorder(null, true, null, true, true, null, '#999999', SpreadsheetApp.BorderStyle.SOLID);
  
  sheet.getRange("Z1:AB5")
  .setBackground("#e8eaf6")
  .setFontColor("#303f9f");
  
  // Tabs
  sheet.setColumnWidth(27, 170);
  sheet.getRange('AA3').setValue('Tabs');
  
  sheet.getRange("Y1:Y5")
  .setBackground("#333333")
  .setFontColor("#FFFFFF");
  
  // Date
  sheet.setColumnWidth(26, 170);
  sheet.getRange('Z3').setValue('Last exported:');
  
  // Export
  //  var ss = SpreadsheetApp.openById(aaa);
  //  var sheet = ss.getSheetByName("Grades");
  var checkboxValidation = SpreadsheetApp
  .newDataValidation()
  .requireCheckbox("Y", "N")
  .build();
  
  sheet.getRange("AB7:AB46").setDataValidation(checkboxValidation); 
  
  sheet.setColumnWidth(28, 50);
  sheet.getRange('AB3').setValue('Export Y / N');
  
  //  Logger.log("Setting checkboxes");
  //  ss.getRange('AB7:AB')
  //  .setDataValidation(checkBoxes);
  
  sheet.getRange("Y:AA")
  .setHorizontalAlignment("left");
  
  sheet.getRange("Z7:Z")
  .setNumberFormat('h PM, ddd mmm dd');
  
  sheet.getRange("Z7:AA")      // date and tabs
  .setHorizontalAlignment("left")
  .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  
  sheet.getRange("AB:AB")
  .setHorizontalAlignment("center");
  
};
// END updateExportColumns

function updateConditionalFormatting(ss) {
  var conditionalFormatRules = ss.getActiveSheet().getConditionalFormatRules();
  
  ss.getActiveSheet().setConditionalFormatRules(conditionalFormatRules);
  conditionalFormatRules = ss.getActiveSheet().getConditionalFormatRules();
  conditionalFormatRules.splice(conditionalFormatRules.length - 1, 1, SpreadsheetApp.newConditionalFormatRule()
  .setRanges([ss.getRange('Z7:Z46')])
  .whenTextEqualTo('y')
  .setBackground('#FF00FF')
  .build());
  ss.getActiveSheet().setConditionalFormatRules(conditionalFormatRules);
}

function updateFreezeRows(ss) {
  ss.getSheetByName(template.gradesSheetName).setFrozenRows(6);
}

function testUpdateValues() {
  var ss = SpreadsheetApp
  .openById("1cLCGk3RBa-Y5zqf7CT8GEwDRD-GtJBOka7_41NUsi5U");
  var sheet = ss.getSheetByName(template.gradesSheetName);
  updateValues(sheet, "H2:3", ["Title", "Date"], ["", ""]);
}

function updateValues(sheet, rangeA1, oldValues, newValues) {
  if (oldValues.length != newValues.length) {
    throw "newValues must be same length as oldValues";
  }
  
  var data = sheet.getRange(rangeA1).getValues();
  Logger.log("updateValues: " + data);
  for (var r = 0; r < data.length; r++) {
    for (var c = 0; c < data[0].length; c++) {
      var cellValue = data[r][c];
      Logger.log("Checking cell["+r+"]["+c+"]=" + cellValue);
      for (var v = 0; v < oldValues.length; v++) {
        if (cellValue == oldValues[v]) {
          data[r][c] = newValues[v];
          Logger.log("Updated cellValue from " + oldValues[v] + " to " + newValues[v]);
        }
      }
    }
  }
  sheet.getRange(rangeA1).setValues(data);
}



function updateRBFormulas(ss) {
  
  var formulas = [
    {
      // F6=if(istext(A6), index(Grades, match($G6*100,GradeRange,-1), 1),"")
      "desc": "if the Last name column is empty, don't display a grade (eg E-)",
      "sheet": "Grades", 
      "cell": "F6", 
      "range": "F7:F", 
      "formula": '=if(istext(A6), index(Grades, match($G6*100,GradeRange,-1), 1),"")'
    },
    {
      // G6=sum(arrayformula(iferror(($H$1:$X$1 / sumif($H6:$X6, "<>", $H$1:$X$1)) * (H6:X6 / $H$4:$X$4))))
      "desc": "if the grade is blank, don't include it in the weighting denominator",
      "sheet": "Grades", 
      "cell": "G6", 
      "range": "G7:G", 
      "formula": '=sum(arrayformula(iferror(($H$1:$X$1 / sumif($H6:$X6, "<>", $H$1:$X$1)) * (H6:X6 / $H$4:$X$4))))'
    },
    {
      "desc": "if the grade is blank, don't include it in the graph",
      "sheet": "Individual report",
      "cell": "F8",
      "range": "",
      "formula": '=arrayformula(if(index(Grades!$H$7:$Y$46, match($B$4,Grades!$D$7:$D$46,0)) = "", "", iferror(index(Grades!$H$7:$Y$46, match($B$4,Grades!$D$7:$D$46,0))/PointValues)))'
    }
  ];

  updateFormulas(ss, formulas);
}

function updateFormulas(ss, formulas) {
  for (var i=0; i<formulas.length; i++) {
    var update = formulas[i];
    
    var sheet = ss.getSheetByName(update.sheet);
    
    var oldFormula = sheet.getRange(update.cell).getFormula();
    console.log(update.desc);
    
    // update to new formula
    sheet.getRange(update.cell)
    .setFormula(update.formula);
    
    // fill down?
    if (update.range != "") {
      sheet.getRange(update.cell)
      .copyTo(sheet.getRange(update.range), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
    }    
  }
}


function test_updateGradeScales() {
  // destination sheet
  Logger.log(top.FILES.AAA);
  var testSS = SpreadsheetApp.openById( top.FILES.AAA );
  Logger.log (testSS.getName() );
  var testSheet = testSS.getSheetByName( top.SHEETS.OVERVIEW );
  
  // clear scale from template SubY00 / Overview
  testSheet.getRange("B8:B22").clear();
  testSheet.getRange("D9:D22").clear();
  
  updateGradeScale(testSS);
}

function updateGradeScale(ss) {
  // source sheet
  var templateSS = SpreadsheetApp.openById( top.FILES.SUBY00 );
  var templateSheet = templateSS.getSheetByName( top.SHEETS.OVERVIEW );

  // destination sheet
  var destSheet = ss.getSheetByName( top.SHEETS.OVERVIEW );
  
  // get scale from template SubY00 / Overview
  var start_boundary = templateSheet.getRange("B8:B22").getValues();
  var end_boundary = templateSheet.getRange("D9:D22").getFormulas();
  var colors = templateSheet.getRange("B8:D22").getBackgrounds();
  var styles = templateSheet.getRange("B8:D22").getTextStyles();
  var alignments = templateSheet.getRange("B8:D22").getHorizontalAlignments();
  
  // paste to current RB / Overview
  destSheet.getRange("B8:B22").setValues(start_boundary);
  destSheet.getRange("D9:D22").setFormulas(end_boundary);
  destSheet.getRange("B8:D22").setBackgrounds(colors);
  destSheet.getRange("B8:D22").setTextStyles(styles);
  destSheet.getRange("B8:D22").setHorizontalAlignments(alignments);
}


function exportButton() {
  // sheet = "Individual report";
  // sheet.copyTo(name, B4:X11
}