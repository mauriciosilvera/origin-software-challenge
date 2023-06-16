import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import PropTypes from 'prop-types';

const tableHeaders = ['Simbolo', 'Nombre', 'Moneda', 'Eliminar'];

export default function SimbolsTable({ data, setData }) {
  const handleDelete = (id) => {
    setData(data.filter((item) => item.symbol !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((row) => (
              <TableCell sx={{ backgroundColor: '#1488c9', color: 'white', fontWeight: 'bold' }} align="center">{row}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        {data.map((row) => (
          <TableBody>
            <TableRow
              key={row.symbol}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row" sx={{ color: '#1488c9' }}>
                <Link href={`./my-actions/${row.symbol}`}>
                  {row.symbol}
                </Link>
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.currency}</TableCell>
              <TableCell align="center">
                <DeleteIcon
                  sx={{ color: '#c70000', cursor: 'pointer' }}
                  onClick={() => handleDelete(row.symbol)}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </TableContainer>
  );
}

SimbolsTable.propTypes = {
  data: PropTypes.number.isRequired,
  setData: PropTypes.func.isRequired,
};
