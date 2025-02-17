"use client";

import { useState } from "react";
import { Box, Card, CardContent, Typography, IconButton, Collapse, List, ListItem, LinearProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface Category {
  category: string;
  received: number;
  needed: number;
}

interface Shelter {
  name: string;
  address: string;
  categories: Category[];
}

interface AdminListProps {
  shelters: Shelter[];
  onDelete: (index: number) => void;
}


export default function ShelterList({ shelters, onDelete }: AdminListProps) {

  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (index: number) => setExpanded(expanded === index ? null : index);


  return (
    <Box sx={{ maxWidth: 600, margin: "auto", display: "flex", flexDirection: "column", gap: 2, px: 1.5 }}>
      {shelters.map((shelter, index) => (
        <Card
          key={index}
          sx={{ position: "relative", p: 2, cursor: "pointer" }}
          onClick={() => toggleExpand(index)}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h6">{shelter.name}</Typography>
              <Typography sx={{ color: "gray" }}>{shelter.address}</Typography>
            </Box>
            <Box>
              <IconButton
                onClick={(e) => { e.stopPropagation(); }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={(e) => { e.stopPropagation(); onDelete(index); }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={(e) => { e.stopPropagation(); toggleExpand(index); }}
              >
                {expanded === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
          </Box>

          <Collapse in={expanded === index}>
            <CardContent sx={{ bgcolor: "#e0f2fe", borderRadius: "10px", m: 1, mt: 3 }}>
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
