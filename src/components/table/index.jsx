import React, { useState } from "react";
import { Table, Popconfirm } from "antd";
import {
  getCols,
  getInheritName,
  getKeys,
  getRecords,
  getRowId,
  getEntries,
  getValues
} from "./actions";

import data from "../../data/data.json";

const NestedTable = () => {
  const [initialData, setInitialData] = useState(data);
  const columns = getKeys(initialData).map((item) => {
   return {
      key: "data[item]",
      title: item,
      render: (record) => {
        return record.data[item];
      },
  }});
  
  
 const expandedRowRender = (record) => {
  const childName = getInheritName(record);
  const records = getRecords(record, childName);
  const innerColumns = getKeys(records).map((item) => {
    return {
       key: "data[item]",
       title: item,
       render: (record) => {
         return record.data[item];
       },
   }});
    const innerDataSource = records;
   return (
    <Table 
    dataSource={innerDataSource} 
    columns={innerColumns}
    expandable={{
      expandedRowRender: (record) => expandedRowRender(record),
     rowExpandable: (record) => Object.keys(record.kids).length > 0,
    }}
    rowKey={(record) => getRowId(record)}
    />
  )
 }

  // const filterRow = (rows, rowId) => {
  //   return rows
  //     .filter((row) => getRowId(row) !== rowId)
  //     .map((row) => {
  //       const childTable = getInheritName(row);
  //       return childTable
  //         ? createRow(
  //             row.data,
  //             childTable,
  //             filterRow(getRecords(row, childTable), rowId)
  //           )
  //         : row;
  //     });
  // };
  // const removeRow = (rowId) => {
  //   setInitialData((prevState) => filterRow(prevState, rowId));
  // };

  return(
<Table 
dataSource={initialData} 
columns={columns}
expandable={{
  expandedRowRender: (record) => expandedRowRender(record),
 rowExpandable: (record) => Object.keys(record.kids).length > 0,
}}
rowKey={(record) => getRowId(record)}
/>
  ) 
};

// function PhonesTable({ dataSource }) {
//   const columns = [
//     {
//       key: "data[Phone ID]",
//       title: "Phone ID",
//       render: (record) => {
//         return record.data["Phone ID"];
//       },
//     },
//     {
//       key: "data[ID of the relative]",
//       title: "ID of the relative",
//       render: (record) => {
//         return record.data["ID of the relative"];
//       },
//     },
//     {
//       key: "data[Phone]",
//       title: "Phone",
//       render: (record) => {
//         return record.data["Phone"];
//       },
//     },
//   ];

//   return (
//     <Table
//       columns={columns}
//       dataSource={dataSource}
//       pagination={false}
//       rowKey={(record) => record.data["Phone ID"]}
//     />
//   );
// }

// const handleDelete = key => {
//   data.splice(key, 1);
//   App();
// };

// function RelativesTable({ dataSource }) {
//   const columns = [
//     {
//       key: "data[Relative ID]",
//       title: "Relative ID",
//       render: (record) => record.data["Relative ID"],
//     },
//     {
//       key: "data[Patient ID]",
//       title: "Patient ID",
//       render: (record) => record.data["Patient ID"],
//     },
//     {
//       key: "data[Is alive?]",
//       title: "Is alive?",
//       render: (record) => {
//         return record.data["Is alive?"];
//       },
//     },
//     {
//       key: "data[Frequency of visits]",
//       title: "Frequency of visits",
//       render: (record) => record.data["Frequency of visits"],
//     },
//   ];

//   return (
//     <Table
//       columns={columns}
//       dataSource={dataSource}
//       pagination={false}
//       expandable={{
//         expandedRowRender: (record) => (
//           <PhonesTable dataSource={record.kids.has_phone.records} />
//         ),
//         rowExpandable: (record) => record.kids.has_phone,
//       }}
//       rowKey={(record) => record.data["Relative ID"]}
//     />
//   );
// }

// function App() {
//   const columns = [
//     {
//       key: "data[Identification number]",
//       title: "id",
//       render: (record) => {
//         return record.data["Identification number"];
//       },
//     },
//     {
//       key: "data[Name]",
//       title: "name",
//       render: (record) => record.data.Name,
//     },
//     {
//       key: "data[Gender]",
//       title: "gender",
//       render: (record) => record.data.Gender,
//     },
//     {
//       key: "data[Risk]",
//       title: "Risk",
//       render: (record) => record.data.Risk,
//     },
//     {
//       key: "data[Hair length]",
//       title: "Hair length",
//       render: (record) => record.data.["Hair length"],
//     },
//     {
//       key: "data[IQ]",
//       title: "IQ",
//       render: (record) => record.data.IQ,
//     },
//     {
//       key: "data[Admission date]",
//       title: "Admission date",
//       render: (record) => record.data.["Admission date"],
//     },
//     {
//       key: "data[Last breakdown]",
//       title: "Last breakdown",
//       render: (record) => record.data.["Last breakdown"],
//     },
//     {
//       key: "data[Yearly fee]",
//       title: "Yearly fee",
//       render: (record) => record.data.["Yearly fee"],
//     },
//     {
//       key: "data[Knows the Joker?]",
//       title: "Knows the Joker?",
//       render: (record) => record.data.["Knows the Joker?"],
//     },
//     {
//       key: "Delete",
//       title: "Actions",
//       render: (record) => (
//             <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
//               <a>Delete</a>
//             </Popconfirm>)
//     }
//   ];

//   return (
//     <Table
//       columns={columns}
//       dataSource={data}
//       pagination={false}
//       expandable={{
//         expandedRowRender: (record) => (
//           <RelativesTable dataSource={record.kids.has_relatives.records} />
//         ),
//         rowExpandable: (record) => record.kids.has_relatives,
//       }}
//       rowKey={(record) => record.data["Identification number"]}
//     />
//   );
// }

// export default App;

export default NestedTable;
