'use client';

import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styles from './styles.module.css';
import SimbolsTable from '@/components/SimbolsTable/SimbolsTable';
import Button from '@/components/Button/Button';
import Spinner from '@/components/Spinner/Spinner';
import Header from '@/components/Header/Header';

function MyActions() {
  const [actionsData, setActionsData] = useState();
  const [selectedAction, setSelectedAction] = useState();
  const [tableData, setTableData] = useState([]);
  const [alreadyExists, setAlreadyExists] = useState();

  useEffect(() => {
    fetch('https://api.twelvedata.com/stocks?source=docs&exchange=NYSE')
      .then((res) => res.json())
      .then((json) => {
        setActionsData(json.data);
      });
  }, []);

  const handleAddSymbol = () => {
    setAlreadyExists();
    const exists = tableData.some((item) => item.symbol === selectedAction.symbol);
    if (!exists) {
      setTableData([...tableData, selectedAction]);
    } else {
      setAlreadyExists('Este simbolo ya se encuentra agregado a la tabla.');
    }
  };

  return (
    <div className={styles.container}>
      <Header page="Mis acciones" user="origin" />
      {actionsData ? (
        <div className={styles.viewContainer}>
          <div className={styles.searchBar}>
            <p className={styles.label}>Simbolo</p>
            <Autocomplete
              disablePortal
              id="simbols"
              options={actionsData}
              getOptionLabel={(option) => option.symbol}
              sx={{ width: '50%' }}
              renderInput={(params) => <TextField {...params} label="Buscar..." />}
              onChange={(event, newValue) => {
                setSelectedAction(newValue);
              }}
            />
            <Button text="Agregar simbolo" onClick={handleAddSymbol} />
          </div>
          {alreadyExists && <p>{alreadyExists}</p>}
          {tableData.length > 0
            ? (<SimbolsTable data={tableData} setData={setTableData} />)
            : (<p>En este momento no se encuentran simbolos cargados.</p>)}
        </div>
      ) : (<Spinner />)}

    </div>
  );
}

export default MyActions;
