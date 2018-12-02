// files.gs ====================================================
// imports files newly shared to Klaus, adds them to the tracker
// =============================================================

// wrapper to move newly shared files to Reportbooks folder 
// then add them to the Reportbook Tracker
function listReportbooks() {
  Logger.log("Moving any newly shared reportbooks into the Reportbooks folder");
  movedFiles = moveSharedReportbooks();
  if (movedFiles.length > 0) {
    Logger.log(movedFiles);
  }
  
  Logger.log("Copying list of files in Reportbooks folder to Reportbooks Tracker spreadsheet");
  listOfRBs = listFolderIntoSheet('Reportbooks');
  
  copyReportbooksDataToTracker();
}

// generates a spreadsheet containing id, title, URL and owner for each item in the Reportbooks folder (top-level)
function listFolderIntoSheet(foldername) {
  // var foldername = '';
  var filename = 'list ' + foldername;
  var folderID =  folderRB;
  var folder = DriveApp.getFolderById(folderID);
  var contents = folder.getFiles();
  var src_id = "1EAW-XHHtA1gIFoXe3sruqTHXtKi07xBxP4oXbWObCgU";
  
  try {
    var ss = SpreadsheetApp.openById(src_id);
    Logger.log('Successfully opened file ' + src_id);
    }
  
  catch (err) {
    Logger.log(err)
    var ss = SpreadsheetApp.create(filename);
    var src_id = ss.getId();
    Logger.log('Created new listing file: ' + src_id);
  }
  
  var fileId = ss.getId();
  Logger.log('fileId: ' + fileId);
  
  var sheets = ss.getSheets();
  var sheet = ss.setActiveSheet(sheets[0]);
  sheet.clearContents();
    
  var id, file, title, link, owner, name;
  var row;
  var cells = [];
  
  while(contents.hasNext()) {
    file = contents.next();
    id = file.getId();
    title = file.getName();
    link = file.getUrl();
    owner = file.getOwner().getName();
    name = file.getOwner().getEmail();
    
    cells.push([id, title, link, owner, name]);
  }

  cells.sort(Comparator);
  cells = [['id', 'title', 'link', 'owner', 'email']].concat(cells);
  
  Logger.log("Got the cells");
  //Logger.log(cells);
  sheet.getRange(1, 1, cells.length, cells[0].length).setValues(cells);

  return true;

};



// copy & paste columns A-D from 'list Reportbooks' to 'Reportbooks Tracker'
function copyReportbooksDataToTracker() {
  var src_id = "1EAW-XHHtA1gIFoXe3sruqTHXtKi07xBxP4oXbWObCgU";
  var src = SpreadsheetApp.openById(src_id);
  var dev_dest_id = "155iI_z7IuBsjodEWBPFPgzW9QcbiwYqA3yrI8BP55-w";
  var dest_id = "1D3OEcKrRIWpJmopP07u-KWh6sQHae2Q3dSTzo6uMFVc";
  
  if (testing) {
    dest_id = dev_dest_id; 
  }
  Logger.log('dest_id: ' + dest);
  
  // copy cells
  var cells = src.getRange("A1:D").getValues();  
  Logger.log(cells);
  
  var dest = SpreadsheetApp.openById(dest_id);
  Logger.log(dest.getName());

  var sheets = dest.getSheets();
  var sheet = dest.setActiveSheet(sheets[0]);

  // paste cells
  sheet.getRange(1, 1, cells.length, cells[0].length).setValues(cells);
}


