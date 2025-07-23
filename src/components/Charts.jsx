import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#1976d2",
    "#64b5f6",
    "#ffb300",
    "#e57373",
    "#81c784",
    "#ba68c8",
    "#ffd54f",
    "#4dd0e1",
    "#f06292",
    "#a1887f",
];

function Charts({ breweries }) {
    const typeCounts = breweries.reduce((acc, b) => {
        acc[b.brewery_type] = (acc[b.brewery_type] || 0) + 1;
        return acc;
    }, {});
    const typeData = Object.entries(typeCounts).map(([type, count]) => ({
        name: type,
        value: count,
    }));

    const stateCounts = breweries.reduce((acc, b) => {
        acc[b.state] = (acc[b.state] || 0) + 1;
        return acc;
    }, {});
    const stateData = Object.entries(stateCounts)
        .map(([state, count]) => ({ state, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);

    return (
        <div className="charts-container">
            <div className="chart-box">
                <h3>Brewery Types</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={typeData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                        >
                            {typeData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="chart-box">
                <h3>Top States by Breweries</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                        data={stateData}
                        margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="state" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#1976d2" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Charts;
