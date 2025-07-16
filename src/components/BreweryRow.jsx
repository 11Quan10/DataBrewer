import React from "react";

function BreweryRow({ brewery }) {
    return (
        <tr>
            <td>{brewery.name}</td>
            <td>{brewery.brewery_type}</td>
            <td>{brewery.city}</td>
            <td>{brewery.state}</td>
        </tr>
    );
}

export default BreweryRow;
