import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({ firstName: '', lastName: '', email: '', jobPosition: '', phone: '', mobileNumber: '', fax: '' });

    const columns = [
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'jobPosition', headerName: 'Job Position', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'mobileNumber', headerName: 'Mobile Number', width: 150 },
        { field: 'fax', headerName: 'Fax', width: 150 },
    ];

    const [filterModel, setFilterModel] = React.useState({
        items: [{ field: 'firstName', operatorValue: 'contains', value: '' }],
    });

    const fetchCustomers = async () => {
        try {
            const res = await axios.get('http://localhost:8080/CRM/GetAllCustomer');
            setCustomers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewCustomer({ firstName: '', lastName: '', email: '', jobPosition: '', phone: '', mobileNumber: '', fax: '' });
    };

    const handleChange = e => {
        setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/CRM/AddCustomer', newCustomer)
            .then(res => {
                if (res.data && res.data.id) {
                    fetchCustomers();
                    handleClose();
                } else {
                    console.error('The response does not have an id');
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div style={{ overflowY: 'auto' }}>
            <div>
                <h2> Customers List</h2>
                <Button variant="contained" color="primary" onClick={handleOpen} style={{ float: 'right' }}>Add Customer</Button>
                <br></br>
                <br></br>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Customer</DialogTitle>
                <Box mt={1}>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <TextField  name="firstName" value={newCustomer.firstName} onChange={handleChange}  label="First Name" fullWidth />
                            <TextField name="lastName" value={newCustomer.lastName} onChange={handleChange} label="Last Name" fullWidth />
                            <TextField name="email" value={newCustomer.email} onChange={handleChange} label="Email" fullWidth />
                            <TextField name="jobPosition" value={newCustomer.jobPosition} onChange={handleChange} label="Job Position" fullWidth />
                            <TextField name="phone" value={newCustomer.phone} onChange={handleChange} label="Phone" fullWidth />
                            <TextField name="mobileNumber" value={newCustomer.mobileNumber} onChange={handleChange} label="Mobile Number" fullWidth />
                            <TextField name="fax" value={newCustomer.fax} onChange={handleChange} label="Fax" fullWidth />
                            <DialogActions>
                                <Button type="submit" variant="contained" color="primary">Save</Button>
                                <Button onClick={handleClose} variant="contained" color="secondary">Cancel</Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Box>
            </Dialog>
            <div style={{ height: '70%', width: '100%' }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    filterModel={filterModel}
                    onFilterModelChange={(model) => setFilterModel(model)}
                />
            </div>
        </div>
    );
};

export default CustomerList;
