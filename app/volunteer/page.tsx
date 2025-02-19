"use client";

import { useState } from "react";
import { Box, Card, CardContent, Typography, IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface Shelter {
  id: string;
  name: string;
  address: Address;
}

interface TimeSlot {
  start: string;
  end: string;
}

type SignupStatus = "pending" | "confirmed" | "cancelled";

interface VolunteerSignup {
  id: string;
  shelter: Shelter;
  timeSlot: TimeSlot;
  status: SignupStatus;
}

export default function Page() {
  const [signups] = useState<VolunteerSignup[]>([
    {
      id: "1",
      shelter: {
        id: "shelter1",
        name: "Shelter A",
        address: { street: "123 Main St", city: "Springfield", state: "CA", zip: "12345" },
      },
      timeSlot: { start: "2023-03-25T09:00:00", end: "2023-03-25T12:00:00" },
      status: "pending",
    },
    {
      id: "2",
      shelter: {
        id: "shelter2",
        name: "Shelter B",
        address: { street: "456 Oak Rd", city: "Springfield", state: "CA", zip: "12345" },
      },
      timeSlot: { start: "2023-03-26T09:00:00", end: "2023-03-26T12:00:00" },
      status: "cancelled",
    },
    {
      id: "3",
      shelter: {
        id: "shelter3",
        name: "Shelter C",
        address: { street: "789 Pine St", city: "Springfield", state: "CA", zip: "12345" },
      },
      timeSlot: { start: "2023-03-27T09:00:00", end: "2023-03-27T12:00:00" },
      status: "confirmed",
    },
  ]);

  const confirmedSignups = signups.filter((signup) => signup.status === "confirmed");
  const pendingSignups = signups.filter((signup) => signup.status === "pending");

  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const formatTimeSlot = (timeSlot: TimeSlot) => {
    const start = new Date(timeSlot.start).toLocaleString();
    const end = new Date(timeSlot.end).toLocaleString();
    return `${start} - ${end}`;
  };

  const renderSignups = (signups: VolunteerSignup[], labelColor: string) => (
    signups.map((signup) => (
      <Card key={signup.id} sx={{ p: 2, cursor: "pointer", mb: 2 }} onClick={() => toggleExpand(signup.id)}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h6">{signup.shelter.name}</Typography>
            <Typography sx={{ color: "gray" }}>
              {signup.shelter.address.street}, {signup.shelter.address.city}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: labelColor }}>
              {signup.status.toUpperCase()}
            </Typography>
            <IconButton onClick={(e) => { e.stopPropagation(); toggleExpand(signup.id); }}>
              {expanded === signup.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        </Box>
        <Collapse in={expanded === signup.id}>
          <CardContent sx={{ bgcolor: "#e0f2fe", borderRadius: "10px", mt: 2 }}>
            <Typography variant="body2">
              Time Slot: {formatTimeSlot(signup.timeSlot)}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    ))
  );

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", pt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", margin: 2 }}>
        My Signups
      </Typography>
      {renderSignups(confirmedSignups, "green")}
      {renderSignups(pendingSignups, "orange")}
    </Box>
  );
}
