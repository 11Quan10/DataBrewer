import React from "react";
import BreweryRow from "./BreweryRow";

function BreweryList({ breweries }) {
    return (
        <table className="brewery-list">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>City</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
                {breweries.map((brewery) => (
                    <BreweryRow key={brewery.id} brewery={brewery} />
                ))}
            </tbody>
        </table>
    );
}

export default BreweryList;
