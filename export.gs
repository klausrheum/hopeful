// export.gs ===================================================
// copy data from a student's 'Individual Report' sheet to their
// Portfolio spreadsheet (and maybe to a text report, who knows?
// =============================================================

// "ALL"  = export all, regardless
// "Y"    = export records marked Y
// "NONE" = dry run (for error log)

var exportOverride = "Y";

function createTestStudent() {
    createStudentFullInfo(bobby);
}

function deleteTestStudent() {
    deleteStudent(bobby);
}

function testupdateGradeFormulas() {
  var aaaId = "1cLCGk3RBa-Y5zqf7CT8GEwDRD-GtJBOka7_41NUsi5U";
  var aaaSs = SpreadsheetApp.openById(aaaId);
  updateGradeFormulas( aaaSs );
}

function updateGradeFormulas(ss) {
  var meta = {'tag': arguments.callee.name, "dest": "L"};
  
  // TODO DELETE var rbTemplatesFileId = "1YyMyHCQeshm4bWnfiwC3DbRSWDw48PQv9I822oXU8ys";
  var templateSs = SpreadsheetApp.openById(top.rbTemplatesId);
  var sheet = templateSs.getSheetByName("SUB");
  var formulas = sheet.getRange("A10:AC11").getFormulas();
  
  var portfolioName = ss.getName();
  var indRepSheet = ss.getSheetByName("Individual Report");
  indRepSheet.getRange("A10:AC11").setFormulas(formulas);  
}

function textAAAExport() {
  var meta = {'tag': arguments.callee.name, "dest": "L"};
  
  var rbIds = getRbIds();
  var aaa_testerbook = "1cLCGk3RBa-Y5zqf7CT8GEwDRD-GtJBOka7_41NUsi5U";
  var rbIds = [aaa_testerbook];
  
  var rbId = rbIds[0];
  var rbss = SpreadsheetApp.openById(rbId);
  logIt("Exporting: " + rbId, meta);
  
  exportStudentsFromRB(rbss);
}

function exportAllRBs() {
  var meta = {'tag': arguments.callee.name, "dest": "L"};

  var rbIds = getRbIds();
  var aaa99 = "1CGQAR4QafGnC_LarUQqECY2Fy9Dv8jBkIsNlwUyuS3Y";
  var phy09 = "1KeLj6BLp_-_sJZ5FUtuR477C9N9Do1audaQ_Py73iI0";
  var bio10 = "1mYLsiGW_mkFlFnpWBQVp1dk26OyA3b7XEMbo49JKST0";
  var engib = "1_BgA4Y2t49eoQdpXyZkZ70sTuUHd1EoMmD6y9bvAsfM";
  var englit09 = "1qvEbFGLUMEAxGfk0Bmfnb1Y5nvUGMICWPdNcCXQ9__E";
  var spa12 = "11cztmZuO_8XZy6valpY-HbQr4S_qBXpbTi6lmdTxhVo";
  
  //var rbIds = [spa12];
  var startTime = new Date();
  
  console.warn(
    "exportAllRBs: STARTED " + startTime );
  
  for (var r = 0; r<rbIds.length; r++) {
    // if (r > 2) break;
    
    var rbId = rbIds[r];
    var rbss = SpreadsheetApp.openById(rbId);
    var rbName = rbss.getName();
    
    //console.warn("Starting %s ", rbName);
    
    exportStudentsFromRB(rbss);
  }
  
  var endTime = new Date();
  var elapsedTime = (endTime - startTime)/1000;
  
  console.warn(
    "exportAllRBs: COMPLETED %s in %s secs", endTime, elapsedTime);
}

