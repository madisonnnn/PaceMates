import React, { useContext } from "react";
import QuoteContext from "../contexts/QuotesContext";

//creating the function quotes display
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