function createPdf(ss, sheetNum, studentNames) {
  if (studentNames === undefined) {
    studentNames = [];
  }
  var sheets = ss.getSheets();
  
  // hide all the sheets we DON'T want in the export
  sheets.forEach(function (s, i) {
    if(i !== sheetNum) s.hideSheet()
      });
  
  // create url to request pdf of current doc
  var url = DriveApp.Files.get(ss.getId())
  .exportLinks['application/pdf'];
  
  url = url + '&size=a4' + //paper size
    '&portrait=false' + //orientation, false for landscape
      '&fitw=true' + //fit to width, false for actual size
        '&sheetnames=false&printtitle=false&pagenumbers=false' + //hide optional
          '&gridlines=false' + //false = hide gridlines
            '&fzr=false'; //do not repeat row headers (frozen rows) on each page
  
  var token = ScriptApp.getOAuthToken();
  
  var fileName = ss.getName();
  
  for (var s in studentNames) {
    // newFilename: SUB whatever Y00 Tom Kershaw
    var studentName = studentNames[s];
    var newFileName = fileName.replace("Reportbook", studentName);
    Logger.log(newFileName);
    
    var pdfCreated = false;
    do {
    
      try {
        
        var response = UrlFetchApp.fetch(url, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        Logger.log(response.getResponseCode());
        
        DriveApp.createFile(response.getBlob()).setName(newFileName);
        pdfCreated = true;
      } 
      
      catch (error) {
        Logger.log(error);
      }
      
    } while (! pdfCreated);
    
  
    // unhide the sheets
    sheets.forEach(function (s) {
      s.showSheet();
    })
  }
}

// [START reportbooks_export_grades_page_to_pdf]
/**
 * Export a PDF of the Grades tab for each Sheet in Reportbooks folder.
 * @param {string} folderId The folder ID to save PDFs into.
 */
function exportGradesToPDF(srcFolderId, sheetName, destFolderId) {
  // var srcFiles = listFiles(srcFolderId);
  var srcFileIds = [
    //'1KeLj6BLp_-_sJZ5FUtuR477C9N9Do1audaQ_Py73iI0',
    //'1La0LBYqGgeHLB0ABaCf3KeGtEjdFeirJzi2T3xD1EJo',
    //'1FHNn2CbsB7ozBsTzIqjU94YxevRM-5O2yx-fUnAb1Fk',
    '1UV9BysLHpyz4_ycPaV9QO1LxumJYW02umDGQXU2RG-s'];
  
  var studentNames = [
      'Shaleem Abid',
      'Elizabeth Jayne Bennett',
      'Lily Blair',
      'Abigail Bryce',
      ];
    
  for (var i in srcFileIds) { // filesInReportbookFolder) {
    var id = srcFileIds[i];
    var file = DriveApp.getFileById(id);
    Logger.log (file.getName());
    var ss = SpreadsheetApp.open(file);
    
    createPdf(ss, 2, studentNames);
  }   
};
// [END apps_script_sheets_write_range]


function exportStudentsToPDF(sourceFolder, sheetName, folderId) {
  // var filesInReportbookFolder = list of files in Reportbooks folder;
  // 
  // foreach (rb in filesInReportbookFolder) {
  //   open rb;
  //   var studentNames = get list of names from grades tab
  //   foreach (rb in studentNames) {
  //     showSheets(["Individual Report"]);
  //     exportToPDF();
  //     showSheets([]);
  //   }
  // }
};



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


// new wrapper - TODO???
function updateTracker() {
  // var filesInRBFolder = list of files in Reportbooks folder
  // var sharedRBs = list of files containing 'Reportbooks', owner != 'Klaus'
  // foreach (rb in sharedRBs) {
  //   if (rb not in fileInRBFolder) {
  //     moveFile(rb, rbFolder);
  //   }
  // }
}




// Log the name of every file in the user's Drive.
function listMatchingFiles() {
  var files = DriveApp.searchFiles('title contains "Reportbook"');
  while (files.hasNext()) {
    var file = files.next();
    Logger.log(file.getName());
  }
}

function moveSharedReportbooks() {
  var destFolder = DriveApp.getFolderById(folderRB); 
  var destFolderName = destFolder.getName();
  
  var matches = sharedWithMe('reportbook');
  var fileId, file, name, owner; 
  var parents, parent, alreadyInRBFolder;
  var movedFiles = [];
  var trackerRBs = getRbIds();
  
  for (var i in matches) {
    if (i > 10) break;
    
    fileId = matches[i];
    Logger.log(DriveApp.getFileById(fileId) + ": " + trackerRBs.indexOf(fileId));
    if (typeof fileId != 'undefined' && trackerRBs.indexOf(fileId) == -1) {
      file = DriveApp.getFileById(fileId);
      name = file.getName();
      owner = file.getOwner().getName()
      
      Logger.log("Checking " + name + " owned by " + owner);
  
      if (owner != klaus.name) {
          Logger.log("Moving " + name);
          destFolder.addFile(file);
          movedFiles.push(file);
        
      }
    }
  }
  return movedFiles;
}

function sharedWithMe(s) {
  var files = DriveApp.searchFiles(
    'sharedWithMe');
  var word = s.toLowerCase();
  var matches = [];
  while (files.hasNext()) {
    var file = files.next();
    var name = file.getName();
    if (typeof file != 'undefined' && name.toLowerCase().indexOf(word) > -1) {
      matches.push(file.getId());
    }
  }
  return matches;
}


// Log the name of every folder in the user's Drive.
function listFolders() {
  var folders = DriveApp.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    Logger.log(folder.getName());
  }
}

// sort by columns
function Comparator(arrayA, arrayB) {
  var sort1 = 3;
  var sort2 = 1;
  
  if (arrayA[sort1] < arrayB[sort1]) return -1;
  if (arrayA[sort1] > arrayB[sort1]) return 1;
  
  // sort1 = same
  if (arrayA[sort2] < arrayB[sort2]) return -1;
  if (arrayA[sort2] > arrayB[sort2]) return 1;
  
  // both columns match (same same)
  return 0;
}






