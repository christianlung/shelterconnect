"use client";

import { useState } from "react";
import { Box, Card, CardContent, Typography, IconButton, Collapse, List, ListItem, LinearProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Sample data
const shelters = [
    {
        name: "Shelter A",
        address: "123 Main St, Springfield",
        categories: [
            { category: "Food", received: 5, needed: 10 },
            { category: "Water", received: 8, needed: 15 },
            { category: "Clothing", received: 12, needed: 20 },
            { category: "Medical Supplies", received: 4, needed: 10 }
        ]
    },
    {
        name: "Shelter B",
        address: "456 Oak Rd, Riverside",
        categories: [
            { category: "Food", received: 3, needed: 10 },
            { category: "Water", received: 10, needed: 15 },
            { category: "Clothing", received: 5, needed: 10 },
            { category: "Blankets", received: 2, needed: 8 }
        ]
    }
];

export default function ShelterList() {
    const [expanded, setExpanded] = useState<number | null>(null);

    const handleExpand = (index: number) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <Box sx={{ maxWidth: 600, margin: "auto", display: "flex", flexDirection: "column", gap: 2, px: 1.5}}>
            {shelters.map((shelter, index) => (
                <Card 
                    key={index} 
                    sx={{ position: "relative", p: 2, cursor: "pointer" }} 
                    onClick={() => handleExpand(index)}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {/* Shelter Name & Address */}
                        <Box>
                            <Typography variant="h6">{shelter.name}</Typography>
                            <Typography sx={{ color: "gray" }}>{shelter.address}</Typography>
                        </Box>

                        {/* Action Buttons (Prevent Click from Expanding) */}
                        <Box>
                            <IconButton 
                                onClick={(e) => { e.stopPropagation(); console.log("Edit", shelter); }}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton 
                                onClick={(e) => { e.stopPropagation(); console.log("Delete", shelter); }} 
                                color="error"
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton 
                                onClick={(e) => { e.stopPropagation(); handleExpand(index); }}
                            >
                                {expanded === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Expandable Section */}
                    <Collapse in={expanded === index}>
                        <CardContent sx={{ bgcolor: "#e0f2fe", borderRadius: "10px", m: 1, mt: 3 }}>
                            {/* Category List */}
                            <List>
                                {shelter.categories.map((item, idx) => {
                                    const progress = (item.received / item.needed) * 100;

                                    return (
                                        <ListItem key={idx} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
                                            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", mb: 1 }}>
                                                <Typography>{item.category}</Typography>
                                                <Typography sx={{ color: "gray" }}>
                                                    {item.received} / {item.needed}
                                                </Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={progress}
                                                sx={{ width: "100%", height: 10, borderRadius: 5, bgcolor: "#e0e0e0" }}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </CardContent>
                    </Collapse>
                </Card>
            ))}
        </Box>
    );
}
