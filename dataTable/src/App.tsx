import "./App.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { DataTablePageEvent } from "primereact/datatable";
import { OverlayPanel } from "primereact/overlaypanel";
import { useEffect, useRef, useState } from "react";
import DownArrow from "./assets/arrow";

interface DataTableRow {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: string;
  date_end: string;
}

interface Pagination {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
}

function App() {
  const [data, setData] = useState<DataTableRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<string>("");
  const [first, setFirst] = useState(0); // 🔹 Track table starting index
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 12,
    totalRecords: 0,
    totalPages: 1,
  });

  const ref = useRef<OverlayPanel>(null);

  async function fetchData(page: number) {
    setLoading(true);
    await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setPagination({
          page,
          limit: res.pagination.limit,
          totalRecords: res.pagination.total,
          totalPages: res.pagination.total_pages,
        });

        const rowsWithId = res.data.map((item: any, index: number) => ({
          id: item.id || index + (page - 1) * res.pagination.limit,
          ...item,
        }));

        setData(rowsWithId);
      });
    setLoading(false);
  }

  useEffect(() => {
    fetchData(pagination.page);
  }, []);

  const onPageChange = (event: DataTablePageEvent) => {
    setFirst(event.first);
    if (event.page) fetchData(event.page + 1);
  };

  const selectCount = parseInt(input) || 0;
  const globalStartIndex = (pagination.page - 1) * pagination.limit;
  const selectedRows =
    selectCount > globalStartIndex
      ? data.slice(0, Math.max(0, selectCount - globalStartIndex))
      : [];

  // 🔄 When input changes, reset to page 1
  useEffect(() => {
    if (input !== "") {
      setFirst(0); // go to start of table
      setPagination((prev) => ({ ...prev, page: 1 }));
      fetchData(1); // reload first page
    }
  }, [input]);

  return (
    <>
      <DataTable
        value={data}
        paginator
        lazy
        selectionMode="multiple"
        selection={selectedRows}
        dataKey="id"
        first={first}
        totalRecords={pagination.totalRecords}
        rows={pagination.limit}
        onPage={onPageChange}
        loading={loading}
        style={{ width: "100%" }}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column
          field="title"
          header={
            <div style={{ display: "flex", alignItems: "center" }}>
              title
              <div
                style={{
                  height: "20px",
                  width: "20px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                onClick={(e) => ref.current?.toggle(e)}
              >
                <DownArrow />
              </div>
            </div>
          }
        />
        <Column field="place_of_origin" header="Place of Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>

      <OverlayPanel ref={ref}>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter number of rows"
        />
      </OverlayPanel>
    </>
  );
}

export default App;
