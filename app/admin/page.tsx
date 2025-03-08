"use client"
import { useState } from "react";

import AdminList from '@/components/AdminList';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { Shelter } from '@prisma/client';
import { useShelters, useAddShelter, useDeleteShelter, useUpdateShelter } from "@/lib/hooks/useShelters";

import type { ActionResult } from '@/types/models';

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
  const { shelters, loading, error, refetch } = useShelters();
  const { handleAddShelter: addShelterAction, loading: addLoading } = useAddShelter();
  const { handleDelete } = useDeleteShelter();
  const { handleUpdateShelter, loading: updateLoading } = useUpdateShelter();

  const [open, setOpen] = useState(false);
  const [editingShelterId, setEditingShelterId] = useState<string | null>(null);
  const [newShelter, setNewShelter] = useState<NewShelterForm>({
    name: "",
    location: { latitude: "", longitude: "" },
    address: { street: "", city: "", state: "", zipCode: "", country: "USA" },
    picture: "",
    volunteerCapacity: "",
    evacueeCapacity: "",
    accommodations: [],
    suppliesNeeded: [],
  });

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  
  // Opens the modal. If a shelter is passed, we're editing; otherwise, we're adding a new one.
  const handleOpen = (shelter: Shelter) => {
    if (shelter) {
      setEditingShelterId(shelter.id);
      setNewShelter({
        name: shelter.name,
        location: {
          latitude: shelter.location ? String(shelter.location.latitude) : "",
          longitude: shelter.location ? String(shelter.location.longitude) : "",
        },
        address: {
          street: shelter.address.street,
          city: shelter.address.city,
          state: shelter.address.state,
          zipCode: shelter.address.zipCode,
          country: shelter.address.country || "USA",
        },
        picture: shelter.picture ?? "",
        volunteerCapacity: shelter.volunteerCapacity ? String(shelter.volunteerCapacity) : "",
        evacueeCapacity: shelter.evacueeCapacity ? String(shelter.evacueeCapacity) : "",
        accommodations: shelter.accommodations ?? [],
        suppliesNeeded: shelter.suppliesNeeded
          ? shelter.suppliesNeeded.map(supply => ({
            item: supply.item,
            received: String(supply.received),
            needed: String(supply.needed),
          }))
          : [],
      });
    } else {
      setEditingShelterId(null);
      setNewShelter({
        name: "",
        location: { latitude: "", longitude: "" },
        address: { street: "", city: "", state: "", zipCode: "", country: "USA" },
        picture: "",
        volunteerCapacity: "",
        evacueeCapacity: "",
        accommodations: [],
        suppliesNeeded: [],
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingShelterId(null);
    setNewShelter({
      name: "",
      location: { latitude: "", longitude: "" },
      address: { street: "", city: "", state: "", zipCode: "", country: "USA" },
      picture: "",
      volunteerCapacity: "",
      evacueeCapacity: "",
      accommodations: [],
      suppliesNeeded: [],
    });
  };

  // Called when the "Add" button is clicked
  // const handleAdd = async () => {
  //   // Validate required fields
  //   if (!newShelter.name.trim() || !newShelter.address.street.trim()) return;

  //   // Format the new shelter from the form values.
  //   const formattedShelter = {
  //     name: newShelter.name,
  //     location:
  //       newShelter.location.latitude && newShelter.location.longitude
  //         ? {
  //           latitude: parseFloat(newShelter.location.latitude),
  //           longitude: parseFloat(newShelter.location.longitude),
  //         }
  //         : null,
  //     address: {
  //       street: newShelter.address.street,
  //       city: newShelter.address.city,
  //       state: newShelter.address.state,
  //       zipCode: newShelter.address.zipCode,
  //       country: newShelter.address.country,
  //     },
  //     picture: newShelter.picture || null,
  //     volunteerCapacity: newShelter.volunteerCapacity
  //       ? parseInt(newShelter.volunteerCapacity, 10)
  //       : null,
  //     evacueeCapacity: newShelter.evacueeCapacity
  //       ? parseInt(newShelter.evacueeCapacity, 10)
  //       : null,
  //     accommodations: newShelter.accommodations,
  //     suppliesNeeded: newShelter.suppliesNeeded.map((supply) => ({
  //       item: supply.item,
  //       received: parseInt(supply.received, 10),
  //       needed: parseInt(supply.needed, 10),
  //     })),
  //   };

  //   const result = await addShelterAction(formattedShelter) as ActionResult<Shelter>;
  //   if (result.success && result.data) {
  //     await refetch();
  //   }
  //   handleClose();
  // };

  const handleAddOrUpdateShelter = async () => {
    if (!newShelter.name.trim() || !newShelter.address.street.trim()) return;

    const formattedShelter = {
      name: newShelter.name,
      location: (newShelter.location.latitude && newShelter.location.longitude)
        ? {
          latitude: parseFloat(newShelter.location.latitude),
          longitude: parseFloat(newShelter.location.longitude),
        }
        : null,
      address: {
        street: newShelter.address.street,
        city: newShelter.address.city,
        state: newShelter.address.state,
        zipCode: newShelter.address.zipCode,
        country: newShelter.address.country,
      },
      picture: newShelter.picture || null,
      volunteerCapacity: newShelter.volunteerCapacity ? parseInt(newShelter.volunteerCapacity) : null,
      evacueeCapacity: newShelter.evacueeCapacity ? parseInt(newShelter.evacueeCapacity) : null,
      accommodations: newShelter.accommodations,
      suppliesNeeded: newShelter.suppliesNeeded.map(supply => ({
        item: supply.item,
        received: Number(supply.received),
        needed: Number(supply.needed),
      })),
    };

    if (editingShelterId) {
      const result = await handleUpdateShelter(editingShelterId, formattedShelter) as ActionResult<Shelter>;
      if (result.success && result.data) {
        await refetch();
      }
    } else {
      const result = await addShelterAction(formattedShelter) as ActionResult<Shelter>;
      if (result.success && result.data) {
        await refetch();
      }
    }
    handleClose();
  };

  const handleDeleteShelter = async (id: string) => {
    await handleDelete(id);
    await refetch();
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

  const deleteAccommodation = (index: number) => {
    const updated = [...newShelter.accommodations];
    updated.splice(index, 1);
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

  const deleteSupply = (index: number) => {
    const updated = [...newShelter.suppliesNeeded];
    updated.splice(index, 1);
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
        <AdminList shelters={shelters} onDelete={handleDeleteShelter} onEdit={handleOpen} />

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
            <Button onClick={handleAddOrUpdateShelter} variant="contained" color="primary" disabled={addLoading || updateLoading}>
              {editingShelterId ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}