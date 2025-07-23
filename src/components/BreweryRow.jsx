import React from "react";
import { Link } from "react-router-dom";

function BreweryRow({ brewery }) {
    return (
        <tr>
            <td>
                <Link
                    style={{ color: "black" }}
                    to={`brewery/${brewery.id}`}
                    key={brewery.id}
                >
                    {brewery.name}
                </Link>
            </td>
            <td>{brewery.brewery_type}</td>
            <td>{brewery.city}</td>
            <td>{brewery.state}</td>
        </tr>
    );
}

export default BreweryRow;