function exportStudentsFromRB(rbss) {
  var meta = {'tag': arguments.callee.name, "dest": "L"};

  var srcName = rbss.getName();
  var owner = rbss.getOwner();
  var len = srcName.length;
  var subYear = srcName.substring(0,len-11);
  var tabName = srcName.substring(0,len-15);
  var sub = tabName.substring(0, 3);
  //var students = getStudents();
  
  console.warn("[%s] >>> Exporting for %s", subYear, owner);
  
  var gradeSheet = rbss.getSheetByName("Grades");
  
  // TODO: v2 use these to update the portfolio directly?
  var titles = gradeSheet.getRange("A3:X3").getValues();
  var maxScores = gradeSheet.getRange("A4:X4").getValues();
  var classAverages = gradeSheet.getRange("A6:X6").getFormulas();
  
  // check for missing max & average in REP columns
  for (var c = 8; c < titles[0].length; c++) {
    var title = titles[0][c];
    var maxScore = maxScores[0][c];
    var avg = classAverages[0][c];
    
    //console.log("title: %s maxScore: %s avg: %s", title, maxScore, avg);
    if (title != "" && title.indexOf("REP") > -1) {
      if (maxScore == "") {
        console.warn(
          "[%s] Max score required for %s", 
          subYear, title);
      }
      if (avg == "") {
        console.warn(
          "[%s] Average score formula required for %s", 
          subYear, title);
      }  
    }
  }
  var rows = gradeSheet.getRange("A7:AB46").getValues();
  var replacementRows = [];

  //Logger.log(namesGrades, meta);

  var yesRows = rows.filter(
    function yes(arr) {
    return ["Y", "y"].indexOf(arr[27]) > -1;
    }
  );
  
  if (yesRows.length > 0) {
    updateGradeFormulas(rbss);
  } 
  //console.log("%d rows marked Y %s", yesRows.length, exportOverride == "ALL" ? " but OVERRIDE=true" : "", meta);
    
  // loop through students marked for export ie col Z="Y":
  for (var r=0; r<rows.length; r++) {
    
    var exported = false;
    
    //   open student.fileid from RB Tracker
    var row = rows[r];
    
    var rowLastname   = row[0];
    var rowFirstname  = row[1];
    var rowEmail      = row[2]; // col C, 0-based
    var rowFullname   = row[3];
    
    var rowAvgGrade   = row[5];
    var rowAvgPercent = row[6];
    var rowGrades     = row.slice(7, 23);
    
    var rowComment    = row[24]; // col Y
    var rowTimestamp  = row[25];
    var rowExportTabs = row[26];
    var rowExportYN   = row[27]; // col AB
    
    replacementRows.push([
      rowTimestamp, 
      rowExportTabs, 
      rowExportYN
    ]);
    
    
    if (rowEmail == "") {

      if (rowLastname != "") { // student has last name
        console.warn(
          "[%s] EMAIL? %s missing email", 
          subYear, rowFullname);
        
        // Fullname formula missing
        if (rowFirstname + " " + rowLastname != rowFullname) {
          console.warn("[%s] FORMULA? Fullname formula missing in col C: %s != %s+%s in %s", 
                       subYear, rowFullname, rowFirstname, rowLastname);
        }
      }

    } else { // row has an email
      
      if (exportOverride != "Y" || ["Y", "y"].indexOf(rowExportYN) > -1) { 
        
        console.log(
          "[%s] STARTING: %s (%s)", 
          subYear, rowFullname, rowEmail);
        
        // count grades entered...
        var rowScores = [];
        for (var g = 0; g < rowGrades.length; g++) {
          if (rowGrades[g] != "") {
            rowScores.push(rowGrades[g]); 
          }
        }
        
        // ... 3 or fewer grades ?
        if (rowScores.length <= 3) {
          console.info(
            '[%s] FEW? %s grade(s) - %s',
            subYear, rowScores.length.toString(), rowFullname);
        }
        
        // ... average score less than 30% ?
        if (rowAvgPercent < 0.30) {
          console.info(
            "[%s] LOW? %s graded %s (%s = %s)", 
            subYear, rowFullname, 
            rowAvgGrade,  
            Math.round(rowAvgPercent*100), 
            rowScores.join(" + ")); 
        }
        
        var student = getStudentByEmail(rowEmail);
        
        var portfolioFile = "";
        try {
          portfolioFile = SpreadsheetApp.openById(student.fileid);
        }
        catch(e) {
          console.error(
            "[%s] FILE? %s, error: ", 
            subYear, student.email, e);           
        }
        
        if (portfolioFile != "") {
          
          //  if not exists sheet(sub):
          var tabExists = portfolioFile.getSheetByName(tabName) != null;
          var portfolioSheet; 
          
          if (! tabExists) {
            portfolioSheet = addSubTemplate(student, tabName);
          } else {
            logIt(tabName + " already exists", meta);
            portfolioSheet = portfolioFile.getSheetByName(tabName);
          }
          
          if ( exportOverride != "NONE" ) {
            // set Full Name
            var rbRepSheet = rbss.getSheetByName(template.reportsSheetName);
            rbRepSheet.getRange("B4").setValue(student.fullname);
            
            // copy grades data
            var titlesAndPercentages = rbRepSheet.getRange("B4:U8").getValues();
            portfolioSheet.getRange("B4:U8").setValues(titlesAndPercentages);
            
            var letterGrades = rbRepSheet.getRange("B10:U11").getValues();
            portfolioSheet.getRange("B10:U11").setValues(letterGrades);
            
            // wipe out GPA (for now)
            portfolioSheet.getRange("C6:C11").setValue("");
            
            // add Comment
            portfolioSheet.getRange("I4").setValue(rowComment);
            
            // clear out unused Titles
            updateValues(portfolioSheet, "F6:6", ["Title"], [""]);
            
            // TODO add tabs list
            var tabsList = [];
            tabsList = portfolioFile.getSheets().map(function(sheet) {
              return [sheet.getName()];
            });
            
            // update timestamp, uncheck YN, etc
            // add datestamp
            var newTimestamp = "" + new Date();
            var newExportTabs = tabsList.join(", ");
            var newExportYN = exported ? "Y" : "N";
            var url = portfolioFile.getUrl();
            url += '#gid=';
            url += portfolioSheet.getSheetId();
            var newExportTabsLink = '=HYPERLINK("' + 
              url + '", "' + 
                student.fullname + " " + tabName + 
                  '")';
            
            //logIt([rowTimestamp, rowExportTabs, rowExportYN], meta);
            //console.log([r, newTimestamp, newExportTabs, newExportYN], meta);
            
            replacementRows[r] = [[
              newTimestamp, 
              newExportTabsLink,
              newExportYN
            ]];
            gradeSheet.getRange(r+7, 26, 1, 3).setValues(replacementRows[r]);
            
            // TODO (IDEA - MAYBE?) copy grade data (do the math?) and the comment
            
          }
          
        } else {
          var newTimestamp = "" + new Date();
          console.log("No Portfolio, ignored");
          gradeSheet.getRange(r+7, 26, 1, 3).setValues([[newTimestamp, "No Portfolio, ignored", "N"]]);
        }

        console.log(
          "[%s] FINISHED: %s", 
          subYear, student.fullname);
      }
    }
  }
  // gradeSheet.getRange("Z7:AB46").setValues(replacementRows);
  
}

