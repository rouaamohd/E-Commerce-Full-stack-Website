import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EcommerceRepo from '@/app/repo/frh-ecommerce-repo.js'

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData('Test Year 2014', 23000),
];

export default async function artistTable({ customers }) {
  const customerData = [];

  for (const customer of customers) {
    const customerItems = await EcommerceRepo.getUserTransactions(customer.id);
    customerData.push({ ...customer, customerItems: customerItems.length });
  }


  return (
    <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="caption table">
    <caption>About Customers</caption>
    <TableHead>
      <TableRow>
        <TableCell>Customer Name</TableCell>
        <TableCell align="right">Customer Username</TableCell>
        <TableCell align="right">Customer ID</TableCell>
        <TableCell align="right">Customer Balance</TableCell>
        <TableCell align="right">No. of Purchases Done</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {customerData.map((customer) => (
          <TableRow key={customer.name}>
            <TableCell component="th" scope="row">
              {customer.name}
            </TableCell>
            <TableCell align="right">{customer.username}</TableCell>
            <TableCell align="right">{customer.id}</TableCell>
            <TableCell align="right">{customer.balance}</TableCell>
            <TableCell align="right">{customer.customerItems}</TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
</TableContainer>

  );
}


