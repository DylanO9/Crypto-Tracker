import * as faIcons from 'react-icons/fa';

function Coin (props) {
    // Props will pass the name of the coin
    // use the API to fetch the data for the coin
    // display the data for the coin

    const image = props.image;
    const price_raw = props.market_data.current_price.usd;
    const price = parseFloat(price_raw.toPrecision(6));
    const priceChange_raw = props.market_data.price_change_percentage_7d;
    const priceChange = parseInt(priceChange_raw.toString(), 10);

    const deleteFavorite = async (searchTerm) => {
        const responseFavorites = await fetch('/api/favorites');
        const jsonFavorites = await responseFavorites.json();
        if (responseFavorites.ok) {
            console.log('Favorites: ', jsonFavorites);
            let deleteId = null;
            jsonFavorites.map((el) => {
                if(el.id === searchTerm) {
                    deleteId = el._id;
                }
            });

            props.setAllFavorites(props.allFavorites.filter((el) => el.id !== searchTerm));
            console.log('newFavorites: ', props.allFavorites);
            const deleteResponse = await fetch('/api/favorites/' + deleteId, {
                method: 'DELETE',
            });
            const deleteJson = await deleteResponse.json();
            if (deleteResponse.ok) {
                console.log('delete successful');
            }
        }
    };
        return (
            <>
                <div className='coin' key={props.id}>
                    <div className="coin-top">
                        <img src={image.small} alt='' className='coin-image'></img>
                        <faIcons.FaTrash className='trash' onClick={() => {deleteFavorite(props.id)}}/>
                    </div>
                    <div className='mid-coin'>
                        <h1 className='coin-name'>{props.name}</h1>
                        <h1 className='coin-symbol'>{props.symbol}</h1>
                    </div>
                    <div className='side-coin'>
                        <h1 className='current-price'>${price}</h1>
                        <h1 className="price-change-7-days">{priceChange}%</h1>
                    </div>
                </div>
            </>
        )
    }
    
    export default Coin;