import React, { useContext } from "react";
import QuoteContext from "../contexts/QuotesContext";
import "../styles/QuoteDisplay.css"

const QuoteDisplay = () => {

    const { quote, error } = useContext(QuoteContext);

    if (error) return <p>Error: {error}</p>;
    if (!quote) return <p>Loading...</p>;

    return (
        <div className="quotebox">
            <p className="quote">{quote}</p>
        </div>
    );
};

export default QuoteDisplay;