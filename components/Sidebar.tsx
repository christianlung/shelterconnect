import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MapIcon from '@mui/icons-material/Map';
import PaidIcon from '@mui/icons-material/Paid';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link'; // Import Link for Next.js routing

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
    const handleListItemClick = (event: React.MouseEvent) => {
        onClose();
    }

    const list = (
        <List>
            <ListItem disablePadding>
                <Link href="/" passHref legacyBehavior>
                    <ListItemButton component="a" onClick={handleListItemClick}>
                        <ListItemIcon>
                            <MapIcon />
                        </ListItemIcon>
                        <ListItemText primary="Map" />
                    </ListItemButton>
                </Link>
            </ListItem>
            <ListItem disablePadding>
                <Link href="/donate" passHref legacyBehavior>
                    <ListItemButton component="a" onClick={handleListItemClick}>
                        <ListItemIcon>
                            <PaidIcon />
                        </ListItemIcon>
                        <ListItemText primary="Donate" />
                    </ListItemButton>
                </Link>
            </ListItem>
            <ListItem disablePadding>
                <Link href="/about" passHref legacyBehavior>
                    <ListItemButton component="a" onClick={handleListItemClick}>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItemButton>
                </Link>
            </ListItem>
        </List>
    );

    return (
        <Drawer open={open} onClose={onClose}>
            {list}
        </Drawer>
    );
};
