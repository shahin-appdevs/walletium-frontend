"use client";

import { isArrayCheck } from "@/utils/IsArrayCheck";
import { Table as AntTable, Button, Input, message, Space } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";

const Table = (props) => {
  const {
    dataSource,
    columns,
    activePagination = false,
    pageSize: initialPageSize = 10,
    actions,
    selectable = false,
    fetchPage,
    rowKey = "key",
    className,
    styles,
    onSelectionChange,
    onRowClick,
    isSelected = false,
    handleAllDelete,
    rowClassName,
  } = props;

  // check server mode

  const serverMode = Boolean(fetchPage);

  const [data, setData] = useState(isArrayCheck(dataSource) ? dataSource : []);
  const [total, setTotal] = useState(
    isArrayCheck(dataSource) ? dataSource.length : 0
  );
  const [loading, setLoading] = useState(false);
  // pagination options / search / sort
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  //selection
  const [selectRowKeys, setSelectRowKeys] = useState([]);
  const [search, setSearch] = useState("");
  const searchTimeoutRef = useRef(null);

  //load server page
  const loadPage = async (opts = {}) => {
    if (!serverMode) return;
    setLoading(true);

    try {
      const query = {
        page: opts?.page ?? page,
        pageSize: opts?.pageSize ?? pageSize,
        search: opts?.search ?? search,
      };

      const res = await fetchPage(query); // expected {data, total}
      setData(isArrayCheck(res.data) ? res.data : []);
      setTotal(typeof res.total === "number" ? res.total : 0);
    } catch (error) {
      console.log(error);
      message.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (serverMode) {
      loadPage({ page: 1 });
    } else {
      setData(isArrayCheck(dataSource) ? dataSource : []);
      setTotal(isArrayCheck(dataSource) ? dataSource.length : 0);
    }
  }, [serverMode]);

  const finalColumns = useMemo(() => {
    const baseColumn = isArrayCheck(columns) ? [...columns] : [];

    if (actions) {
      baseColumn.push({
        title: "Actions",
        key: "actions",
        fixed: "right",
        render: (_, record) => (
          <Space size={"middle"}> {actions(record)}</Space>
        ),
      });
    }

    return baseColumn;
  }, [columns, actions]);

  const handleTableChange = (pagination) => {
    const newPage = pagination?.current ?? 1;
    const newPageSize = pagination?.pageSize ?? pageSize;

    setPage(newPage);
    setPageSize(newPageSize);

    if (serverMode) {
      loadPage({ page: newPage, pageSize: newPageSize });
    }
  };

  const pagination =
    activePagination || total.length > pageSize
      ? {
          pageSize,
          showSizeChanger: true,
          showTotal: (t) => `Total ${t} Items`,
        }
      : false;

  const handleClearSelection = () => {
    setSelectRowKeys([]);
    onSelectionChange?.([], []);
  };

  const rowSelection = selectable
    ? {
        selectRowKeys,
        onChange: (keys, rows) => {
          setSelectRowKeys(keys);
          onSelectionChange?.(keys, rows);
        },
      }
    : undefined;

  const handleSearchChange = (val) => {
    setSearch(val);
    window.clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = window.setTimeout(() => {
      if (serverMode) {
        setPage(1);
        loadPage({ page: 1, search: val });
      } else {
        const query = (val || "").trim().toLowerCase();
        if (!query) {
          setData(isArrayCheck(dataSource) ? dataSource : []);
          setTotal(isArrayCheck(dataSource) ? dataSource.length : 0);
          return;
        }
        const filtered = (dataSource || []).filter((row) => {
          const values = Object.values(row);
          const items = values.some(
            (cell) =>
              typeof cell === "string" && cell.toLowerCase().includes(query)
          );
          return items;
        });

        setData(filtered);
        setTotal(filtered?.length);
      }
    }, 350);
  };

  return (
    <div className={`${className}`} style={styles}>
      {/* <Input.Search
        placeholder="Search..."
        allowClear
        onSearch={(v) => handleSearchChange(v)}
        onChange={(e) => handleSearchChange(e.target.value)}
        style={{ width: 360 }}
      /> */}
      {isSelected && (
        <Space>
          <Button onClick={handleAllDelete} className="bg-red-500! text-white!">
            Delete Multiple
          </Button>
        </Space>
      )}

      <AntTable
        rowClassName={rowClassName}
        rowKey={rowKey}
        dataSource={data}
        columns={finalColumns}
        pagination={pagination}
        onChange={handleTableChange}
        loading={loading}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => onRowClick?.(record),
        })}
      />
    </div>
  );
};

export default Table;

//  const dataSource = [
//     {
//       key: "1",
//       title: "This Is Blog 1",
//       age: 32,
//       address: "10 Downing Street",
//     },
//     {
//       key: "2",
//       title: "This Is Blog 2",
//       age: 42,
//       address: "10 Downing Street",
//     },
//   ];

// const columns = [
//   {
//      id: 1,
//      dataIndex: "id",
//      key: "id",
//      sorter: (a,b) => a.id - b.id, //number sort
//    },
//   {
//     title: "Title",
//     dataIndex: "title",
//     key: "title",
//     sorter: (a,b) => a.title.localeCompare(b.title) //string sort

//   },

//   {
//     title: "Action",
//     key: "action",
//     render: (_, record) => (
//       <Space size="middle">
//         <button
//           onClick={() => handleEdit(record)}
//           className="cursor-pointer !text-sky-500"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => handleDelete(record)}
//           className="cursor-pointer !text-red-500"
//         >
//           Delete
//         </button>
//       </Space>
//     ),
//   },
// ];
