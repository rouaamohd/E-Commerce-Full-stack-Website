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

export default async function artistTable({ artists }) {
  const artistData = [];

  for (const artist of artists) {
    const artistItems = await EcommerceRepo.getItemByArtist(artist.id);
    artistData.push({ ...artist, artistItems: artistItems.length });
  }


  return (
    <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="caption table">
    <caption>About Artists</caption>
    <TableHead>
      <TableRow>
        <TableCell>Artist Name</TableCell>
        <TableCell align="right">Artist Username</TableCell>
        <TableCell align="right">Artist ID</TableCell>
        <TableCell align="right">Artist Balance</TableCell>
        <TableCell align="right">No. of Artist Works</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {artistData.map((artist) => (
          <TableRow key={artist.name}>
            <TableCell component="th" scope="row">
              {artist.name}
            </TableCell>
            <TableCell align="right">{artist.username}</TableCell>
            <TableCell align="right">{artist.id}</TableCell>
            <TableCell align="right">{artist.balance}</TableCell>
            <TableCell align="right">{artist.artistItems}</TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
</TableContainer>

  );
}


