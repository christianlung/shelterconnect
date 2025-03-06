"use client"

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import AdminList from '@/components/AdminList';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton } from '@mui/material';

interface Volunteer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  skills: string;
}

export default function VolunteerSignUpPage() {
  const [volunteer, setVolunteer] = useState<Volunteer>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    skills: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVolunteer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Replace with actual API call or further processing
    console.log("Volunteer Info:", volunteer);
    alert("Thank you for signing up as a volunteer!");
    //Reset the form after submission
    setVolunteer({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      skills: "",
    });
  };

  return (
    <div>
      <title>ShelterConnect | Volunteer Sign Up</title>
      <Box sx={{ maxWidth: 600, margin: "auto", pt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", ml: 1.5 }}>
          Volunteer Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            value={volunteer.firstName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            value={volunteer.lastName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={volunteer.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone"
            name="phone"
            type="tel"
            fullWidth
            value={volunteer.phone}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Skills / Interests"
            name="skills"
            fullWidth
            value={volunteer.skills}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", borderRadius: "6px" }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
