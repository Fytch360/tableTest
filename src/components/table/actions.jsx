export const getKeys = (rows) => {
    return getCols(rows[0]);
}

export const getCols = (row) => {
 return  Object.keys(row ? row.data : []);
}

export const getRecords = (row, child) => {
    return row.kids[child].records || [];
}


export const getChildKey = (row) => {
    return Object.keys(row.kids)[0];
}

export const getId = (row) => {
    return Object.values(row)[0];
}
