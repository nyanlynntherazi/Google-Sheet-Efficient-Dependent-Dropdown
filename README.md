# Google-Sheet-Efficient-Dependent-Dropdown

Making dependent dropdowns in Google Sheets can be a little tricky. There are different ways to do it, but right now, using Google Apps Script seems to be the best method.

`onEdit` makes no spreadsheet calls until an edit intersects column A from row 2 down on `Sheet1`. That edit costs one sheet-name check and two writes: clear the child cell, then set its dropdown. A paste or fill down column A reads the parent values once and updates every neighbor in that same batch.

The downside of this script is that the validation JSON object is initialized within the app script itself, making it challenging for users to easily make changes to the validation values in the spreadsheet. Moving those lists onto the sheet would add reads on each edit.


## Flowchart
![Budget Scripts_dependentDropdown](https://github.com/nyanlynntherazi/Google-Sheet-Efficient-Dependent-Dropdown/assets/26094384/285261a8-1104-4723-8faf-30c038a239c6)



Test in the example [spreadsheet](https://docs.google.com/spreadsheets/d/1S1tzbLVIgHcDoDMUFYtFLJU8WFMffS1iirDDjpCTzh4/edit?usp=sharing). 
Please do not do other changes in the spread as it is not protected.
