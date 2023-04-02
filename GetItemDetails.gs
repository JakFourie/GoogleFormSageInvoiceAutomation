/**
 * Gets the ID of an item from a Google Sheets database based on a search value
 * @param {string} searchValue - The value to search for in the Sheets database
 * @return {string} The ID of the item
 */
function getItemID(searchValue) {
  
  // Open the spreadsheet by ID
  var ss = SpreadsheetApp.openById("ItemDetailsSheetID");
  var sheets = ss.getSheets();
  var sheet = ss.getActiveSheet();
  
  // Define the range to search within
  var range = sheet.getRange('A1:E100'); // adjust the range as needed
  var values = range.getValues();

  // Loop through the rows and columns of the range to find the search value
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    for (var j = 0; j < row.length; j++) {

      if (String(row[j]) === String(searchValue)) {
        // If the search value is found, get the ID from the first column
        var rowIndex = i + 1;
        var foundRange = sheet.getRange(rowIndex, 1);
        var foundValue = foundRange.getValue();
        
        // Return the ID as a string
        return String(foundValue);
      }
    }
  }

}

/**
 * Gets the price (inclusive) of an item from a Google Sheets database based on a search value
 * @param {string} searchValue - The value to search for in the Sheets database
 * @return {string} The price (inclusive) of the item
 */
function getItemPriceIncl(searchValue) {

  // Open the spreadsheet by ID
  var ss = SpreadsheetApp.openById("ItemDetailsSheetID");
  var sheets = ss.getSheets();
  var sheet = ss.getActiveSheet();
  
  // Define the range to search within
  var range = sheet.getRange('A1:E100'); // adjust the range as needed
  var values = range.getValues();

  // Loop through the rows and columns of the range to find the search value
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    for (var j = 0; j < row.length; j++) {
      if (String(row[j]) === String(searchValue)) {
        // If the search value is found, get the price (inclusive) from the fifth column
        var rowIndex = i + 1;
        var foundRange = sheet.getRange(rowIndex, 5);
        var foundValue = foundRange.getValue();

        // Return the price (inclusive) as a string
        return String(foundValue);
      }
    }
  }
}

// This function takes in a searchValue and returns the item description for the corresponding row in the active sheet of the Google Sheet with ID "1BOizIykX5Da3rQ0IO0Q3aH3yD2X5kqF5TEJWTCuyYt0".
function getItemDescription(searchValue) {

  var ss = SpreadsheetApp.openById("ItemDetailsSheetID"); // Open the Google Sheet with the given ID and assign it to a variable.
  var sheets = ss.getSheets(); // Get all sheets in the Google Sheet and assign them to a variable.
  var sheet = ss.getActiveSheet(); // Get the active sheet in the Google Sheet and assign it to a variable.
  
  var range = sheet.getRange('A1:E100'); // Define the range of cells to search for the searchValue. In this case, the range is A1:E100.
  var values = range.getValues(); // Get the values within the defined range and assign them to a variable.

  // Loop through each row in the range and check if the searchValue matches any cell values in the row.
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    for (var j = 0; j < row.length; j++) {
      if (String(row[j]) === String(searchValue)) { // If a match is found, get the corresponding row index and assign it to a variable.
        var rowIndex = i + 1;

        var foundRange = sheet.getRange(rowIndex, 3); // Get the cell in column 3 of the corresponding row and assign it to a variable.
        var foundValue = foundRange.getValue(); // Get the value of the cell and assign it to a variable.

        return String(foundValue); // Return the found value as a string.
      }
    }
  }

}
