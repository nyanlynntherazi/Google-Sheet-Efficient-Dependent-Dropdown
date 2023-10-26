//Validation Json Object Sample, Part before : is parent value, after is child value Change accordingly
/*
const validationData = {  
  "A":["A1","A2","A3","A4"],
  "B":["B1","B2","B3","B4"],
  "C":["C1","C2","C3","C4"],
  "D":["D1","D2","D3","D4"]
};
*/

const validationData = { 
  "Fruits":["Mango", "Apple", "Orange", "Banana", "Cherry"],
  "Vegetables":["Cabbage","Lettuce","Eggplant","Pepper","Spinach"],
  "Meats":["Chicken","Fish","Pork","Beef", "Crab"],
  "Grains":["Rice","Rye", "Corn", "Oat","Wheat","Barley"]
};


const dependentDropdown = (e) => {
/* 
This Function creates dependent dropdown menu based on Activity
*/
  const activeCell = e.source.getActiveCell();
  const targetCell = activeCell.offset(0, 1);//(row offset,column offset) 0,1 means same row adjacent column
  const COA = activeCell.getValue();
  
  targetCell.clearContent();
  
  const mValues = validationData[COA];
  if (mValues) {
    const validationRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(mValues)
      .build();
      targetCell.setDataValidation(validationRule);
  } else {
    targetCell.clearDataValidations();
  }
}
  


const onEdit = (e) => {

//Get sheet Names, Rows and Columns
  const range = e.range;
  const source = e.source;
  const col = range.getColumn();
  const row = range.getRow();
  const sheetName = source.getActiveSheet().getName(); //Get Sheet Name from event object

//Running function everytime any change in the spreadsheet is not efficient.
//So just call the function when the user edit specific positions
//Change this accordingly col == 1 Means Column A is Parent column and row >1 means The script will work start from row 2
if(sheetName == "Sheet1" && col == 1 && row > 1 ) {

    dependentDropdown(e);

  } 
}
