'use client';

import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment/moment';

import BasicSelect from '@/components/BasicSelect/BasicSelect';
import BasicDatePicker from '@/components/BasicDateTimePicker/BasicDateTimePicker.jsx';
import Header from '@/components/Header/Header.jsx';

import Button from '@/components/Button/Button';

import styles from './styles.module.css';
import Spinner from '@/components/Spinner/Spinner';

const page = ({ params }) => {
  const [chartOptions, setChartOptions] = useState();
  const [period, setPeriod] = useState('realTime');
  const [frequency, setFrequency] = useState('5min');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [error, setError] = useState();

  const fetchData = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (json.code) {
          setError('No hay datos para las fechas seleccionadas, por favor intente nuevamente modificando las fechas de inicio y fin.');
          return;
        }
        const sortedData = json.values
          .map((item) => ({
            ...item,
            datetime: moment(item.datetime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM HH:mm'),
          }))
          .sort((a, b) => a.datetime - b.datetime);

        setChartOptions({
          title: {
            text: `${params.action}`,
          },
          xAxis: {
            categories: sortedData.map((item) => item.datetime),
          },
          series: [
            {
              data: sortedData.map((item) => Number(item.close)),
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData(`https://api.twelvedata.com/time_series?symbol=${params.action}&interval=${frequency}&apikey=${process.env.API_KEY}`);
  }, []);

  const updateChart = () => {
    setError();

    if (period === 'realTime') {
      const url = `https://api.twelvedata.com/time_series?symbol=${params.action}&interval=${frequency}&apikey=${process.env.API_KEY}`;
      fetchData(url);
    } else {
      const url = `https://api.twelvedata.com/time_series?symbol=${params.action}&interval=${frequency}&apikey=${process.env.API_KEY}&start_date=${startDate.format('YYYY-MM-DD HH:mm:ss')}&end_date=${endDate.format('YYYY-MM-DD HH:mm:ss')}`;
      fetchData(url);
    }
  };

  const periodOptions = [
    {
      name: 'Tiempo real',
      value: 'realTime',
    },
    {
      name: 'Historico',
      value: 'historic',
    },
  ];

  const frequencyOptions = [
    {
      name: '1 minuto',
      value: '1min',
    },
    {
      name: '5 minutos',
      value: '5min',
    },
    {
      name: '15 minutos',
      value: '15min',
    },
  ];

  return (
    <div className={styles.container}>
      <Header page={params.action} user="origin" />
      {chartOptions ? (
        <div className={styles.chartOptions}>
          <div className={styles.select}>
            <span>Periodo</span>
            <BasicSelect value={period} setValue={setPeriod} options={periodOptions} />
          </div>
          <div className={styles.select}>
            <p>Intervalo</p>
            <BasicSelect value={frequency} setValue={setFrequency} options={frequencyOptions} />
          </div>

          {period === 'historic' && (
            <div className={styles.select}>
              <div className={styles.date}>
                <p>Fecha desde</p>
                <BasicDatePicker value={startDate} setValue={setStartDate} />
              </div>
              <div className={styles.date}>
                <p>Fecha hasta</p>
                <BasicDatePicker value={endDate} setValue={setEndDate} />
              </div>
            </div>
          )}

          <Button text="Actualizar grafico" onClick={() => updateChart()} />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.chart}>
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
            />
          </div>

        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default page;
