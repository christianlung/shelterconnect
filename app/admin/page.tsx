"use client"

import { useState } from "react";

import AdminList from '@/components/AdminList';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";

export default function Page() {
  const [shelters, setShelters] = useState([
    {
      name: "Shelter A",
      location: { latitude: "34.0000", longitude: "-118.0000" },
      address: { street: "123 Main St", city: "Springfield", state: "CA", zip: "12345" },
      picture: "",
      volunteerCapacity: "50",
      evacueeCapacity: "200",
      accommodations: ["wheelchair_accessible"],
      suppliesNeeded: [{ item: "blankets", received: 5, needed: 10 }],
    },
  ]);

  const [open, setOpen] = useState(false);
  const [newShelter, setNewShelter] = useState({
    name: "",
    location: { latitude: "", longitude: "" },
    address: { street: "", city: "", state: "", zip: "" },
    picture: "",
    volunteerCapacity: "",
    evacueeCapacity: "",
    accommodations: [] as string[],
    suppliesNeeded: [] as { item: string; received: string; needed: string }[],
  });


  const handleAddShelter = () => {
    if (newShelter.name.trim() && newShelter.address.street.trim()) {
      const formattedShelter = {
        ...newShelter,
        suppliesNeeded: newShelter.suppliesNeeded?.map(supply => ({
          ...supply,
          received: Number(supply.received),
          needed: Number(supply.needed),
        })) || [],
      };
  
      setShelters([...shelters, formattedShelter]);
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setNewShelter({
      name: "",
      location: { latitude: "", longitude: "" },
      address: { street: "", city: "", state: "", zip: "" },
      picture: "",
      volunteerCapacity: "",
      evacueeCapacity: "",
      accommodations: [],
      suppliesNeeded: [],
    });
  };

  // Delete a shelter by filtering it out of the list
  const handleDeleteShelter = (index: number) => {
    setShelters(shelters.filter((_, i) => i !== index));
  };

  const addAccommodation = () => {
    setNewShelter({
      ...newShelter,
      accommodations: [...newShelter.accommodations, ""],
    });
  };

  const updateAccommodation = (index: number, value: string) => {
    const updated = [...newShelter.accommodations];
    updated[index] = value;
    setNewShelter({ ...newShelter, accommodations: updated });
  };

  const addSupply = () => {
    setNewShelter({
      ...newShelter,
      suppliesNeeded: [...newShelter.suppliesNeeded, { item: "", received: "", needed: "" }],
    });
  };

  const updateSupply = (index: number, field: "item" | "received" | "needed", value: string) => {
    const updated = [...newShelter.suppliesNeeded];
    updated[index] = { ...updated[index], [field]: value };
    setNewShelter({ ...newShelter, suppliesNeeded: updated });
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
        <AdminList shelters={shelters} onDelete={handleDeleteShelter}/>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Add New Shelter</DialogTitle>
          <DialogContent>
            <TextField
              label="Shelter Name"
              fullWidth
              value={newShelter.name}
              onChange={(e) => setNewShelter({ ...newShelter, name: e.target.value })}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Street"
              fullWidth
              value={newShelter.address.street}
              onChange={(e) =>
                setNewShelter({ ...newShelter, address: { ...newShelter.address, street: e.target.value } })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="City"
              fullWidth
              value={newShelter.address.city}
              onChange={(e) =>
                setNewShelter({ ...newShelter, address: { ...newShelter.address, city: e.target.value } })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="State"
              fullWidth
              value={newShelter.address.state}
              onChange={(e) =>
                setNewShelter({ ...newShelter, address: { ...newShelter.address, state: e.target.value } })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="ZIP"
              fullWidth
              value={newShelter.address.zip}
              onChange={(e) =>
                setNewShelter({ ...newShelter, address: { ...newShelter.address, zip: e.target.value } })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="Picture URL (optional)"
              fullWidth
              value={newShelter.picture}
              onChange={(e) => setNewShelter({ ...newShelter, picture: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Volunteer Capacity (optional)"
              fullWidth
              value={newShelter.volunteerCapacity}
              onChange={(e) => setNewShelter({ ...newShelter, volunteerCapacity: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Evacuee Capacity (optional)"
              fullWidth
              value={newShelter.evacueeCapacity}
              onChange={(e) => setNewShelter({ ...newShelter, evacueeCapacity: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Latitude (optional)"
              fullWidth
              value={newShelter.location.latitude}
              onChange={(e) =>
                setNewShelter({ ...newShelter, location: { ...newShelter.location, latitude: e.target.value } })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="Longitude (optional)"
              fullWidth
              value={newShelter.location.longitude}
              onChange={(e) =>
                setNewShelter({ ...newShelter, location: { ...newShelter.location, longitude: e.target.value } })
              }
              sx={{ mb: 2 }}
            />
             <Typography variant="subtitle1">Accommodations (optional):</Typography>
            {newShelter.accommodations.map((acc, index) => (
              <TextField
                key={index}
                label={`Accommodation ${index + 1}`}
                fullWidth
                value={acc}
                onChange={(e) => updateAccommodation(index, e.target.value)}
                sx={{ mb: 2 }}
              />
            ))}
            <IconButton onClick={addAccommodation} sx={{ mb: 2 }}>
              <AddIcon />
            </IconButton>
            <Typography variant="subtitle1">Supplies Needed (optional):</Typography>
            {newShelter.suppliesNeeded.map((supply, index) => (
             <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}>
             <TextField
               label={`Item ${index + 1}`}
               fullWidth
               value={supply.item}
               onChange={(e) => updateSupply(index, "item", e.target.value)}
             />
             <TextField
               label="Received"
               fullWidth
               value={supply.received}
               onChange={(e) => updateSupply(index, "received", e.target.value)}
             />
             <TextField
               label="Needed"
               fullWidth
               value={supply.needed}
               onChange={(e) => updateSupply(index, "needed", e.target.value)}
             />
           </Box>
            ))}
            <IconButton onClick={addSupply} sx={{ mb: 2 }}>
              <AddIcon />
            </IconButton>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">Cancel</Button>
            <Button onClick={handleAddShelter} variant="contained" color="primary">Add</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}