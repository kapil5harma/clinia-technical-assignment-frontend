import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { Component } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AppointmentForm from '../components/AppointmentForm/AppointmentForm';
import { getServices } from '../services/httpService';

type Props = {
  name?: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const name = (context.query.name as string) ?? null;

  return {
    props: {
      name,
    },
  };
};

class HomePage extends Component {
  state = {
    services: [],
    selectedService: '',
  };

  async componentDidMount() {
    const services = await getServices();
    this.setState({ services });
  }
  handleChange = (event) => {
    this.setState({ selectedService: event.target.value });
  };

  render() {
    const { selectedService, services } = this.state;

    return (
      <React.Fragment>
        <Head>
          <title>Appointment Form</title>
        </Head>

        <FormControl sx={{ m: 1, minWidth: 240 }}>
          <InputLabel id='demo-simple-select-helper-label'>Service</InputLabel>
          <Select labelId='demo-simple-select-helper-label' id='demo-simple-select-helper' value={selectedService} label='Please select a service' onChange={this.handleChange}>
            <MenuItem value='' key='none'>
              <em>None</em>
            </MenuItem>
            {services?.map((service) => {
              return (
                <MenuItem key={service} value={service}>
                  {service}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {selectedService && <AppointmentForm selectedService={selectedService} />}
      </React.Fragment>
    );
  }
}

export default HomePage;
