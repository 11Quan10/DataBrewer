import { useState, useEffect } from "react";
import SummaryStats from "./components/SummaryStats";
import SearchBar from "./components/SearchBar";
import TypeFilter from "./components/TypeFilter";
import BreweryList from "./components/BreweryList";
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
import { useMemo } from "react";
import "./App.css";

function App() {
    const [breweries, setBreweries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    useEffect(() => {
        async function fetchData() {
            let brewList = [];
            let i = 1;
            while (true) {
                console.log(i);
                const response = await fetch(
                    `https://api.openbrewerydb.org/v1/breweries?page=${i}&per_page=200`
                );
                const data = await response.json();
                if (data && data.length > 0) {
                    brewList = [...brewList, ...data];
                    i++;
                } else {
                    break;
                }
            }
            setBreweries(brewList);
        }
        fetchData();
    }, []);

    function getRandomBreweries(breweries) {
        if (!Array.isArray(breweries)) return [];
        const shuffled = [...breweries].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 15);
    }

    const filteredBreweries =
        searchTerm.length == 0 && typeFilter.length == 0
            ? getRandomBreweries(breweries)
            : breweries
                  .filter(
                      (b) =>
                          b.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                          b.city
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                          b.state
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                  )
                  .filter((b) =>
                      typeFilter ? b.brewery_type === typeFilter : true
                  );

    // Prepare chart data with useMemo for performance
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
    const typeData = useMemo(() => {
        const typeCounts = breweries.reduce((acc, b) => {
            acc[b.brewery_type] = (acc[b.brewery_type] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(typeCounts).map(([type, count]) => ({
            name: type,
            value: count,
        }));
    }, [breweries]);
    const stateData = useMemo(() => {
        const stateCounts = breweries.reduce((acc, b) => {
            acc[b.state] = (acc[b.state] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(stateCounts)
            .map(([state, count]) => ({ state, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8);
    }, [breweries]);

    return (
        <div className="main-layout">
            <div className="side-chart left">
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
            <div className="dashboard">
                <h1>🍺 DataBrewer 🍻</h1>
                <SummaryStats breweries={breweries} />
                <div className="controls">
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <TypeFilter
                        typeFilter={typeFilter}
                        setTypeFilter={setTypeFilter}
                        breweries={breweries}
                    />
                </div>
                <BreweryList breweries={filteredBreweries} />
            </div>
            <div className="side-chart right">
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

export default App;
