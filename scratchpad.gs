function falsey() {
  // falsy values
  if (false) Logger.log("True!");
  if (null) Logger.log("True!");
  if (undefined) Logger.log("True!");
  if (0) Logger.log("True!");
  if (NaN) Logger.log("True!");
  if ('') Logger.log("True!");
  if ("") Logger.log("True!");
  if ([]) Logger.log("Empty array => true!");
  if ({}) Logger.log("Empty object => true!");
  
  student = {}
  Logger.log(! student.email);
}
// Old scale: SCI Y07 Reportbook - done
// Old scale: MAT Y06 Reportbook - done
// Old scale: ENG A 2018 Y07 Reportbook - done
// Old scale: DRA Y06 Reportbook - done
// Old scale: DRA Y07 Reportbook - done
// Old scale: DRA Y08 Reportbook - done
// Old scale: DRA Y09 Reportbook - done
// Old scale: MAT SL Y12 Reportbook
// Old scale: PED Y06 Reportbook - done
// Old scale: PED Y08 Reportbook
// Old scale: PED Y09 Reportbook
// Old scale: PED Y10 Reportbook
// Old scale: ENG IB A 2018-20 Y11 Reportbook
// Old scale: ENG IB A 2019-20 Y12 Reportbook
// Old scale: MUS Y06 Reportbook
// Old scale: MUS Y07 Reportbook
// Old scale: CPE Y10 Reportbook

