// tracker.gs ==================================================
// functions for managing the Reportbooks Tracker spreadsheet
// createStudent, deleteStudent, getStudentByEmail, 
// create portfolio if doesn't exist, copy fileid back into here
// =============================================================

// TODO add to global object

var COLS = {
  'LASTNAME': 1,
  'FIRSTNAME': 2,
  'EMAIL': 3,
  'FULLNAME': 4,
  'YEAR': 5,
  'FILENAME': 6,
  'FILEID': 7,
  'LINK': 8,
  'TABS': 9,
};

var paulson = {
  "lastname": "Paulson",
  "firstname": "Robert",
  "email": "robert.paulson@students.hope.edu.kh",
  "year": "Y99"
}

var bobby = {
  "lastname": "Tables",
  "firstname": "Bobby",
  "email": "bobby.tables@students.hope.edu.kh",
  "year": "Y99"
};


// TODO finish this - add  
function testUpdateStudentFromSheet() {
  var fromSheetKid = "nofirstname.nolastname@students.hope.edu.kh";
  student = getStudentByEmail(fromSheetKid);
}

function testCreateStudentFullInfo() {
  var meta = {'tag': arguments.callee.name, "dest": "L"};

  var email = paulson.email;
  
  // SETUP:
  deleteRowByEmail(email);

  student = createStudentFullInfo(paulson);
  
  // lastname tests
  if (student.lastname === undefined || student.lastname == "") {
    logIt("Call to createStudentFullInfo deleted .lastname for " + email, meta);
  }
  if (student.lastname != paulson.lastname || student.lastname == "") {
    logIt("After createStudentFullInfo .lastname doesn't match for " + email, meta);
  }
  
  // filename tests
  if (student.filename === undefined || student.filename == "") {
    logIt("Call to createStudentFullInfo returned no filename for " + email, meta);
  }
  if (student.filename === undefined || student.filename == "") {
    logIt("Call to createStudentFullInfo returned no filename for " + email, meta);
  }
  
  // fileid tests
  if (student.fileid === undefined || student.fileid == "") {
    logIt("Failed to create fileid for " + email, meta);
  }
  if (student.fileid.length != rbTemplatesId.length) {
    logIt("fileid (" + student.fileid + "wrong length for " + email, meta);
  }

  // TEARDOWN:
  deleteRowByEmail(email);
}

function testDeleteRowByEmail() {
  var meta = {'tag': arguments.callee.name, "dest": "L"};
  deleteRowByEmail(paulson.email);
  deleteRowByEmail(bobby.email);
}


function deleteStudent(student) {
  deleteRowByEmail(student.email); 
}

function deleteRowByEmail(email) {
  var meta = {'tag': arguments.callee.name, "dest": "L"};
  var student = getStudentByEmail(email);

  if (student.row < 1) {
    logIt("Couldn't delete, email not found for " + email, meta);
  } else {
    
    logIt("Deleting " + email + " from row " + student.row, meta);
    SpreadsheetApp
    .openById(rbTrackerId)
    .getSheetByName("Portfolios")
    .deleteRow(student.row);
  }
}

function createStudentFullInfo(student) {
  var meta = {'tag': arguments.callee.name, "dest": "L"};
  try {
    student = createPortfolioRow(student);
  }
  
  catch(e) {
    throw e;
  }
  
  return student;
}


function makeLink(fileId) {
  return "https://docs.google.com/spreadsheets/d/" + fileId + "/edit"; 
}

function testGetStudentByEmail() {
  var meta = {'tag': arguments.callee.name, "dest": "L"};
  var student = {};
  
  // check empty student returns {}
  student = getStudentByEmail("");
  Logger.log(student);
  
  if (! student.row == -1) {
    Logger.log(student);
    throw "getStudentByEmail('') should return {row:-1}";
  }
  
  
  // check student with details on sheet but no fileid yet
  
  // TODO SETUP: clear fileid field in RB tracker

  // TODO delete bobby's portfolioId from RBs Tracker
  
  student = getStudentByEmail(bobby.email);
  Logger.log(student);
  
  // TEARDOWN: delete file "BOBBY, Tables"

  
  
  // check student with full data
  var testEmail = "tom.kershaw@students.hope.edu.kh";
  student = getStudentByEmail(testEmail);
  //Logger.log(student);
  
  var testStudent = {
      "lastname": "Kershaw",
      "firstname": "Tom",
      "email": "tom.kershaw@students.hope.edu.kh",
      "fullname": "Tom Kershaw",
      "year": "Y09",
      "filename": "KERSHAW, Tom (Sem 1 2018 Report)",
      "fileid": "1I2WDPzVVat5xwczFGW2iUtyEivsThKa9Y8YgZAno3GM",
      "link": "https://docs.google.com/spreadsheets/d/1I2WDPzVVat5xwczFGW2iUtyEivsThKa9Y8YgZAno3GM/edit",
      "tabs": "ENG",
      "row": 86,
    };
  
var testFields = [
      "lastname",
      "firstname",
      "email",
      "fullname",
      "year",
      "filename",
      "fileid",
      "link"];
  
  for (var f=0; f<testFields.length; f++) { 
    var field = testFields[f];
    if (student[field] != testStudent[field]) {
      logIt(student, meta);
      throw "testGetStudent() error on field " + field;
    }
    
  }
}

