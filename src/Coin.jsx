/* eslint-disable react/prop-types */
function Coin (props) {
// Props will pass the name of the coin
// use the API to fetch the data for the coin
// display the data for the coin
const image = props.image;
const price = props.market_data.current_price.usd;
const priceChange_raw = props.market_data.price_change_percentage_7d;
const priceChange = parseInt(priceChange_raw.toString(), 10);
console.log('thumb: ' + image.thumb);
    return (
        <>
            <div className='coin' key={props.id}>
                <img src={image.small} alt='' className='coin-image'></img>
                <div className='mid-coin'>
                    <h1 className='coin-name'>{props.name}</h1>
                    <h1 className='coin-symbol'>{props.symbol}</h1>
                </div>
                <div className='side-coin'>
                    <h1 className='current-price'>${price}</h1>
                    <h1 className="price-change-7-days">{priceChange}%</h1>
                </div>
            </div>
            <div className='divider'></div>
        </>
    )
}

export default Coin;