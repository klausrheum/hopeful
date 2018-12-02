// export.gs ===================================================
// copy data from a student's 'Individual Report' sheet to their
// Portfolio spreadsheet (and maybe to a text report, who knows?
// =============================================================

function createTestStudent() {
    createStudentFullInfo(bobby);
}

function deleteTestStudent() {
    deleteStudent(bobby);
}


function textAAAExport() {
  var meta = {'tag': arguments.callee.name, "dest": "L"};

  
  var rbIds = getRbIds();
  var aaa_testerbook = "1CGQAR4QafGnC_LarUQqECY2Fy9Dv8jBkIsNlwUyuS3Y";
  var rbIds = [aaa_testerbook];
  
    var rbId = rbIds[0];
    var rbss = SpreadsheetApp.openById(rbId);
    logIt("Exporting: " + rbId, meta);

    exportStudentsFromRB(rbss);
}

function exportAllRBs() {
  var meta = {'tag': arguments.callee.name, "dest": "L"};

  var rbIds = getRbIds();
  var aaa_testerbook = "1CGQAR4QafGnC_LarUQqECY2Fy9Dv8jBkIsNlwUyuS3Y";
  var rbIds = [aaa_testerbook];
  
  for (var r in rbIds) {
    //if (r > 1) break;
    
    var rbId = rbIds[r];
    var rbss = SpreadsheetApp.openById(rbId);
    logIt("Exporting: " + rbId, meta);
    
    exportStudentsFromRB(rbss);
  }
}

function exportStudentsFromRB(rbss) {
  var meta = {'tag': arguments.callee.name, "dest": "L"};

  var srcName = rbss.getName();
  var len = srcName.length;
  var tabName = srcName.substring(0,len-15);
  var sub = tabName.substring(0, 3);
  var students = getStudents();
  
  logIt("Exporting " + srcName + " to tab |" + tabName + "|, sub|" + sub + "|", meta);
  
  var gradeSheet = rbss.getSheetByName("Grades");
  
  // TODO: use these to update the portfolio directly?
  var titles = gradeSheet.getRange("A3:X3").getValues();
  var maxScores = gradeSheet.getRange("A4:X4").getValues();
  var classAverage = gradeSheet.getRange("A6:X6").getValues();
  var namesGrades = gradeSheet.getRange("A7:AB46").getValues();
  //Logger.log(namesGrades, meta);

  var yesRows = namesGrades.filter(
    function yes(arr) {
    return ["Y", "y"].indexOf(arr[27]) > -1;
    }
  );
  // logIt("yesRows=" + yesRows, meta);

  // loop through students marked for export ie col Z="Y":
  for (var r=0; r<yesRows.length; r++) {
  //   open student.fileid from RB Tracker
    var row = yesRows[r];
    var thisEmail = row[2];
    var student = getStudentByEmail(thisEmail);
    
    if (thisEmail == "") {
      logIt(student, meta);
      logIt("Email field empty in doc " + srcName + ", skipping", meta);
    } else {
      
      var portfolioFile = SpreadsheetApp.openById(student.fileid);
      
      logIt("Student " + student.fullname + " is tagged for export", meta);
      
      //   if not exists sheet(sub):
      var tabExists = portfolioFile.getSheetByName(tabName) != null;
      var portfolioSheet; 
      
      if (! tabExists) {
        portfolioSheet = addSubTemplate(student, tabName);
      } else {
        logIt(tabName + " already exists", meta);
        portfolioSheet = portfolioFile.getSheetByName(tabName);
      }
      logIt(template, meta);
      logIt(template.reportsSheetName, meta);
      
      var rbRepSheet = rbss.getSheetByName(template.reportsSheetName);
      //   set: B4 => student.fullname, grab B4:U8
      rbRepSheet.getRange("B4").setValue(student.fullname);
      var dataToCopy = rbRepSheet.getRange("B4:U8").getValues();
      Logger.log(portfolioSheet.getName() );
      Logger.log(portfolioSheet.getRange("B4:U8").getValues());
      portfolioSheet.getRange("B4:U8").setValues(dataToCopy);
      portfolioSheet.getRange("C6:C8").setValue("");
      
      //   OR
      //   copy grade data (do the math?) and the comment
      
      //   clear the 'Export' checkbox
      //   update the 'Last exported' timestamp
      //   add tabs
    }
  }
}

function addSubToEveryStudent() {
  var meta = {'tag': arguments.callee.name, "dest": "L"};
  
  var students = getStudents();
  for (var s=0; s<students.length; s++) {
    var student = students[s];
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

  if (tabName === undefined) {
    tabName = "SUB"
  }
 
  // open the tab templates file
  var rbTemplatesId = "1YyMyHCQeshm4bWnfiwC3DbRSWDw48PQv9I822oXU8ys";
  var rbTemplateSS = SpreadsheetApp.openById(rbTemplatesId);

  // copy the 'SUB' tab into the student portfolio
  var subjectSheetName = "SUB";
  var pastoralTemplateSheet = rbTemplateSS.getSheetByName(subjectSheetName);
  console.info("ex:adSuTe " + "Adding SUB template to " + student.fullname);

  var portfolioFile = SpreadsheetApp.openById(student.fileid); 
  var sheets = portfolioFile.getSheets();
  
  // choose a name for the new tab, appending '1' if already exists
  var candidate = tabName;
  var tabExists = portfolioFile.getSheetByName(candidate) != null;
  
  if (tabExists) {
    logIt("Tab " + tabName + " already exists, need to rename", meta);
    
    var suffix = 0;
    while (tabExists) {
      suffix ++;
      candidate = tabName + suffix;
      tabExists = portfolioFile.getSheetByName(candidate) != null;
      logIt("Tab " + candidate + " exists? " + tabExists, logTag);
    } 
  } else {
    logIt("Tab " + tabName + " does not exist, okay to create", meta);
  }
  
  logIt("Making new tab: " + candidate, meta);
  var newSheet = pastoralTemplateSheet.copyTo(portfolioFile);
  newSheet.setName(candidate);
  
  return newSheet;
}



