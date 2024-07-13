import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css'; // Import the CSS file

const FormFilter = ({ startDate, setStartDate, endDate, setEndDate, filterForms }) => {
    const [searchId, setSearchId] = useState('');

    const handleSearch = () => {
        filterForms(searchId);
    };

    return (
        <div className="filter-container">
            <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Search by ID"
            />
            <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                placeholderText="Start Date"
            />
            <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                placeholderText="End Date"
            />
            <button onClick={handleSearch}>Filter</button>
        </div>
    );
};

export default FormFilter;