function getStudentByEmail(studentEmail) {
  var meta = {'tag': arguments.callee.name, "dest": "L"};
  var failResponse = {row:-1};
  
  if (typeof (studentEmail) != "string") {
    return failResponse
    throw "studentEmail must be a string";
  }
  
  // return a student record
  // on error, return {}
  
  var student = {};
  if (studentEmail == '') 
  { 
    Logger.log("studentEmail was empty");
    return failResponse
  }
  student.email = studentEmail;
  return getStudent(student);
}

function createStudentRBs() {
  var meta = {'tag': arguments.callee.name, "dest": "L"};
  if (students === undefined) {
    var students = getStudents();
  }
  
  for (var s in students) {
    student = students[s];
    student.fileid = getStudent(student, students).fileid;
  }
}
// END createStudentRBs

function getStudents() {
  var meta = {'tag': arguments.callee.name, "dest": "L"};
  var rb = SpreadsheetApp.openById(rbTrackerId);
  var sheet = rb.getSheetByName("Portfolios");
  var data = sheet.getDataRange().getValues();
  
  // TODO DEL? This condition previously applied to the next line if (students === undefined) 
  var students = [];
  var student;
  
  for (var d=1; d<data.length; d++) { // skip titles row
    student = {
      "lastname": data[d][COLS.LASTNAME-1],
      "firstname": data[d][COLS.FIRSTNAME-1],
      "email": data[d][COLS.EMAIL-1],
      "fullname": data[d][COLS.FULLNAME-1],
      "year": data[d][COLS.YEAR-1],
      "filename": data[d][COLS.FILENAME-1],
      "fileid": data[d][COLS.FILEID-1],
      "link": makeLink(data[d][COLS.FILEID-1]),
      "tabs": data[d][COLS.TABS-1],
      "row": d+1,
    };
    
    // TODO DELETE? student.link = makeLink(student.fileid);
    
    // log first 5 records ...
    if (d < 5) {
      //Logger.log(student);
    }
    
    if (student.email.length < 2 || 
        student.lastname.length < 2 || 
        student.firstname.length < 2 || 
        student.year.length != 3) {
      logIt(student.email + ", " + 
            student.lastname + ", " + 
            student.firstname + ", " + 
            student.year, meta);
      throw "Damaged / incomplete student record in Portfolios spreadsheet - CHECK & FIX IMMEDIATELY (row " + student.row + ")";
    } else {
      students.push(student);
    }
  }

  // ... and the last record
  // Logger.log(student);
  
  return students; 
}
// END getStudents

function getStudent(student) {
  var meta = {'tag': arguments.callee.name, "dest": "L"};
  // search RB Tracker for student.email:
  // return student or return student.row = -1
  
  if (students === undefined) {
    var students = getStudents();
  }
  
  var studentFound = false;
  for (var s=0; s < students.length; s++) {
    var thisStudent = students[s];
    if (thisStudent.email == student.email) {
      student = students[s];
      studentFound = true;
      break;
    }
  }
  
  // email not found in RB tracker
  if (! studentFound) { 
    logIt("Student not found " + student.email, meta);
    student.row = -1;
  }
  
  // Logger.log("Student " + student.email + " is on row " + student.row); 
  return student;  
}
// END getStudent

function createStudent(student) {
  var meta = {'tag': arguments.callee.name, "dest": "L"};

  // already exists?
  if (getStudent(student).row > 0) {
    updateStudent(student);
  
  } else {
    //  create new line in RB Tracker
    student = createPortfolioRow(student);
  }
  
  if (! student.fileId) {
    // create a new file & store its fileid etc in RB Tracker
    createPortfolioFile(student);
  }
  return student; 
}

