export const getKeys = (rows) => {
    return getCols(rows[0]);
}

export const getCols = (row) => {
    return Object.keys(row.data);
}

export const getRecords = (row, child) => {
    return row.kids[child].records || [];
}


export const getInheritName = (row) => {
    return Object.keys(row.kids)[0];
}

export const getRowId = (row) => {
    return Object.values(row)[0];
}

export const getEntries = (data) => {
    return Object.entries(data);
}

export const getValues = (data) => {
    return Object.values(data);
}
