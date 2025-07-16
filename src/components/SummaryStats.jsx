import React from "react";

function SummaryStats({ breweries }) {
    // Calculate summary statistics
    const total = breweries.length;
    const types = [...new Set(breweries.map((b) => b.brewery_type))];
    const mostCommonState = breweries.length
        ? breweries.reduce((acc, b) => {
              acc[b.state] = (acc[b.state] || 0) + 1;
              return acc;
          }, {})
        : {};
    const mostState =
        Object.entries(mostCommonState).sort((a, b) => b[1] - a[1])[0]?.[0] ||
        "N/A";

    return (
        <div className="summary-stats">
            <h2>Summary Statistics</h2>
            <ul>
                <li>Total Breweries: {total}</li>
                <li>Unique Types: {types.length}</li>
                <li>Most Common State: {mostState}</li>
            </ul>
        </div>
    );
}

export default SummaryStats;
