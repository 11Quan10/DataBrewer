import React from "react";

function TypeFilter({ typeFilter, setTypeFilter, breweries }) {
    // Get unique types from breweries
    const types = [...new Set(breweries.map((b) => b.brewery_type))];
    return (
        <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="type-filter"
        >
            <option value="">All Types</option>
            {types.map((type) => (
                <option key={type} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
}

export default TypeFilter;
