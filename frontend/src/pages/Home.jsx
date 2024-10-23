import QuoteDisplay from "../components/QuoteDisplay"

export default function HomePage() {
  return <>
    <h1>Home</h1>
    <p>Put something interesting here!</p>
    <section className='quote-space'>
      <section className="quotesection">
        <QuoteDisplay />
      </section>
    </section>
  </>
}
