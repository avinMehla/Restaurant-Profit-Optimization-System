import { useEffect, useState } from "react";
import api from "../services/api";

function Recommendations() {

  const [recommendations, setRecommendations] =
    useState([]);

  useEffect(() => {

    api.get("/recommendations")
      .then((response) => {

        setRecommendations(response.data);

      })
      .catch((error) => {

        console.error(error);

      });

  }, []);

  const getBadgeColor = (recommendation) => {

    if (
      recommendation
        .toLowerCase()
        .includes("increase")
    ) {
      return "#16a34a";
    }

    if (
      recommendation
        .toLowerCase()
        .includes("promote")
    ) {
      return "#2563eb";
    }

    if (
      recommendation
        .toLowerCase()
        .includes("review")
    ) {
      return "#dc2626";
    }

    return "#6b7280";
  };

  return (

    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Recommendations
      </h1>

      <p className="dashboard-subtitle">
        AI-inspired business recommendations
        based on profitability analysis
      </p>

      <div className="recommendation-grid">

        {recommendations.map((item, index) => (

          <div
            key={index}
            className="card"
          >

            <h3>
              {item.menuItemName}
            </h3>

            <div
              style={{
                backgroundColor:
                  getBadgeColor(
                    item.recommendation
                  ),

                color: "white",

                padding: "8px",

                borderRadius: "8px",

                marginTop: "12px",

                textAlign: "center",

                fontWeight: "bold"
              }}
            >
              {item.recommendation}
            </div>

            <p className="reason-text">

              {item.reason}

            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Recommendations;