import { useRef, useState, useEffect } from 'react';
import HistoricalChart from './HistoricalChart.js'
import {Row, Col, Container} from 'react-bootstrap'
import CoinData from './CoinData.js'
import Dropdown from './Dropdown.js'
import { format, sub, eachDayOfInterval } from 'date-fns'
import axios from 'axios';
import { Line } from 'react-chartjs-2'

const Charts = ({ filteredCoins }) => {

  const [coin, setCoin] = useState('bitcoin');
  const [priceData, setPriceData] = useState();
  const [prices, setPrices] = useState()
  const [chartData, setChartData] = useState()
  const [dates, setDates] = useState()
  const childRef = useRef(false);

  useEffect( () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: '100'
          }
        })
      .then(res => {
        childRef.current = true;
        setPriceData(res.data.prices)
        console.log(`price Data of ${coin} is`, priceData);
        getPrices();
      })
      .catch(error => console.log(error))
      getDates();
      historicalChart();

  }, [coin])

  const getDates = () => {

    const todaysDate = new Date();
    const daysBack = sub(todaysDate, {days: 100});
    const range = eachDayOfInterval(
    { start: daysBack, end: todaysDate })

    const rangeFormatted = range.map((el) => {
      const dateFormatted = format(el, 'MM/dd/yy');
      return dateFormatted
    });
    setDates(rangeFormatted);
  }

  const getPrices = () => {
      if(priceData){
      const targetData = [];
      Object.values(priceData).forEach(val =>
        targetData.push(val[1]));
      setPrices(targetData);
    }
}

const historicalChart =() => {
  setChartData({
    labels: dates,
    datasets: [
      {
        label: 'daily closes',
        data: prices,
        fill: true,
        borderColor : 'purple',
        tension: 0.1
      }
    ]
  })
}



  console.log('prices are', prices);

    return (
          <Container>
            <Row>
              <Col>
                <Dropdown filteredCoins={filteredCoins} setCoin={setCoin} coin={coin}/>
              </Col>
              <Col>
                <Line
                  data={chartData}
                  height={400}
                  width={900}
                  options={{
                    maintainAspectRatio: false,
                  }} />
                </Col>
            </Row>
            <Row>
              <Col>
              </Col>
              <Col>
                <CoinData />
              </Col>
            </Row>
          </Container>
        )


}

export default Charts
