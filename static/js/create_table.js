export {clearElementBy, createEmptyTable}

// delete old, create new
function clearElementBy(selector) {
    const element = document.querySelector(selector);

    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function createEmptyTable(tableBodySelector, rowIdIndicator, rowClassIndicator, cellClassIndicator, numberOfRows, numberOfCellsInRow) {
    const tableBody = document.querySelector(tableBodySelector);

    for (let ii = 0; ii < numberOfRows; ii++) {
        let rowId = rowIdIndicator + ii;
        const tableRow = document.createElement('tr');
        tableRow.classList.add(rowClassIndicator);
        tableRow.setAttribute('id', rowId);
        tableBody.appendChild(tableRow);

        for (let i = 0; i < numberOfCellsInRow; i++) {
            const tableCell = document.createElement('td');
            tableCell.classList.add(cellClassIndicator + i);
            tableRow.appendChild(tableCell);
        }
    }
}

