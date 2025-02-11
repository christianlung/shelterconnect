import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MapIcon from '@mui/icons-material/Map';
import PaidIcon from '@mui/icons-material/Paid';
import Link from 'next/link'; // Import Link for Next.js routing

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const menuItems = [
    { text: 'Map', href: '/', icon: <MapIcon /> },
    { text: 'Donate', href: '/donate', icon: <PaidIcon /> },
]

export default function Sidebar({ open, onClose }: SidebarProps) {
    return (
        <Drawer open={open} onClose={onClose}>
            <List>
                {menuItems.map(({ text, href, icon }) => (
                    <ListItem key={href} disablePadding>
                        <Link href={href} className="w-full">
                            <ListItemButton onClick={onClose}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};
