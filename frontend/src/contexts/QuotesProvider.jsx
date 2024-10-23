import { useEffect, useState } from "react";
import QuoteContext from "./QuotesContext";
import { fetchHandler } from "../utils/fetchingUtils";

const QuoteProvider = ({ children }) => {

    const [quotes, setQuotes] = useState([])
    const [error, setError] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const fetch = async () => {
            const [data, error] = await fetchHandler(`/api/quotes`)

            if (data) {
             setQuotes(data)
             setCurrentIndex(0)
            }
         
            if (error) setError(error.message)
        }
        fetch()
    }, [])

   

    useEffect(() => {
     if (quotes.length > 0) {
         const interval = setInterval(() => {
             setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length)
         }, 3600000)

         return () => clearInterval(interval)
     }
 }, [quotes]) 
  console.log('quote:', quotes[currentIndex])
    let contextValues = {
     quote: quotes.length > 0 ? quotes[currentIndex].q : '', 
     error,
     setQuote: (newQuote) => setQuotes([newQuote, ...quotes])
    }

    console.log("it's me the api file")
    return (
        <QuoteContext.Provider value={contextValues}>
            {children}
        </QuoteContext.Provider>
    )

}


export default QuoteProvider