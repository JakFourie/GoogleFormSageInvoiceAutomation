// Function to retrieve data from Sage accounting API and add it to a Google Sheets document
function myFunction() {
  
  // Set API credentials
  var user = '';
  var password = '';
  
  // Set headers for API request
  var headers = {
    "Authorization": "Basic "+ Utilities.base64Encode(user+":"+password)
  };

  // Set options for API request
  var options = {
    "method" : "get",
    "headers" : headers,
    "muteHttpExceptions": true
  };

  // Set query string
  var query = "{}";//API Key

  ///////////////////////Page 1///////////////////////////////////////////////////////////////////////

  // Set URL for API request for page 1
  var url = "https://accounting.sageone.co.za/api/2.0.0/Item/Get" +"?apikey=" + encodeURIComponent(query) + "&companyId=XXX&includeAdditionalItemPrices=false&$skip=0";
  
  // Fetch response from API
  var response = UrlFetchApp.fetch(url, options);
  
  // Parse response from API and get data
  var json = response.getContentText();
  var dataSet = JSON.parse(json).Results;

  // Add selected data to an array
  var rows = [],
      data;
  
  for (i = 0; i < dataSet.length; i++) {
    data = dataSet[i];
    //Limit to certain items
    if ((data.Description.indexOf("Test") > -1 || data.Code.indexOf("Cons") > -1 && data.Code != "Consult") && data.Active != false) {
      rows.push([data.ID, data.Code, data.Description, data.PriceInclusive ]);
    }
  }

  // Add data to active sheet of target Google Sheets document
  var ss = SpreadsheetApp.openById("ItemDetailsSheet");
  var sheet = ss.getActiveSheet();
  
  var dataRange = sheet.getRange(4, 1, rows.length, 4);
  dataRange.setValues(rows);
  var newStart = rows.length + 4;
  
  ////////////////////////////////////////Page 2////////////////////////////////////////////////////////////////

  // Set URL for API request for page 2
  var url = "https://accounting.sageone.co.za/api/2.0.0/Item/Get" +"?apikey=" + encodeURIComponent(query) + "&companyId=XXX&includeAdditionalItemPrices=false&$skip=100";
  
  // Fetch response from API
  var response = UrlFetchApp.fetch(url, options);

  // Parse response from API and get data
  var json = response.getContentText();
  var dataSet = JSON.parse(json).Results;

  // Add selected data to an array
  var rows = [],
      data;
  
  for (i = 0; i < dataSet.length; i++) {
    data = dataSet[i];
    //Limit to certain items
    if ((data.Description.indexOf("Test") > -1 || data.Code.indexOf("Cons") > -1 && data.Code != "Consult") && data.Active != false) {
      rows.push([data.ID, data.Code, data.Description, data.PriceInclusive ]);
    }
  }

  // Add data to active sheet of target Google Sheets document
  var dataRange = sheet.getRange(newStart, 1, rows.length, 4);
  dataRange.setValues(rows);
  var newStart = rows.length + newStart;
  
 
