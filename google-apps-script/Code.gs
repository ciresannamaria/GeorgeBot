function doGet() {
  return ContentService
    .createTextOutput("GeorgeBot question logger is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("Questions") || spreadsheet.insertSheet("Questions");

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Date", "Question", "Answered?", "Topic"]);
    }

    sheet.appendRow([
      data.date || new Date().toISOString(),
      data.question || "",
      data.answered ? "Yes" : "No",
      data.topic || "Unknown"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
