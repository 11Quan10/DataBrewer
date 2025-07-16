import { useState, useEffect } from "react";
import SummaryStats from "./components/SummaryStats";
import SearchBar from "./components/SearchBar";
import TypeFilter from "./components/TypeFilter";
import BreweryList from "./components/BreweryList";
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

    const filteredBreweries = breweries
        .filter((b) => b.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((b) => (typeFilter ? b.brewery_type === typeFilter : true));

    return (
        <div className="dashboard">
            <h1>DataBrewer Dashboard</h1>
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
    );
}

export default App;
