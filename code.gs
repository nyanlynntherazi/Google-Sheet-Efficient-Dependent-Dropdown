/**
 * Dependent dropdowns for Sheet1.
 * Column A is the parent. The cell to its right receives the child list.
 * onEdit uses the edit event first and calls the spreadsheet service only
 * when that edit intersects column A from row 2 down.
 *
 * @author Nyan Lynn Myint &lt;nyanlynn.razi@gmail.com>
 */

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

// Sheet1 column A is the parent. Child lists start at row 2, in the next column.
const SHEET_NAME = "Sheet1";
const PARENT_COLUMN = 1;
const FIRST_DATA_ROW = 2;

// One rule per parent value, built once per run and reused for every row.
const ruleCache = {};

const ruleFor = (value) => {
  if (!Object.prototype.hasOwnProperty.call(validationData, value)) {
    return null;
  }
  if (!ruleCache[value]) {
    ruleCache[value] = SpreadsheetApp.newDataValidation()
      .requireValueInList(validationData[value])
      .build();
  }
  return ruleCache[value];
};

function onEdit(e) {
  if (!e || !e.range) {
    return;
  }

  const range = e.range;
  const startRow = range.getRow();
  const startColumn = range.getColumn();
  const endRow = startRow + range.getNumRows() - 1;
  const endColumn = startColumn + range.getNumColumns() - 1;

  // Row and column come from the event. Return before any spreadsheet call
  // when this edit misses column A from row 2 down.
  if (endColumn < PARENT_COLUMN || startColumn > PARENT_COLUMN || endRow < FIRST_DATA_ROW) {
    return;
  }

  // Parent unchanged: keep the user's child selection and make no writes.
  if (e.oldValue !== undefined && e.oldValue === e.value
    && range.getNumRows() === 1 && range.getNumColumns() === 1) {
    return;
  }

  if (range.getSheet().getName() !== SHEET_NAME) {
    return;
  }

  const rowOffset = Math.max(FIRST_DATA_ROW, startRow) - startRow;
  const parentRowCount = endRow - startRow - rowOffset + 1;
  const parentRange = range.offset(rowOffset, PARENT_COLUMN - startColumn, parentRowCount, 1);
  const targetRange = parentRange.offset(0, 1);

  const singleCell = parentRowCount === 1
    && range.getNumRows() === 1
    && range.getNumColumns() === 1;

  const rules = singleCell
    ? [[ruleFor(e.value)]]
    : parentRange.getValues().map(([value]) => [ruleFor(value)]);

  targetRange.clearContent();
  targetRange.setDataValidations(rules);
}
