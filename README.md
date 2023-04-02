# GoogleFormSageInvoiceAutomation
This script is written in Google Apps Script and is designed to automate a data entry process for creating invoices in Sage One accounting software.

Using ChatGPT:

The function getLatestRowAndHeader() gets the header row and the latest data row from the active sheet of the Google Spreadsheet with a specific ID. It then parses the data to create an invoice in Sage One accounting software using the Sage One API.

The script starts by opening the Google Spreadsheet with SpreadsheetApp.openById(). It then gets all the sheets in the spreadsheet using getSheets(), and the active sheet using getActiveSheet().

Next, it gets the header row using getRange() and getValues(). The header row is the first row of the sheet, and it contains the names of the columns. The script uses this header row to create the invoice lines.

After that, it gets the latest row using getLastRow() and getRange(), and getValues(). The latest row is the last row of the sheet, and it contains the data that needs to be added to the invoice.

The script then creates a JavaScript object data to store the parsed data. It also creates an array lines to store the invoice lines.

The script then loops through each column in the header row and checks whether the column is not blank and is not the "Notes" column. If the column is not blank and is not the "Notes" column, it extracts the item code and item name from the header row, and then it checks whether the item name contains the word "combo" or not. If it does not contain the word "combo", it creates an invoice line for the item. If it does contain the word "combo", it creates invoice lines for each item in the combo.

The script then creates a JavaScript object body that contains the data needed to create an invoice in Sage One accounting software. It includes the invoice date, due date, reference, status, customer ID, tax reference, postal address, delivery address, and invoice lines.

The script then uses UrlFetchApp.fetch() to send a POST request to the Sage One API to create the invoice. It passes the body object as a JSON string in the payload parameter. It also includes the API key and company ID as query parameters in the URL.

Finally, the script logs the response from the Sage One API using Logger.log().
