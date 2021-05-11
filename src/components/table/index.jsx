import React, { useState } from "react";
import { Table, Button } from "antd";
import { getChildKey, getKeys, getRecords, getId } from "./actions";

import data from "../../data/data.json";

const NestedTable = () => {
  const [initialData, setInitialData] = useState(data);
  const columns = [
    ...getKeys(initialData).map((item) => {
      return {
        key: "data[item]",
        title: item,
        render: (record) => {
          return record.data[item];
        },
      };
    }),
    {
      key: "Delete",
      title: "Action",
      width: "10%",
      render: (record) => (
        <Button onClick={() => handleDelete(record.data)}>Delete</Button>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    const childName = getChildKey(record);
    const innerDataSource = getRecords(record, childName);
    const innerColumns = [
      ...getKeys(innerDataSource).map((item) => {
        return {
          key: "data[item]",
          title: item,
          render: (record) => {
            return record.data[item];
          },
        };
      }),
      {
        key: "Delete",
        title: "Action",
        width: "10%",
        render: (record) => (
          <Button onClick={() => handleDelete(record.data)}>Delete</Button>
        ),
      },
    ];

    return (
      <Table
        titie={childName}
        dataSource={innerDataSource}
        columns={innerColumns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record),
          rowExpandable: (record) => Object.keys(record.kids).length > 0,
        }}
        rowKey={(record) => getId(record)}
        pagination={false}
        bordered
      />
    );
  };

  const handleSetData = (data, childName, records) => ({
    data: data,
    kids: {
      [childName]: {
        records: records,
      },
    },
  });
  const handleDelete = (id) => {
    setInitialData((prevState) => handleFilterData(prevState, id));
  };

  const handleFilterData = (data, id) => {
    return data
      .filter((item) => getId(item) !== id)
      .map((item) => {
        const childName = getChildKey(item);
        return childName
          ? handleSetData(
              item.data,
              childName,
              handleFilterData(getRecords(item, childName), id)
            )
          : item;
      });
  };

  return (
    <Table
      dataSource={initialData}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => expandedRowRender(record),
        rowExpandable: (record) => Object.keys(record.kids).length > 0,
      }}
      rowKey={(record) => getId(record)}
      pagination={false}
      bordered
    />
  );
};

export default NestedTable;
