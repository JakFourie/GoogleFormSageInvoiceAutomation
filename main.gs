// This function gets the latest row and header of a Google Sheets spreadsheet, 
// and uses the data to construct a JSON object which is posted to the Sage One Accounting API.
function getLatestRowAndHeader() {
  
  // Open the spreadsheet by ID.
  var ss = SpreadsheetApp.openById("YOUR_SHEET_ID");
  
  // Get all the sheets in the spreadsheet.
  var sheets = ss.getSheets();
  
  // Get the currently active sheet.
  var sheet = ss.getActiveSheet();
  
  // Get the header row of the sheet.
  var header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Get the latest row of the sheet.
  var lastRow = sheet.getLastRow();
  var latestRow = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Create an empty object and array for storing data.
  var data = {};
  var lines = [{}];
  var j = 0
  
  // Loop through each column in the header row.
  for (var i = 0; i < header.length; i++) {
    
    // If the cell in the latest row is not blank and the header is not the "Notes" column.
    if (latestRow[i] != "" && header[i] != "Notes") {
      
      // Store the data in the object with the header as the key.
      data[header[i]] = latestRow[i];
      
      // Get the item name and code from the header.
      var itemName = String(header[i].split('|')[1]).trim()
      var itemCode = String(header[i].split('|')[0]).trim()
      
      // If the item is not a combo and not in the first two columns (timestamp and invoice date).
      if(itemName.toLowerCase().indexOf('combo') == -1 && i > 1) {
        
        // Create a new object for the line item.
        lines[j] = {"TaxTypeId": "2727120", "SelectionId": getItemID(itemCode), "UnitPriceInclusive": getItemPriceIncl(itemCode), "Description": itemName, "Quantity": latestRow[i], "DiscountPercentage": 0}
        
        j++
      }
      
      // If the item is a combo.
      if(itemName.toLowerCase().indexOf('combo') > -1) {
        
        // Split the item codes.
        comboItems = itemCode.split(',');
        
        // Loop through each item code in the combo.
        for( var k = 0; k < comboItems.length; k++) {
          
          // Get the description for the item code.
          var comboItemDescription = getItemDescription(comboItems[k]);
          
          // If the description is not null.
          if(comboItemDescription !== null) {
            // If the item is a tent, set the discount to 0, otherwise set it to 0.1.
            if(comboItemDescription.toLowerCase().indexOf('tent') > 0) {
              var comboDiscount = 0 
            }
            else var comboDiscount = 0.1;
          }

          // Create a new object for the line item.
          lines[j] = {"TaxTypeId": "2727120", "SelectionId": getItemID(comboItems[k]), "UnitPriceInclusive": getItemPriceIncl(comboItems[k]), "Description": comboItemDescription, "Quantity": latestRow[i], "DiscountPercentage": comboDiscount}
        
          j++
        }
      }

       
    }
  }

  //Correct date format
  var invoiceDate = new Date(data['Invoice Date']).toISOString().split('T')[0]

  // Define the body of the POST request with the invoice data
  var body = {
  "Date": invoiceDate,
  "DueDate": invoiceDate,
  "Reference": "Agent",
  "Paid": false,
  "Status": 'Unpaid',
  "Locked": false,
  "Inclusive": true,
  "CustomerId": "XXX",
  "TaxReference": "XXX",
  "PostalAddress01": "XXX",
  "PostalAddress02": "XXX",
  "PostalAddress03": "XXX",
  "PostalAddress04": "XXX",
  "PostalAddress05": "XXX",
  "DeliveryAddress01": "XXX",
  "DeliveryAddress02": "XXX",
  "DeliveryAddress03": "XXX",
  "DeliveryAddress04": "XXX",
  "DeliveryAddress05": "XXX",
  "Lines": lines
  }

  // Set the login credentials for the API endpoint
  var user = '';
  var password = '';

  // Set the headers for the API request
  var headers = {
  "Authorization": "Basic "+ Utilities.base64Encode(user+":"+password),
  'Content-Type': 'application/json',
  "Accept": 'application/json'
  };

  // Set the options for the API request
  var options = {
  "method" : "POST",
  "headers" : headers,
  "payload": JSON.stringify(body)
  };

  // Set the query parameters for the API request
  var query = "{}";//API Key
  var url = "https://accounting.sageone.co.za/api/2.0.0/TaxInvoice/Save" +"?apikey=" + encodeURIComponent(query) + "&companyId=XXXX";

  // Send the API request and get the response
  var response = UrlFetchApp.fetch(url, options);

  // log the response
  Logger.log(response);
}
