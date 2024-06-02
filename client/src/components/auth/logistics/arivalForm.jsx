import React, { useState } from 'react';
import { TextInput, Button, Container, Paper, Title, Space } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';

const ArrivalForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    flag: '',
    port_of_dep: '',
    crew: '',
    pier: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // createArrival(formData);
  };

  return (
    <Container size="sm" my="xl">
      <Paper shadow="md" p="lg">
        <Title order={2} align="center">Arrival Form</Title>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="ID"
            placeholder="ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
          <Space h="md" />
          <TextInput
            label="Name"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Space h="md" />
          <TextInput
            label="Flag"
            placeholder="Flag"
            name="flag"
            value={formData.flag}
            onChange={handleChange}
            required
          />
          <Space h="md" />
          <TextInput
            label="Port of Departure"
            placeholder="Port of Departure"
            name="port_of_dep"
            value={formData.port_of_dep}
            onChange={handleChange}
            required
          />
          <Space h="md" />
          <TextInput
            label="Crew"
            placeholder="Crew"
            name="crew"
            value={formData.crew}
            onChange={handleChange}
            required
          />
          <Space h="md" />
          <TextInput
            label="Pier"
            placeholder="Pier"
            name="pier"
            value={formData.pier}
            onChange={handleChange}
            required
          />
          <Space h="md" />
          <DateInput valueFormat="YYYY-MM-DD" label="Date input" placeholder="Date input" />
          <Space h="lg" />
          <Button type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ArrivalForm;