function addSubToEveryStudent() {
  var meta = {'tag': arguments.callee.name, "dest": "L"};
  
  if (top.students === undefined) {
    top.students = initialiseStudents();
  }
  
  for (var s = 0; s < top.students.length; s++) {
    var student = top.students[s];
    addSubTemplate(student) ;
    // if (s>2) break;
  }
}

function testAddSubTemplate() {
  var meta = {'tag': arguments.callee.name, "dest": "L"};

  var student = getStudentByEmail("thomas.norman@students.hope.edu.kh");
  var newSheet = addSubTemplate(student);
  logIt(newSheet, meta);
}

function orderTabs(ss) {
  // loop through the tabs, sorting them into order
  var meta = {'tag': arguments.callee.name, "dest": "L"};
  
}

function addSubTemplate(student, tabName) {
  var meta = {'tag': arguments.callee.name, "dest": "L"};
  Logger.log(student);
  Logger.log(subYear);
  
  if (tabName === undefined) {
    tabName = "SUB"
  }
 
  // open the tab templates file
  // TODO DELETE var rbTemplatesId = "1YyMyHCQeshm4bWnfiwC3DbRSWDw48PQv9I822oXU8ys";
  var rbTemplateSS = SpreadsheetApp.openById(top.rbTemplatesId);

  // copy the 'SUB' tab into the student portfolio
  var subjectSheetName = "SUB";
  var subjectSheetTemplate = rbTemplateSS.getSheetByName("SUB"); // TODO centralise
  // logIt("Adding SUB template to " + student.fullname , meta, "C");

  var portfolioFile = SpreadsheetApp.openById(student.fileid); 
  var subSheet = portfolioFile.getSheetByName(tabName);
  
  var sheets = portfolioFile.getSheets();
  var tabExists = subSheet != null;
  
  if (tabExists) {
    logIt("Tab " + tabName + " already exists, just update it", meta, "C");
    
  } else {
    logIt(student.fullname + ": tab " + tabName + " does not exist. Creating...", meta, "C");
    subSheet = subjectSheetTemplate.copyTo(portfolioFile);
    subSheet.setName(tabName);
  }
  
  return subSheet;
}