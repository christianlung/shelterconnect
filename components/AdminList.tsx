import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemText, LinearProgress } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

export default function ShelterAccordion() {
    return (
        <Box sx={{ maxWidth: 600, margin: "auto" }}>
            {shelters.map((shelter, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {/* Flex container to align name and address vertically */}
                        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                            <Typography variant="h6">{shelter.name}</Typography>
                            <Typography sx={{ ml: 2, color: "gray", whiteSpace: "nowrap" }}>
                                {shelter.address}
                            </Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {shelter.categories.map((item, idx) => {
                                const progress = (item.received / item.needed) * 100; // Calculate progress percentage

                                return (
                                    <ListItem
                                        key={idx}
                                        sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
                                    >
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
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}
