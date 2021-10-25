import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

export default class CustomInput extends React.Component {
  render() {
    const { field, handleChange } = this.props;
    if (!field?.type) return null;
    const { type, name, label, value, options } = field;

    switch (type) {
      case 'text':
        return <TextField id='outlined-name' name={name} label={label} value={value} onChange={handleChange} />;
      case 'email':
        return <TextField id='outlined-name' name={name} label={label} value={value} onChange={handleChange} />;
      case 'phone':
        return <TextField id='outlined-name' name={name} label={label} value={value} onChange={handleChange} />;
      case 'dropdown':
        // return <TextField id='outlined-name' name={name} label={label} value={value} onChange={handleChange} />;
        return (
          <FormControl sx={{ m: 1, minWidth: 240 }}>
            <InputLabel id='demo-simple-select-helper-label'>{label}</InputLabel>
            <Select labelId={name} id={name} name={name} value={value} label='Please select an option' onChange={handleChange}>
              <MenuItem value='' key='none'>
                <em>None</em>
              </MenuItem>
              {options?.map((option) => {
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      case 'textarea':
        return <TextField id='outlined-name' name={name} label={label} value={value} onChange={handleChange} />;
    }
  }
}
