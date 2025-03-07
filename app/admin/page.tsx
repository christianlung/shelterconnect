"use client"
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import AdminList from '@/components/AdminList';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { Shelter } from '@prisma/client';
import { useShelters } from "@/lib/hooks/useShelters";

// interface Address {
//   street: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
// }

// interface Coordinate {
//   latitude: number;
//   longitude: number;
// }

interface Supply {
  item: string;
  received: number;
  needed: number;
}

// interface Shelter {
//   id: string;
//   name: string;
//   location?: Coordinate;
//   address: Address;
//   picture?: string;
//   volunteerCapacity?: number;
//   evacueeCapacity?: number;
//   accommodations?: string[];
//   suppliesNeeded?: Supply[];
//   createdAt: Date;
//   updatedAt: Date;
// }

interface NewShelterForm {
  name: string;
  location: { latitude: string; longitude: string };
  address: { street: string; city: string; state: string; zipCode: string; country: string };
  picture: string;
  volunteerCapacity: string;
  evacueeCapacity: string;
  accommodations: string[];
  suppliesNeeded: { item: string; received: string; needed: string }[];
}

export default function Page() {
  const { shelters: fetchedShelters, loading, error } = useShelters();
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (fetchedShelters) {
      setShelters(fetchedShelters);
    }
  }, [fetchedShelters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // const [shelters, setShelters] = useState<Shelter[]>([
  //   {
  //     id: uuidv4(),
  //     name: "Shelter A",
  //     location: { latitude: 34.0000, longitude: -118.0000 },
  //     address: { street: "123 Main St", city: "Springfield", state: "CA", zipCode: "12345", country: "USA" },
  //     picture: "",
  //     volunteerCapacity: 50,
  //     evacueeCapacity: 200,
  //     accommodations: ["wheelchair_accessible"],
  //     suppliesNeeded: [{ item: "blankets", received: 5, needed: 10 }],
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // ]);

  // const [editingShelterId, setEditingShelterId] = useState<string | null>(null);
  // const [newShelter, setNewShelter] = useState<NewShelterForm>({
  //   name: "",
  //   location: { latitude: "", longitude: "" },
  //   address: { street: "", city: "", state: "", zipCode: "", country: "USA" },
  //   picture: "",
  //   volunteerCapacity: "",
  //   evacueeCapacity: "",
  //   accommodations: [],
  //   suppliesNeeded: [],
  // });


  // const handleOpen = (shelter?: Shelter) => {
  //   if (shelter) {
  //     setEditingShelterId(shelter.id);
  //     setNewShelter({
  //       name: shelter.name,
  //       location: {
  //         latitude: shelter.location ? String(shelter.location.latitude) : "",
  //         longitude: shelter.location ? String(shelter.location.longitude) : "",
  //       },
  //       address: {
  //         street: shelter.address.street,
  //         city: shelter.address.city,
  //         state: shelter.address.state,
  //         zipCode: shelter.address.zipCode,
  //         country: shelter.address.country || "USA",
  //       },
  //       picture: shelter.picture ?? "",
  //       volunteerCapacity: shelter.volunteerCapacity ? String(shelter.volunteerCapacity) : "",
  //       evacueeCapacity: shelter.evacueeCapacity ? String(shelter.evacueeCapacity) : "",
  //       accommodations: shelter.accommodations ?? [],
  //       suppliesNeeded: shelter.suppliesNeeded
  //         ? shelter.suppliesNeeded.map(supply => ({
  //           item: supply.item,
  //           received: String(supply.received),
  //           needed: String(supply.needed),
  //         }))
  //         : [],
  //     });
  //   } else {
  //     setEditingShelterId(null);
  //     setNewShelter({
  //       name: "",
  //       location: { latitude: "", longitude: "" },
  //       address: { street: "", city: "", state: "", zipCode: "", country: "USA" },
  //       picture: "",
  //       volunteerCapacity: "",
  //       evacueeCapacity: "",
  //       accommodations: [],
  //       suppliesNeeded: [],
  //     });
  //   }
  //   setOpen(true);
  // };

  // const handleAddOrUpdateShelter = () => {
  //   if (!newShelter.name.trim() || !newShelter.address.street.trim()) return;
  
  //   // If editing, try to retrieve the original createdAt value
  //   const existingShelter = editingShelterId ? shelters.find(s => s.id === editingShelterId) : undefined;
  
  //   const formattedShelter: Shelter = {
  //     id: editingShelterId ?? uuidv4(),
  //     name: newShelter.name,
  //     location: (newShelter.location.latitude && newShelter.location.longitude)
  //       ? {
  //           latitude: Number(newShelter.location.latitude),
  //           longitude: Number(newShelter.location.longitude),
  //         }
  //       : undefined,
  //     address: {
  //       street: newShelter.address.street,
  //       city: newShelter.address.city,
  //       state: newShelter.address.state,
  //       zipCode: newShelter.address.zipCode,
  //       country: newShelter.address.country,
  //     },
  //     picture: newShelter.picture || undefined,
  //     volunteerCapacity: newShelter.volunteerCapacity ? Number(newShelter.volunteerCapacity) : undefined,
  //     evacueeCapacity: newShelter.evacueeCapacity ? Number(newShelter.evacueeCapacity) : undefined,
  //     accommodations: newShelter.accommodations,
  //     suppliesNeeded: newShelter.suppliesNeeded.map(supply => ({
  //       item: supply.item,
  //       received: Number(supply.received),
  //       needed: Number(supply.needed),
  //     })),
  //     createdAt: existingShelter ? existingShelter.createdAt : new Date(),
  //     updatedAt: new Date(),
  //   };
  
  //   if (editingShelterId) {
  //     // Editing an existing shelter
  //     setShelters(shelters.map(s => (s.id === editingShelterId ? formattedShelter : s)));
  //   } else {
  //     // Adding a new shelter
  //     setShelters([...shelters, formattedShelter]);
  //   }
  
  //   handleClose();
  // };  

  // const handleClose = () => {
  //   setOpen(false);
  //   setNewShelter({
  //     name: "",
  //     location: { latitude: "", longitude: "" },
  //     address: { street: "", city: "", state: "", zipCode: "", country: "" },
  //     picture: "",
  //     volunteerCapacity: "",
  //     evacueeCapacity: "",
  //     accommodations: [],
  //     suppliesNeeded: [],
  //   });
  // };

  // const handleDeleteShelter = (id: string) => {
  //   setShelters(shelters.filter((shelter) => shelter.id !== id));
  // };

  // const addAccommodation = () => {
  //   setNewShelter({
  //     ...newShelter,
  //     accommodations: [...newShelter.accommodations, ""],
  //   });
  // };

  // const updateAccommodation = (index: number, value: string) => {
  //   const updated = [...newShelter.accommodations];
  //   updated[index] = value;
  //   setNewShelter({ ...newShelter, accommodations: updated });
  // };

  // const deleteAccommodation = (index: number) => {
  //   const updated = [...newShelter.accommodations];
  //   updated.splice(index, 1);
  //   setNewShelter({ ...newShelter, accommodations: updated });
  // };

  // const addSupply = () => {
  //   setNewShelter({
  //     ...newShelter,
  //     suppliesNeeded: [...newShelter.suppliesNeeded, { item: "", received: "", needed: "" }],
  //   });
  // };

  // const updateSupply = (index: number, field: "item" | "received" | "needed", value: string) => {
  //   const updated = [...newShelter.suppliesNeeded];
  //   updated[index] = { ...updated[index], [field]: value };
  //   setNewShelter({ ...newShelter, suppliesNeeded: updated });
  // };

  // const deleteSupply = (index: number) => {
  //   const updated = [...newShelter.suppliesNeeded];
  //   updated.splice(index, 1);
  //   setNewShelter({ ...newShelter, suppliesNeeded: updated });
  // };


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
        {/* <AdminList shelters={shelters} onDelete={handleDeleteShelter} onEdit={handleOpen} /> */}
        <AdminList shelters={shelters} /> 

        {/* <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
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
              value={newShelter.address.zipCode}
              onChange={(e) =>
                setNewShelter({ ...newShelter, address: { ...newShelter.address, zipCode: e.target.value } })
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
              <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
                <TextField
                  label={`Accommodation ${index + 1}`}
                  fullWidth
                  value={acc}
                  onChange={(e) => updateAccommodation(index, e.target.value)}
                />
                <IconButton onClick={() => deleteAccommodation(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <IconButton onClick={addAccommodation} sx={{ mb: 2 }}>
              <AddIcon />
            </IconButton>

            <Typography variant="subtitle1">Supplies Needed (optional):</Typography>
            {newShelter.suppliesNeeded.map((supply, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
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
                <IconButton onClick={() => deleteSupply(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <IconButton onClick={addSupply} sx={{ mb: 2 }}>
              <AddIcon />
            </IconButton>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">Cancel</Button>
            <Button onClick={handleAddOrUpdateShelter} variant="contained" color="primary">
              {editingShelterId ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog> */}
      </Box>
    </div>
  );
}