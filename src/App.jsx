import { useState, useEffect } from 'react'
import './App.css'
import { SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Input, Card, Switch, Progress } from 'antd';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null)
  const [isSwitch, setIsSwitch] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
  
      const uri = `https://api.weatherapi.com/v1/current.json?key=a1ed78662b6b4c80b24154746252908&q=${position.coords.latitude},${position.coords.longitude}&aqi=yes`
      async function main() {
        const res = await axios.get(uri)
        let weatherData = {
          icon : res.data.current.condition.icon,
          city : res.data.location.name,
          temp : res.data.current.temp_c,
          hum : res.data.current.humidity,
          win : res.data.current.wind_kph,
          vis : res.data.current.vis_km,
          uv : res.data.current.uv,
          aqi: res.data.current.air_quality["us-epa-index"]
        }
        setData(weatherData)
      }
      main()
    })
  },[])

  async function hanldeInputChange(e) {
    console.log(e.target.value)
    const uri = `https://api.weatherapi.com/v1/current.json?key=a1ed78662b6b4c80b24154746252908&q=${e.target.value}&aqi=yes`
    const res = await axios.get(uri)
    let weatherData = {
      icon : res.data.current.condition.icon,
      city : e.target.value,
      temp : res.data.current.temp_c,
      hum : res.data.current.humidity,
      win : res.data.current.wind_kph,
      vis : res.data.current.vis_km,
      uv : res.data.current.uv,
      aqi: res.data.current.air_quality["us-epa-index"] 
    }
    setData(weatherData)
  }

  function onSwitchChange(checked) {
    setIsSwitch(checked)
  }

  const aqiColors = {
    '0%': '#00e400',     // Good - Green
    '16.66%': '#ffff00', // Moderate - Yellow
    '33.33%': '#ff7e00', // Unhealthy for Sensitive Groups - Orange
    '50%': '#ff0000',    // Unhealthy - Red
    '66.66%': '#8f3f97', // Very Unhealthy - Purple
    '83.33%': '#7e0023', // Hazardous - Maroon
    '100%': '#7e0023'    // Extend Hazardous to 100%
  };

  const level = {
    1 : 16.66,
    2 : 33.33,
    3 : 50,
    4 : 66.66,
    5 : 83.33,
    6 : 100
  }

  return (
    <>
      <div className="input-container">
        <Input size="large" placeholder="large size" prefix={<SearchOutlined />} onChange={hanldeInputChange} />
      </div>
      <Card style={{width: 650, textAlign:'center', margin: 'auto'}}>
        <div className="weather-container">
          <h3> <EnvironmentOutlined /> {data?.city} </h3>
          <img src={data?.icon} alt="" height={100} width={100}/>
          <h1>{data?.temp}</h1>
          <div className="weather-meta-data">
            <Card style={{ width: 250, marginBottom: '5px' }}>
              <img height={50} width={50} src="https://cdn-icons-png.flaticon.com/256/4148/4148460.png" alt="" />
              <h3>{data?.hum}%</h3>
              <p>humidity</p>
            </Card>
            <Card style={{ width: 250, marginBottom: '5px' }}>
              <img height={50} width={50} src="https://cdn-icons-png.flaticon.com/512/54/54298.png" alt="" />
              <h3>{data?.win}%</h3>
              <p>Wind Speed</p>
            </Card>
            <Card style={{ width: 250, marginBottom: '5px' }}>
              <img height={50} width={50} src="https://cdn-icons-png.flaticon.com/512/159/159078.png" alt="" />
              <h3>{data?.vis}%</h3>
              <p>Visibility</p>
            </Card>
            <Card style={{ width: 250, marginBottom: '5px' }}>
              <img height={50} width={50} src="https://cdn-icons-png.flaticon.com/512/3512/3512031.png" alt="" />
              <h3>{data?.uv}%</h3>
              <p>UV</p>
            </Card>
          </div>
        </div>
      </Card>

      <Card style={{width: 650, textAlign:'center', margin: '20px auto'}}>
        <div className='switch-container'>
          <h3>Air Quality</h3>
          <Switch  onChange={onSwitchChange}/>
        </div>

        {
          isSwitch && (
            <div style={{marginTop: '20px'}}>
              {console.log(level[data.aqi])}
              <Progress percent={level[data.aqi]} strokeColor={aqiColors} />
            </div>
          )
        }
      </Card>
    </>
  )
}

export default App
