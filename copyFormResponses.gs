function onFormSubmit(e) {
  var form = FormApp.openById('<FORM_ID>');
  var values = e.namedValues;
  copyResponses(values);
}

function copyResponses(valuesToAdd) {
  var spreadSheet = SpreadsheetApp.openById('<SPREAD_SHEET_ID>') // Set ID of spreadsheet which you can find in URL between '...spreadsheets/d/' and '/edit...'
  var sheet = spreadSheet.getSheetByName('<DESTINATION_SHEET_NAME>'); // Set name of the specific sheet in the file, e.g. 'Response copies'
  
  var firstRowRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  var firstRowValues = firstRowRange.getValues()[0];

  var lastRow = sheet.getLastRow();
  var targetRow = lastRow + 1;

  // Convert the namedValues object to an array of values in the order they should appear in the sheet
  var formResponseValues = [];
  for (var i = 0; i < firstRowValues.length; i++) {
    var propName = firstRowValues[i]
    if (valuesToAdd.hasOwnProperty(propName)) {
      formResponseValues.push(valuesToAdd[propName][0]);
    } else {
      formResponseValues.push("null");
      Logger.log(propName + ' not in ' + valuesToAdd)
    }
  }
  sheet.getRange(targetRow, 1, 1, formResponseValues.length).setValues([formResponseValues]);
}
