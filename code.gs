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
  "Johann Sebastian Bach":["Air on the G String","Toccata and Fugue in D minor, BWV 565","Brandenburg Concertos","Fugue in G minor, BWV 578","Jesu, Joy of Man's Desiring","Goldberg Variations","St. Matthew Passion","Ave Maria"],
  "Ludwig van Beethoven":["Symphony No. 5","Symphony No. 9","Piano Sonata No. 14","Für Elise","Symphony No. 7","Symphony No. 3","Symphony No. 6","Piano Sonata No. 8"],
  "Frédéric Chopin":["Nocturnes, Op. 9","Nocturne in E-flat major, Op. 9, No. 2","Fantaisie-Impromptu","Minute Waltz","Piano Concerto No. 1","Polonaise in A-flat major, Op. 53","Études","Nocturne in C-sharp minor, Op. posth"],
  "Wolfgang Amadeus Mozart":["Requiem","The Magic Flute","Eine kleine Nachtmusik","Symphony No. 40","The Marriage of Figaro","Don Giovanni","Piano Sonata No. 11","Clarinet Concerto"]
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
