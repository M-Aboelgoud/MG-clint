import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormTable from './components/FormTable';
import FormFilter from './components/FormFilter';
import DownloadButton from './components/DownloadButton';
import './App.css';

function App() {
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = () => {
    const apiUrl = 'https://indirect-selie-mgconstruction-1a5db856.koyeb.app/api/form';
    axios.get(apiUrl)
      .then(response => {
        if (response.data.success) {
          setForms(response.data.data);
          setFilteredForms(response.data.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  };

  const filterForms = (searchId) => {
    let filtered = forms;

    if (startDate && endDate) {
      filtered = filtered.filter(form => {
        const formDate = new Date(form.createdAt);
        return formDate >= startDate && formDate <= endDate;
      });
    }

    if (searchId) {
      filtered = filtered.filter(form => form._id.includes(searchId));
    }

    setFilteredForms(filtered);
  };

  const deleteForm = (id) => {
    const apiUrl = `https://indirect-selie-mgconstruction-1a5db856.koyeb.app/api/form/${id}`;
    axios.delete(apiUrl)
      .then(response => {
        if (response.data.success) {
          fetchForms(); // Refresh the list after deletion
        }
      })
      .catch(error => {
        console.error('There was an error deleting the data!', error);
      });
  };

  return (
    <div className="App">
      <header>
        <h1>MG</h1>
        <FormFilter
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          filterForms={filterForms}
        />
        <FormTable forms={filteredForms} onDelete={deleteForm} />
        <DownloadButton forms={filteredForms} />
      </header>
    </div>
  );
}

export default App;