//function includes_test() {
//  var array1 = [1, 2, 3];
//  
//  Logger.log(array1.indexOf(2));
//  // expected output: true
//  
//  var pets = ['cat', 'dog', 'bat'];
//  
//  Logger.log(pets.indexOf('cat'));
//  // expected output: true
//  
//  Logger.log(pets.indexOf('at'));
//  // expected output: false
//}
//
//function dataValidationTest() {
//  var aaa = "1CGQAR4QafGnC_LarUQqECY2Fy9Dv8jBkIsNlwUyuS3Y";
//  // Set the data-validation rule for cell A3 to require a value from B1:B10.
//  var ss = SpreadsheetApp.openById(aaa);
//  var sheet = ss.getSheetByName("Grades");
//  var cell = sheet.getRange('A3');
//  var valuesRange = sheet.getRange('D7:D33');
//  var namesValidation = SpreadsheetApp
//  .newDataValidation()
//  .requireValueInRange(valuesRange)
//  .build();
//
//  var checkboxValidation = SpreadsheetApp
//  .newDataValidation()
//  .requireCheckbox("Y", "N")
//  .build();
//
//  cell.setDataValidation(namesValidation); 
//  sheet.getRange("AB7:AB").setDataValidation(checkboxValidation); 
//}
//
//
//[18-11-30 18:19:51:148 ICT] {createStudentRBs=
//function createStudentRBs() {
//    var students = getStudents();
//    for (var s in students) {
//        student = students[s];
//        student.fileid = getStudent(student, students).fileid;
//    }
//}
//, demoName=John Chung, grabStuff=
//function grabStuff() {
//    console.info("Starting the %s function (%d arguments)", "grabStuff", 1);
//    var rb = SpreadsheetApp.openById(rbTrackerId);
//    var sheet = rb.getSheetByName("Y07");
//    var titles = sheet.getRange("A1:F1").getValues();
//    console.info(titles);
//    var formula = sheet.getRange("D2").getFormula();
//    console.info(formula);
//}
//, UrlFetchApp=UrlFetchApp, insertText=
//function insertText(newText) {
//    var selection = DocumentApp.getActiveDocument().getSelection();
//    if (selection) {
//        var replaced = false;
//        var elements = selection.getSelectedElements();
//        if (elements.length === 1 && elements[0].getElement().getType() === DocumentApp.ElementType.INLINE_IMAGE) {
//            throw new Error("Can't insert text into an image.");
//        }
//        for (var i = 0; i < elements.length; ++i) {
//            if (elements[i].isPartial()) {
//                var element = elements[i].getElement().asText();
//                var startIndex = elements[i].getStartOffset();
//                var endIndex = elements[i].getEndOffsetInclusive();
//                element.deleteText(startIndex, endIndex);
//                if (!replaced) {
//                    element.insertText(startIndex, newText);
//                    replaced = true;
//                } else {
//                    var parent = element.getParent();
//                    var remainingText = element.getText().substring(endIndex + 1);
//                    parent.getPreviousSibling().asText().appendText(remainingText);
//                    if (parent.getNextSibling()) {
//                        parent.removeFromParent();
//                    } else {
//                        element.removeFromParent();
//                    }
//                }
//            } else {
//                var element = elements[i].getElement();
//                if (!replaced && element.editAsText) {
//                    element.clear();
//                    element.asText().setText(newText);
//                    replaced = true;
//                } else {
//                    if (element.getNextSibling()) {
//                        element.removeFromParent();
//                    } else {
//                        element.clear();
//                    }
//                }
//            }
//        }
//    } else {
//        var cursor = DocumentApp.getActiveDocument().getCursor();
//        var surroundingText = cursor.getSurroundingText().getText();
//        var surroundingTextOffset = cursor.getSurroundingTextOffset();
//        if (surroundingTextOffset > 0) {
//            if (surroundingText.charAt(surroundingTextOffset - 1) != " ") {
//                newText = " " + newText;
//            }
//        }
//        if (surroundingTextOffset < surroundingText.length) {
//            if (surroundingText.charAt(surroundingTextOffset) != " ") {
//                newText += " ";
//            }
//        }
//        cursor.insertText(newText);
//    }
//}
//, demoSsId=1UV9BysLHpyz4_ycPaV9QO1LxumJYW02umDGQXU2RG-s, UiApp=UiApp, moveSharedReportbooks=
//function moveSharedReportbooks() {
//    var destFolder = DriveApp.getFolderById(folderRB);
//    var destFolderName = destFolder.getName();
//    var matches = sharedWithMe("reportbook");
//    var fileId, file, name, owner;
//    var parents, parent, alreadyInRBFolder;
//    var movedFiles = [];
//    var trackerRBs = getRbIds();
//    for (var i in matches) {
//        if (i > 10) {
//            break;
//        }
//        fileId = matches[i];
//        Logger.log(DriveApp.getFileById(fileId) + ": " + trackerRBs.indexOf(fileId));
//        if (typeof fileId != "undefined" && trackerRBs.indexOf(fileId) == -1) {
//            file = DriveApp.getFileById(fileId);
//            name = file.getName();
//            owner = file.getOwner().getName();
//            Logger.log("Checking " + name + " owned by " + owner);
//            if (owner != klaus.name) {
//                Logger.log("Moving " + name);
//                destFolder.addFile(file);
//                movedFiles.push(file);
//            }
//        }
//    }
//    return movedFiles;
//}
//, LinearOptimizationService=LinearOptimizationService, BigNumber=0, updateTracker=
//function updateTracker() {
//}
//, listGradesForTom=
//function listGradesForTom() {
//    var studentId = "tom.kershaw@students.hope.edu.kh";
//    var courseId = "16063195662";
//    listGrades(courseId, studentId);
//}
//, getTextAndTranslation=
//function getTextAndTranslation(origin, dest, savePrefs) {
//    if (savePrefs) {
//        PropertiesService.getUserProperties().setProperty("originLang", origin).setProperty("destLang", dest);
//    }
//    var text = getSelectedText().join("\n");
//    return {text:text, translation:translateText(text, origin, dest)};
//}
//, LockService=LockService, mrkershaw=1.0755411246309478E20, testing=false, updateConditionalFormatting=
//function updateConditionalFormatting(ss) {
//    var conditionalFormatRules = ss.getActiveSheet().getConditionalFormatRules();
//    ss.getActiveSheet().setConditionalFormatRules(conditionalFormatRules);
//    conditionalFormatRules = ss.getActiveSheet().getConditionalFormatRules();
//    conditionalFormatRules.splice(conditionalFormatRules.length - 1, 1, SpreadsheetApp.newConditionalFormatRule().setRanges([ss.getRange("Z7:Z46")]).whenTextEqualTo("y").setBackground("#FF00FF").build());
//    ss.getActiveSheet().setConditionalFormatRules(conditionalFormatRules);
//}
//, tom_grades_ict9={studentSubmissions=[{creationTime=2018-09-19T04:10:45.514Z, updateTime=2018-09-26T05:03:42.217Z, courseWorkId=17017362948, userId=109260139188842571634, courseWorkType=ASSIGNMENT, draftGrade=100.0, assignedGrade=100.0, alternateLink=http://classroom.google.com/c/MTYwNjMxOTU2NjJa/a/MTcwMTczNjI5NDha/submissions/student/Mjk3MzM1MTVa, id=CgsIi-WWDhCEtMGyPw, state=RETURNED, submissionHistory=[{stateHistory={actorUserId=109260139188842571634, stateTimestamp=2018-09-19T04:10:45.456Z, state=CREATED}}, {stateHistory={actorUserId=109260139188842571634, stateTimestamp=2018-09-19T04:59:55.563Z, state=TURNED_IN}}, {gradeHistory={gradeTimestamp=2018-09-26T05:02:57.923Z, pointsEarned=100.0, actorUserId=107554112463094781867, maxPoints=100.0, gradeChangeType=DRAFT_GRADE_POINTS_EARNED_CHANGE}}, {stateHistory={actorUserId=107554112463094781867, stateTimestamp=2018-09-26T05:03:42.213Z, state=RETURNED}}, {gradeHistory={gradeTimestamp=2018-09-26T05:03:42.217Z, pointsEarned=100.0, actorUserId=107554112463094781867, maxPoints=100.0, gradeChangeType=ASSIGNED_GRADE_POINTS_EARNED_CHANGE}}], courseId=16063195662, assignmentSubmission={attachments=[{driveFile={alternateLink=https://drive.google.com/open?id=11nvg7RSWWK1JR7lJbguG3WuciQ3oZ9Bl93_00T9oMl4, id=11nvg7RSWWK1JR7lJbguG3WuciQ3oZ9Bl93_00T9oMl4, title=Google Drive Quiz, thumbnailUrl=https://drive.google.com/thumbnail?id=11nvg7RSWWK1JR7lJbguG3WuciQ3oZ9Bl93_00T9oMl4&sz=s200}}]}}, {creationTime=2018-09-05T04:29:04.513Z, updateTime=2018-09-05T05:04:42.120Z, courseWorkId=16576592952, userId=109260139188842571634, courseWorkType=ASSIGNMENT, draftGrade=20.0, assignedGrade=20.0, alternateLink=http://classroom.google.com/c/MTYwNjMxOTU2NjJa/a/MTY1NzY1OTI5NTJa/submissions/student/Mjk3MzM1MTVa, id=CgsIi-WWDhC4-KrgPQ, state=RETURNED, submissionHistory=[{stateHistory={actorUserId=109260139188842571634, stateTimestamp=2018-09-05T04:29:04.503Z, state=CREATED}}, {gradeHistory={gradeTimestamp=2018-09-05T04:56:58.385Z, pointsEarned=20.0, actorUserId=107554112463094781867, maxPoints=20.0, gradeChangeType=DRAFT_GRADE_POINTS_EARNED_CHANGE}}, {gradeHistory={gradeTimestamp=2018-09-05T04:56:58.385Z, pointsEarned=20.0, actorUserId=107554112463094781867, maxPoints=20.0, gradeChangeType=DRAFT_GRADE_POINTS_EARNED_CHANGE}}, {stateHistory={actorUserId=109260139188842571634, stateTimestamp=2018-09-05T04:56:58.884Z, state=TURNED_IN}}, {stateHistory={actorUserId=107554112463094781867, stateTimestamp=2018-09-05T05:04:42.117Z, state=RETURNED}}, {gradeHistory={gradeTimestamp=2018-09-05T05:04:42.120Z, pointsEarned=20.0, actorUserId=107554112463094781867, maxPoints=20.0, gradeChangeType=ASSI
//[18-11-30 18:19:51:150 ICT] {text=???> Message, dest=L}
//[18-11-30 18:19:51:156 ICT] {createStudentRBs=
//function createStudentRBs() {
//    var students = getStudents();
//    for (var s in students) {
//        student = students[s];
//        student.fileid = getStudent(student, students).fileid;
//    }
//}
//, demoName=John Chung, grabStuff=
//function grabStuff() {
//    console.info("Starting the %s function (%d arguments)", "grabStuff", 1);
//    var rb = SpreadsheetApp.openById(rbTrackerId);
//    var sheet = rb.getSheetByName("Y07");
//    var titles = sheet.getRange("A1:F1").getValues();
//    console.info(titles);
//    var formula = sheet.getRange("D2").getFormula();
//    console.info(formula);
//}
//, UrlFetchApp=UrlFetchApp, insertText=
//function insertText(newText) {
//    var selection = DocumentApp.getActiveDocument().getSelection();
//    if (selection) {
//        var replaced = false;
//        var elements = selection.getSelectedElements();
//        if (elements.length === 1 && elements[0].getElement().getType() === DocumentApp.ElementType.INLINE_IMAGE) {
//            throw new Error("Can't insert text into an image.");
//        }
//        for (var i = 0; i < elements.length; ++i) {
//            if (elements[i].isPartial()) {
//                var element = elements[i].getElement().asText();
//                var startIndex = elements[i].getStartOffset();
//                var endIndex = elements[i].getEndOffsetInclusive();
//                element.deleteText(startIndex, endIndex);
//                if (!replaced) {
//                    element.insertText(startIndex, newText);
//                    replaced = true;
//                } else {
//                    var parent = element.getParent();
//                    var remainingText = element.getText().substring(endIndex + 1);
//                    parent.getPreviousSibling().asText().appendText(remainingText);
//                    if (parent.getNextSibling()) {
//                        parent.removeFromParent();
//                    } else {
//                        element.removeFromParent();
//                    }
//                }
//            } else {
//                var element = elements[i].getElement();
//                if (!replaced && element.editAsText) {
//                    element.clear();
//                    element.asText().setText(newText);
//                    replaced = true;
//                } else {
//                    if (element.getNextSibling()) {
//                        element.removeFromParent();
//                    } else {
//                        element.clear();
//                    }
//                }
//            }
//        }
//    } else {
//        var cursor = DocumentApp.getActiveDocument().getCursor();
//        var surroundingText = cursor.getSurroundingText().getText();
//        var surroundingTextOffset = cursor.getSurroundingTextOffset();
//        if (surroundingTextOffset > 0) {
//            if (surroundingText.charAt(surroundingTextOffset - 1) != " ") {
//                newText = " " + newText;
//            }
//        }
//        if (surroundingTextOffset < surroundingText.length) {
//            if (surroundingText.charAt(surroundingTextOffset) != " ") {
//                newText += " ";
//            }
//        }
//        cursor.insertText(newText);
//    }
//}
//, demoSsId=1UV9BysLHpyz4_ycPaV9QO1LxumJYW02umDGQXU2RG-s, UiApp=UiApp, moveSharedReportbooks=
//function moveSharedReportbooks() {
//    var destFolder = DriveApp.getFolderById(folderRB);
//    var destFolderName = destFolder.getName();
//    var matches = sharedWithMe("reportbook");
//    var fileId, file, name, owner;
//    var parents, parent, alreadyInRBFolder;
//    var movedFiles = [];
//    var trackerRBs = getRbIds();
//    for (var i in matches) {
//        if (i > 10) {
//            break;
//        }
//        fileId = matches[i];
//        Logger.log(DriveApp.getFileById(fileId) + ": " + trackerRBs.indexOf(fileId));
//        if (typeof fileId != "undefined" && trackerRBs.indexOf(fileId) == -1) {
//            file = DriveApp.getFileById(fileId);
//            name = file.getName();
//            owner = file.getOwner().getName();
//            Logger.log("Checking " + name + " owned by " + owner);
//            if (owner != klaus.name) {
//                Logger.log("Moving " + name);
//                destFolder.addFile(file);
//                movedFiles.push(file);
//            }
//        }
//    }
//    return movedFiles;
//}
//, LinearOptimizationService=LinearOptimizationService, BigNumber=0, updateTracker=
//function updateTracker() {
//}
//, listGradesForTom=
//function listGradesForTom() {
//    var studentId = "tom.kershaw@students.hope.edu.kh";
//    var courseId = "16063195662";
//    listGrades(courseId, studentId);
//}
//, getTextAndTranslation=
//function getTextAndTranslation(origin, dest, savePrefs) {
//    if (savePrefs) {
//        PropertiesService.getUserProperties().setProperty("originLang", origin).setProperty("destLang", dest);
//    }
//    var text = getSelectedText().join("\n");
//    return {text:text, translation:translateText(text, origin, dest)};
//}
//, LockService=LockService, mrkershaw=1.0755411246309478E20, testing=false, updateConditionalFormatting=
//function updateConditionalFormatting(ss) {
//    var conditionalFormatRules = ss.getActiveSheet().getConditionalFormatRules();
//    ss.getActiveSheet().setConditionalFormatRules(conditionalFormatRules);
//    conditionalFormatRules = ss.getActiveSheet().getConditionalFormatRules();
//    conditionalFormatRules.splice(conditionalFormatRules.length - 1, 1, SpreadsheetApp.newConditionalFormatRule().setRanges([ss.getRange("Z7:Z46")]).whenTextEqualTo("y").setBackground("#FF00FF").build());
//    ss.getActiveSheet().setConditionalFormatRules(conditionalFormatRules);
//}
//, tom_grades_ict9={studentSubmissions=[{creationTime=2018-09-19T04:10:45.514Z, updateTime=2018-09-26T05:03:42.217Z, courseWorkId=17017362948, userId=109260139188842571634, courseWorkType=ASSIGNMENT, draftGrade=100.0, assignedGrade=100.0, alternateLink=http://classroom.google.com/c/MTYwNjMxOTU2NjJa/a/MTcwMTczNjI5NDha/submissions/student/Mjk3MzM1MTVa, id=CgsIi-WWDhCEtMGyPw, state=RETURNED, submissionHistory=[{stateHistory={actorUserId=109260139188842571634, stateTimestamp=2018-09-19T04:10:45.456Z, state=CREATED}}, {stateHistory={actorUserId=109260139188842571634, stateTimestamp=2018-09-19T04:59:55.563Z, state=TURNED_IN}}, {gradeHistory={gradeTimestamp=2018-09-26T05:02:57.923Z, pointsEarned=100.0, actorUserId=107554112463094781867, maxPoints=100.0, gradeChangeType=DRAFT_GRADE_POINTS_EARNED_CHANGE}}, {stateHistory={actorUserId=107554112463094781867, stateTimestamp=2018-09-26T05:03:42.213Z, state=RETURNED}}, {gradeHistory={gradeTimestamp=2018-09-26T05:03:42.217Z, pointsEarned=100.0, actorUserId=107554112463094781867, maxPoints=100.0, gradeChangeType=ASSIGNED_GRADE_POINTS_EARNED_CHANGE}}], courseId=16063195662, assignmentSubmission={attachments=[{driveFile={alternateLink=https://drive.google.com/open?id=11nvg7RSWWK1JR7lJbguG3WuciQ3oZ9Bl93_00T9oMl4, id=11nvg7RSWWK1JR7lJbguG3WuciQ3oZ9Bl93_00T9oMl4, title=Google Drive Quiz, thumbnailUrl=https://drive.google.com/thumbnail?id=11nvg7RSWWK1JR7lJbguG3WuciQ3oZ9Bl93_00T9oMl4&sz=s200}}]}}, {creationTime=2018-09-05T04:29:04.513Z, updateTime=2018-09-05T05:04:42.120Z, courseWorkId=16576592952, userId=109260139188842571634, courseWorkType=ASSIGNMENT, draftGrade=20.0, assignedGrade=20.0, alternateLink=http://classroom.google.com/c/MTYwNjMxOTU2NjJa/a/MTY1NzY1OTI5NTJa/submissions/student/Mjk3MzM1MTVa, id=CgsIi-WWDhC4-KrgPQ, state=RETURNED, submissionHistory=[{stateHistory={actorUserId=109260139188842571634, stateTimestamp=2018-09-05T04:29:04.503Z, state=CREATED}}, {gradeHistory={gradeTimestamp=2018-09-05T04:56:58.385Z, pointsEarned=20.0, actorUserId=107554112463094781867, maxPoints=20.0, gradeChangeType=DRAFT_GRADE_POINTS_EARNED_CHANGE}}, {gradeHistory={gradeTimestamp=2018-09-05T04:56:58.385Z, pointsEarned=20.0, actorUserId=107554112463094781867, maxPoints=20.0, gradeChangeType=DRAFT_GRADE_POINTS_EARNED_CHANGE}}, {stateHistory={actorUserId=109260139188842571634, stateTimestamp=2018-09-05T04:56:58.884Z, state=TURNED_IN}}, {stateHistory={actorUserId=107554112463094781867, stateTimestamp=2018-09-05T05:04:42.117Z, state=RETURNED}}, {gradeHistory={gradeTimestamp=2018-09-05T05:04:42.120Z, pointsEarned=20.0, actorUserId=107554112463094781867, maxPoints=20.0, gradeChangeType=ASSI
//[18-11-30 18:19:51:159 ICT] {text=myFn> Message, dest=L}
