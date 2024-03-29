import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Charts from './components/Charts.js'
import List from './components/List.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col} from 'react-bootstrap'
import './custom.scss'
import './App.css';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const onClick = () => {
    showCharts ? (setShowCharts(false)) : (setShowCharts(true))
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className='coin-app'>
      <h1 className='coin-text'>... market overview </h1>
        <Container>
          <Row>
            <Col>
              <div className='coin-search'>
                <form>
                  <input
                  className='coin-input'
                  type='text'
                  onChange={handleChange}
                  placeholder='search'
                  />
              </form>
            </div>
          </Col>
          <Col className="d-flex justify-content-end" style={{paddingBottom: '70px'}}>
          <Button size='lg' onClick={onClick}
           variant='outline-info'>{showCharts ? `list` : `charts`}</Button>
          </Col>
        </Row>
      </Container>
      {showCharts ? <Charts
        filteredCoins={filteredCoins}/> :
        <List filteredCoins={filteredCoins} setCoins={setCoins} />}
    </div>
  );
}

export default App;
