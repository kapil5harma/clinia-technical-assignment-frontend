import * as React from 'react';
import Box from '@mui/material/Box';
import { getFormData } from '../../services/httpService';
import CustomInput from '../CustomInput/CustomInput';

class AppointmentForm extends React.Component {
  state = {
    formData: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { selectedService } = this.props;
    if (prevProps.selectedService === selectedService) {
      return;
    }

    const forms = await getFormData();
    let formData;

    forms.map((form) => {
      if (form.services.includes('*') && formData === undefined) {
        formData = { ...form };
      }
      if (form.services.includes(selectedService)) {
        formData = { ...form };
      }
    });

    this.setState({ formData });
  }

  handleChange = (event) => {
    console.log('event: ', event);
    const { name, value } = event.target;
    const { formData } = this.state;
    let { fields } = formData;

    fields.map((field) => {
      if (field.name === name) {
        field.value = value;
      }
    });

    this.setState({ formData: { ...formData, fields } });
  };

  render() {
    const { formData } = this.state;
    if (!formData) return null;
    const { title, fields } = formData;

    return (
      <div>
        <h2>{title}</h2>
        <Box component='form' sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2 }} noValidate autoComplete='off'>
          {fields?.map((field) => {
            return <CustomInput key={field?.name} field={field} handleChange={this.handleChange}></CustomInput>;
          })}
        </Box>
        <CustomInput></CustomInput>

        {/* <FormControl sx={{ m: 1, minWidth: 240 }}>
          <InputLabel id='demo-simple-select-helper-label'>Service</InputLabel>
          <Select labelId='demo-simple-select-helper-label' id='demo-simple-select-helper' value={0} label='Please select a service' onChange={this.handleChange}>
            {[]?.map((service) => {
              return (
                <MenuItem key={service} value={service}>
                  {service}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl> */}
      </div>
    );
  }
}

export default AppointmentForm;
