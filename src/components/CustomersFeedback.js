import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Tab, Tabs, Card, CardContent, Typography, Box, Grid } from '@mui/material';

const CustomersFeedback = () => {
    const [data, setData] = React.useState([]);
    const [tab, setTab] = React.useState(0);

    React.useEffect(() => {
        fetchData().then(setData);
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'customerName', headerName: 'Customer Name', width: 130 },
        { field: 'customerReview', headerName: 'Review', width: 330 },
        { field: 'customerRating', headerName: 'Rating', width: 90 },
    ];

    const ratings = [3, 2, 1]; // Good, Average, Bad

    const getCardColor = (rating) => {
        switch (rating) {
            case 3:
                return 'green';
            case 2:
                return 'yellow';
            case 1:
                return 'red';
            default:
                return 'white';
        }
    };

    const getRatingLabel = (rating) => {
        switch (rating) {
            case 3:
                return 'Good';
            case 2:
                return 'Average';
            case 1:
                return 'Bad';
            default:
                return '';
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={(event, newValue) => setTab(newValue)}>
                    <Tab label="Data Grid" />
                    <Tab label="Column Display" />
                </Tabs>
            </Box>
            {tab === 0 && (
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={data} columns={columns} pageSize={5} />
                </div>
            )}
            {tab === 1 && (
                <Grid container spacing={2}>
                    {ratings.map((rating) => (
                        <Grid item xs={4} key={rating}>
                            <Typography variant="h6">{getRatingLabel(rating)}</Typography>
                            {data.filter((item) => item.customerRating === rating).map((item) => (
                                <Card key={item.id} sx={{ margin: 1 }}>
                                    <Box sx={{ width: '10px', height: '9%', backgroundColor: getCardColor(item.customerRating), position: 'absolute' }} />
                                    <CardContent>
                                        <Typography variant="body1">{item.customerReview}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

async function fetchData() {
    const response = await fetch('http://localhost:8080/CRM/GetAllCustomerFeebacks');
    const data = await response.json();
    return data.map(item => ({
        id: item.id,
        customerName: item.customerName,
        customerReview: item.customerReview,
        customerRating: item.customerRating,
    }));
}

export default CustomersFeedback;
