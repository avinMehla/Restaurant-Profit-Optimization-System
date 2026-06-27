import { useEffect, useState } from "react";
import api from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {

  const [dashboardData, setDashboardData] =
    useState(null);

  const [menuItems, setMenuItems] =
    useState([]);

  useEffect(() => {

    api.get("/dashboard/summary")
      .then((response) => {

        setDashboardData(response.data);

      })
      .catch((error) => {

        console.error(error);

      });

    api.get("/menu/performance")
      .then((response) => {

        setMenuItems(response.data);

      })
      .catch((error) => {

        console.error(error);

      });

  }, []);

  const topRevenueItem =
    menuItems.length > 0
      ? [...menuItems].sort(
          (a, b) =>
            b.revenue - a.revenue
        )[0]
      : null;

  const mostProfitableItem =
    menuItems.length > 0
      ? [...menuItems].sort(
          (a, b) =>
            b.profit - a.profit
        )[0]
      : null;

  const highestMarginItem =
    menuItems.length > 0
      ? [...menuItems].sort(
          (a, b) =>
            b.margin - a.margin
        )[0]
      : null;

  const top5ProfitItems =
    [...menuItems]
      .sort(
        (a, b) =>
          b.profit - a.profit
      )
      .slice(0, 5);

  const chartData =
    top5ProfitItems.map(item => ({
      name: item.menuItemName,
      revenue: item.revenue,
      profit: item.profit
    }));

  if (!dashboardData) {

    return (
      <div className="loading">
        Loading Dashboard...
      </div>
    );

  }

  return (

    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Restaurant Profit Dashboard
      </h1>

      <p className="dashboard-subtitle">
        Monitor revenue, profit and performance metrics
      </p>

      {/* KPI CARDS */}

      <div className="cards-container">

        <div className="card">
          <h3>💰 Revenue</h3>

          <p style={{ color: "#2563eb" }}>
            ₹ {dashboardData.totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="card">
          <h3>📈 Profit</h3>

          <p style={{ color: "#16a34a" }}>
            ₹ {dashboardData.totalProfit.toLocaleString()}
          </p>
        </div>

        <div className="card">
          <h3>🎯 Margin</h3>

          <p style={{ color: "#ea580c" }}>
            {dashboardData.profitMargin.toFixed(2)}%
          </p>
        </div>

        <div className="card">
          <h3>🛒 Quantity Sold</h3>

          <p>
            {dashboardData.totalQuantitySold.toLocaleString()}
          </p>
        </div>

        <div className="card">
          <h3>💵 Avg Selling Price</h3>

          <p>
            ₹ {dashboardData.avgSellingPrice.toFixed(2)}
          </p>
        </div>

      </div>

      {/* INSIGHTS */}

      <h2
        style={{
          marginTop: "40px",
          marginBottom: "20px"
        }}
      >
        Key Insights
      </h2>

      <div className="cards-container">

        <div className="card">

          <h3>🏆 Top Revenue Item</h3>

          <p
            style={{
              fontSize: "18px"
            }}
          >
            {topRevenueItem?.menuItemName}
          </p>

        </div>

        <div className="card">

          <h3>💰 Most Profitable</h3>

          <p
            style={{
              fontSize: "18px"
            }}
          >
            {mostProfitableItem?.menuItemName}
          </p>

        </div>

        <div className="card">

          <h3>📈 Highest Margin</h3>

          <p
            style={{
              fontSize: "18px"
            }}
          >
            {highestMarginItem?.menuItemName}
          </p>

        </div>

      </div>

      {/* TOP 5 */}

      <div className="top-list">

        <h3>
          Top 5 Most Profitable Items
        </h3>

        {

          top5ProfitItems.map(
            (item, index) => (

              <div
                key={item.menuItemName}
                className="top-list-item"
              >

                <span>

                  {index + 1}.
                  {" "}
                  {item.menuItemName}

                </span>

                <strong>

                  ₹
                  {" "}
                  {item.profit.toLocaleString()}

                </strong>

              </div>

            )
          )

        }

      </div>

      {/* CHART */}

      <div className="chart-container">

        <h3>
          Revenue vs Profit
        </h3>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <BarChart
            data={chartData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="name"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="revenue"
            />

            <Bar
              dataKey="profit"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Dashboard;