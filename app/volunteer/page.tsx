"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useVolunteerDashboard } from "@/lib/hooks/useVolunteerSignup";
import { TimeSlot } from "@prisma/client";
import { VolunteerSignupWithShelter } from "@/types/shelter";

export default function VolunteerDashboard() {
  const { data: signups, loading, error } = useVolunteerDashboard();
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggleExpand = (id: string) => setExpanded(expanded === id ? null : id);

  const formatTimeSlot = (timeSlot: TimeSlot) => {
    const start = new Date(timeSlot.start);
    const end = new Date(timeSlot.end);

    const formatDate = (date: Date) => date.toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric" });
    const formatTime = (date: Date) => date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

    const isSameDay = start.toDateString() === end.toDateString();

    if (isSameDay) {
        return `${formatDate(start)}: ${formatTime(start)} - ${formatTime(end)}`;
    } else {
        return `${formatDate(start)} ${formatTime(start)} - ${formatDate(end)} ${formatTime(end)}`;
    }
};


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const now = new Date();

  const pastSignups = signups.filter(
    (signup) => new Date(signup.timeSlot.end) < now
  );

  const currentSignups = signups.filter(
    (signup) => new Date(signup.timeSlot.end) >= now
  );

  const renderSignups = (signups: VolunteerSignupWithShelter[], statusColor: string) =>
    signups.map((signup) => (
      <Card
        key={signup.id}
        sx={{ p: 2, cursor: "pointer", mb: 2, borderLeft: `6px solid ${statusColor}` }}
        onClick={() => toggleExpand(signup.id)}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h6">{signup.shelter.name}</Typography>
            <Typography sx={{ color: "gray" }}>
              {signup.shelter.address.street}, {signup.shelter.address.city}, {signup.shelter.address.state}, {signup.shelter.address.zipCode}, USA
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={(e) => { e.stopPropagation(); toggleExpand(signup.id); }}>
              {expanded === signup.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        </Box>
        <Collapse in={expanded === signup.id}>
          <CardContent sx={{ bgcolor: "#e0f2fe", borderRadius: "10px", mt: 2 }}>
            <Typography variant="body2">Time Slot: {formatTimeSlot(signup.timeSlot)}</Typography>
            {signup.tasks && signup.tasks.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                  Tasks:
                </Typography>
                {signup.tasks.map((task, idx) => (
                  <Typography key={idx} variant="body2" sx={{ ml: 2 }}>
                    • {task}
                  </Typography>
                ))}
              </Box>
            )}
          </CardContent>
        </Collapse>
      </Card>
    ));

  return (
    <div>
      <title>ShelterConnect | Volunteer</title>
      <Box sx={{ maxWidth: 600, margin: "auto", pt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          My Volunteer Signups
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "teal", mb: 1 }}>
            Upcoming Signups
          </Typography>
          {currentSignups.length > 0 ? (
            renderSignups(currentSignups, "teal")
          ) : (
            <Typography variant="body1">No upcoming signups</Typography>
          )}
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "darkgoldenrod", mb: 1 }}>
            Past Signups
          </Typography>
          {pastSignups.length > 0 ? (
            renderSignups(pastSignups, "darkgoldenrod")
          ) : (
            <Typography variant="body1">No past signups</Typography>
          )}
        </Box>
      </Box>
    </div>
  );
}
