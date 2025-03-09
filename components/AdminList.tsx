"use client";

import { useState } from "react";
import { Box, Card, CardContent, Typography, IconButton, Collapse, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Shelter } from '@prisma/client';

interface AdminListProps {
  shelters: Shelter[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (shelter: Shelter) => void;
}

export default function AdminList({ shelters, onDelete, onEdit } : AdminListProps) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const toggleExpand = (index: number) => setExpanded(expanded === index ? null : index);

  const formatAddress = (address: { street: string; city: string; state: string; zipCode: string; country: string }) =>
    `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {shelters.map((shelter, index) => (
        <Card key={shelter.id} sx={{ p: 2, cursor: "pointer" }} onClick={() => toggleExpand(index)}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h6">{shelter.name}</Typography>
              <Typography sx={{ color: "gray" }}>{formatAddress(shelter.address)}</Typography>
            </Box>
            <Box>
              <IconButton onClick={(e) => { e.stopPropagation(); onEdit(shelter); }}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={(e) => { e.stopPropagation(); onDelete(shelter.id); }}>
                <DeleteIcon color="error" />
              </IconButton>
              <IconButton onClick={(e) => { e.stopPropagation(); toggleExpand(index); }}>
                {expanded === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
          </Box>
          <Collapse in={expanded === index}>
            <CardContent sx={{ bgcolor: "#e0f2fe", borderRadius: "10px", mt: 2 }}>
              {shelter.volunteerCapacity && shelter.evacueeCapacity && (
                <div>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                    Capacity:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {shelter.volunteerCapacity} volunteers, {shelter.evacueeCapacity} evacuees
                  </Typography>
                </div>

              )}
              {shelter.accommodations && shelter.accommodations.length > 0 && (
                <div>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}> Accommodations:</Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                    {shelter.accommodations.map((acc, idx) => (
                      <Chip key={idx} label={`#${acc}`} sx={{ bgcolor: "#b3e5fc", color: "#01579b" }} />
                    ))}
                  </Box>
                </div>
              )}
              {shelter.suppliesNeeded && shelter.suppliesNeeded.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
                    Supplies Needed:
                  </Typography>
                  {shelter.suppliesNeeded.map((supply, idx) => {
                    const progress = (supply.received / supply.needed) * 100;

                    return (
                      <Box key={idx} sx={{ mb: 1 }}>
                        <Typography variant="body2">
                          {supply.item}: {supply.received} / {supply.needed}
                        </Typography>
                        <Box
                          sx={{
                            width: "100%",
                            height: 10,
                            borderRadius: 5,
                            bgcolor: "#e0e0e0",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              width: `${progress}%`,
                              height: "100%",
                              bgcolor: progress >= 100 ? "green" : "#2196f3",
                            }}
                          />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </CardContent>
          </Collapse>
          <Box
            sx={{
              bgcolor: "#f5f5f5",
              p: 1,
              borderRadius: 1,
              mt: 1,
              textAlign: "right",
            }}
          >
            <Typography variant="caption" sx={{ color: "gray" }}>
              {shelter.updatedAt &&
                shelter.updatedAt.getTime() !== shelter.createdAt.getTime()
                ? `Updated on: ${new Date(shelter.updatedAt).toLocaleDateString()} ${new Date(shelter.updatedAt).toLocaleTimeString()}`
                : `Created on: ${new Date(shelter.createdAt).toLocaleDateString()} ${new Date(shelter.createdAt).toLocaleTimeString()}`}
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
