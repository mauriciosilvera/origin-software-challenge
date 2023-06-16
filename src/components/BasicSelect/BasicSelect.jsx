import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

export default function BasicSelect(props) {
  const { value, setValue, options } = props;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Box sx={{ minWidth: 400 }}>
      <FormControl fullWidth>
        <Select
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          {options.map((item) => (
            <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
          ))}

        </Select>
      </FormControl>
    </Box>
  );
}

BasicSelect.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.array,
};
