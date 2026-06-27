import { useEffect, useState } from "react";
import api from "../services/api";

function MenuPerformance() {

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("profit");

  useEffect(() => {

    api.get("/menu/performance")
      .then((response) => {

        console.log(response.data);

        setItems(response.data);

      })
      .catch((error) => {

        console.error(error);

      });

  }, []);

  const filteredItems = items.filter((item) =>
    item.menuItemName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort(
    (a, b) => {

      if (sortBy === "profit") {
        return b.profit - a.profit;
      }

      if (sortBy === "revenue") {
        return b.revenue - a.revenue;
      }

      if (sortBy === "margin") {
        return b.margin - a.margin;
      }

      return 0;
    }
  );

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Menu Performance
      </h1>

      <p className="dashboard-subtitle">
        Analyze menu item profitability and sales performance
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
          marginBottom: "20px"
        }}
      >

        <input
          type="text"
          placeholder="Search Menu Item"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "250px"
          }}
        />

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        >

          <option value="profit">
            Sort By Profit
          </option>

          <option value="revenue">
            Sort By Revenue
          </option>

          <option value="margin">
            Sort By Margin
          </option>

        </select>

      </div>

      <table>

        <thead>

          <tr>
            <th>Rank</th>
            <th>Item</th>
            <th>Revenue</th>
            <th>Profit</th>
            <th>Margin</th>
            <th>Quantity Sold</th>
          </tr>

        </thead>

        <tbody>

          {sortedItems.map((item, index) => (

            <tr key={item.menuItemName}>

              <td>{index + 1}</td>

              <td>{item.menuItemName}</td>

              <td>
                ₹ {item.revenue.toLocaleString()}
              </td>

              <td
                style={{
                  color: "#16a34a",
                  fontWeight: "bold"
                }}
              >
                ₹ {item.profit.toLocaleString()}
              </td>

              <td>
                {item.margin.toFixed(2)}%
              </td>

              <td>
                {item.quantitySold.toLocaleString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default MenuPerformance;