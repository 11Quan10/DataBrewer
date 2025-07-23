import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BreweryDetail = () => {
    const { id } = useParams();
    const [brewery, setBrewery] = useState(null);

    useEffect(() => {
        async function fetchBrewery() {
            const response = await fetch(
                `https://api.openbrewerydb.org/v1/breweries/${id}`
            );
            const data = await response.json();
            setBrewery(data);
        }
        fetchBrewery();
    }, []);

    const handleInput = (input) => {
        return input ? input : "N/A";
    };

    const formatPhone = (phone) => {
        if (!phone) return "N/A";
        if (phone.length !== 10) return phone;
        return `(${phone.substring(0, 3)}) ${phone.substring(
            3,
            6
        )}-${phone.substring(6, 10)}`;
    };

    if (!brewery) return <div>Loading...</div>;

    return (
        <div className="brewery-detail">
            <h2>{brewery.name}</h2>
            <p>
                <strong>Type</strong>: {handleInput(brewery.brewery_type)}
            </p>
            <p>
                <strong>Address</strong>: {handleInput(brewery.street)}
            </p>
            <p>
                <strong>City</strong>: {handleInput(brewery.city)}
            </p>
            <p>
                <strong>State</strong>: {handleInput(brewery.state)}
            </p>
            <p>
                <strong>Phone</strong>: {formatPhone(brewery.phone)}
            </p>
            <p>
                <strong>Website</strong>:{" "}
                {brewery.website_url ? (
                    <a
                        href={brewery.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {brewery.website_url}
                    </a>
                ) : (
                    "N/A"
                )}
            </p>
        </div>
    );
};

export default BreweryDetail;
