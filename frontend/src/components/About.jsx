import '../assets/styles/about.css'

function About () {
    return (
        <>
        <div className='about'>
            <h1 className='about-title'>About</h1>
            <p className='about-text'>
                This is an app that allows you to keep track of your favorite 
                cryptocurrencies, and see the top 4 current gainers. 
                We have visualized the last 7 days of data when the cryptocurrency is displayed on the graph.
                All the data is real-time, and is fetched from the CoinGecko API.
                The user data is stored within a RESTful api created with Node.js and Express.js, and the data is stored in a MongoDB database.
            </p>
        </div>
        </>
    )
}

export default About;