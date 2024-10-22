import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TotalUser({ data: cdata }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>Total purchases per User</caption>
                <TableHead>
                    <TableRow>
                        <TableCell>User Id</TableCell>
                        <TableCell>Total Purchases</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cdata.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.userId}</TableCell>
                            <TableCell>{row.totalPurchase}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
