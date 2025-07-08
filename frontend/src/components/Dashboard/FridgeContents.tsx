import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

// ✅ Define correct type
interface FridgeItem {
  id: number;
  name: string;
  quantity: number;
  storage_day: number;
}

interface Props {
  items: FridgeItem[];
  onDelete: (id: number) => void;
}

function FridgeContents({ items, onDelete }: Props) {
  return (
    <div>
      <h3>Fridge Contents</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Actions</TableCell> {/* ✅ Added Delete Column */}
              <TableCell align='right'>Day</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">
                
                  <Button variant="contained" color="error" onClick={() => onDelete(item.id)}>
                    Delete
                  </Button>
                
                </TableCell> {/* ✅ Delete Button */}
                <TableCell align='right'>{item.storage_day}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FridgeContents;
