
const Dropdown = ({ setCoin, filteredCoins, coin}) => {

  const handleChange = (e) => {
    setCoin(e.target.value);
  }

    return (
      <select onChange={e => handleChange(e)} className='form'>
        {filteredCoins.map(coin => {
          return <option key={coin.id}>{coin.id}</option>
          })
        }
    </select>
    )
}

export default Dropdown