function createPortfolioRow(student) {
  var meta = {'tag': arguments.callee.name, "dest": "L"};

  // look for student, if not found, add a new row for them
  // return student (including student.row)
  
  if (student.email === undefined) {
    var errMsg = "Cannot create portfolio without email"; 
    logIt(errMsg, meta);
    throw errMsg; 
  }

  if (  student.lastname === undefined ||  student.firstname === undefined || student.year === undefined) {
    logIt(student, meta); 
   
    var errMsg =  "Cannot create portfolio, missing firstname/lastname/year for " + student.email;
    logIt(errMsg, meta); 
    throw errMsg;
  }
  
  var rb = SpreadsheetApp.openById(rbTrackerId);
  var sheet = rb.getSheetByName("Portfolios");
 
  var studentRow = -1;
  var rows = sheet.getDataRange().getValues();
  for (var i=1; i<rows.length; i++) {
    var thisEmail = rows[i][COLS.EMAIL - 1];

    if (thisEmail.indexOf(student.email) == 0) {
      studentRow = i+1;
      // break;
    }  
  }
  
  Logger.log("studentRow: " + studentRow);
  
  if (studentRow != -1) {
    logIt(student, meta);
    // TODO updateStudent(student);
    throw "Cannot create portfolio row, student already exists";
  }
  
  logIt("Creating a new row for student" + student.fullname);
  sheet.appendRow([
    student.lastname, 
    student.firstname, 
    student.email, 
    "", // fullname will be overwritten by a calcuation
    student.year
  ]);
  studentRow = sheet.getLastRow();
  student.row = studentRow;
  
  updatePortfolioFormulas();
  student.fullname = sheet.getRange(student.row, COLS.FULLNAME).getValue();
  student.filename = sheet.getRange(student.row, COLS.FILENAME).getValue();

  student = createPortfolioFile(student);
  
  // store fileid in tracker
  var rb = SpreadsheetApp.openById(rbTrackerId);
  var sheet = rb.getSheetByName("Portfolios");
  sheet.getRange(student.row, COLS.FILEID).setValue(student.fileid);
  
  student.fileid = sheet.getRange(student.row, COLS.FILEID).getValue();
  student.link = sheet.getRange(student.row, COLS.LINK).getValue();
  
  return student;
}
// END getStudentRow


function createPortfolioFile(student) {
  
  if (student.filename === undefined || student.filename.length < 2) {
    throw "Cannot create portfolio file, missing student.filename"  
  }
  
  var pastoralSheetName = "Pastoral";
  
  var templatesId = SpreadsheetApp.openById(rbTemplatesId);
  var pastoralTemplateSheet = templatesId.getSheetByName(pastoralSheetName);
  
  var new_rows = 5;
  var new_cols = 2;
  var studentFile = SpreadsheetApp.create(student.filename, new_rows, new_cols);
  
  var adminSheet = studentFile.getSheets()[0].setName("Admin");
  adminSheet.setName("Admin")
  .getRange("A1:B2")
  .setValues([
    ["Created on",new Date()],
    ["Created by",Session.getActiveUser().getEmail()]
  ]);
  adminSheet.setColumnWidth(2, 200);
  adminSheet.getRange("B:B").setHorizontalAlignment("left");
  
  student.fileid = studentFile.getId();
  
  var pastoralSheet = pastoralTemplateSheet.copyTo(studentFile);
  pastoralSheet.setName("Pastoral");
  pastoralSheet.getRange("B4").setValue(student.fullname);
  
  return student;
}


function updatePortfolioFormulas() {
  
  var formulas = [
    {
      // update fullname
      "sheet": "Portfolios", 
      "cell": "D2", 
      "range": "D3:D", 
      "formula": '=B2 & " " & A2',
      // TODO "r1c1": false
    },
    {
      // update filename
      "sheet": "Portfolios", 
      "cell": "F2", 
      "range": "F3:F", 
      "formula": '=UPPER(A2) & ", " & B2 & " (Sem 1 2018 Report)"',
      // TODO "r1c1": false;
    },
    {
      // update filename
      "sheet": "Portfolios", 
      "cell": "H2", 
      "range": "H3:H", 
      "formula": '=if(istext(G2), HYPERLINK("https://docs.google.com/spreadsheets/d/" & G2 & "/edit", F2), "")',
      // TODO "r1c1": false;
    }
  ];
  
  var rb = SpreadsheetApp.openById(rbTrackerId);
  updateFormulas(rb, formulas);
  
}
