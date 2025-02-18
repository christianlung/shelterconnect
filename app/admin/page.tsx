import AdminList from '@/components/AdminList';
import { Box, Typography, Button } from '@mui/material';

export default function Page() {
  return (
    <div>
      <title>ShelterConnect | Admin</title>
      <Box sx={{ maxWidth: 600, margin: "auto", pt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", ml: 1.5 }}>
          My Shelters
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 1, mb: 2, ml: 2 }}>
          <Button variant="contained" color="primary" sx={{ textTransform: "none", borderRadius: "6px" }}>
            + New
          </Button>
        </Box>
        <AdminList />
      </Box>
    </div>
  );
}