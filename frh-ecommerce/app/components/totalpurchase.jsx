import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function totalpurchase({data}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>Total purchases per year</caption>
                <TableHead>
                    <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Total Purchases</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {data.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.userId}</TableCell>
                            <TableCell>{row.year}</TableCell>
                            <TableCell>{row.totalPurchases}</TableCell>
                        </TableRow>
                    ))} */}
                </TableBody>
            </Table>
        </TableContainer>
    );
}



