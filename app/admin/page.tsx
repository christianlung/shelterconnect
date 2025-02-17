"use client"

import { useState } from "react";

import AdminList from '@/components/AdminList';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

export default function Page() {
  const [shelters, setShelters] = useState([
    {
      name: "Shelter A",
      address: "123 Main St, Springfield",
      categories: [
        { category: "Food", received: 5, needed: 10 },
        { category: "Water", received: 8, needed: 15 },
        { category: "Clothing", received: 12, needed: 20 },
        { category: "Medical Supplies", received: 4, needed: 10 }
      ]
    }
  ]);

  const [open, setOpen] = useState(false);
  const [newShelter, setNewShelter] = useState({ name: "", address: "", categories: [] });

  const handleAddShelter = () => {
    if (newShelter.name.trim() && newShelter.address.trim()) {
      setShelters([...shelters, newShelter]);
      setOpen(false);
      setNewShelter({ name: "", address: "", categories: [] });
    }
  };

  const handleDeleteShelter = (index: number) => {
    setShelters(shelters.filter((_, i) => i !== index));
  };

  return (
    <div>
      <title>ShelterConnect | Admin</title>
      <Box sx={{ maxWidth: 600, margin: "auto", pt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", ml: 1.5 }}>
          My Shelters
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 1, mb: 2, ml: 2 }}>
          <Button variant="contained" color="primary" sx={{ textTransform: "none", borderRadius: "6px" }} onClick={() => setOpen(true)} >
            + New
          </Button>
        </Box>
        <AdminList shelters={shelters} onDelete={handleDeleteShelter} />

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add New Shelter</DialogTitle>
          <DialogContent>
            <TextField
              label="Shelter Name"
              fullWidth value={newShelter.name}
              onChange={(e) => setNewShelter({ ...newShelter, name: e.target.value })}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Address"
              fullWidth value={newShelter.address}
              onChange={(e) => setNewShelter({ ...newShelter, address: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpen(false); setNewShelter({ name: "", address: "", categories: [] }); }} color="error">Cancel</Button>
            <Button onClick={handleAddShelter} variant="contained" color="primary">Add</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}