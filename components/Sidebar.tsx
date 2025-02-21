import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MapIcon from '@mui/icons-material/Map';
import PaidIcon from '@mui/icons-material/Paid';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import Link from 'next/link'; // Import Link for Next.js routing
import { Roles } from "@/types/global";
import { useSession } from '@clerk/nextjs';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const menuItems = [
    { text: 'Map', href: '/', icon: <MapIcon />, role: null },
    { text: 'Donate', href: '/donate', icon: <PaidIcon />, role: null },
    { text: 'Admin', href: '/admin', icon: <HomeIcon />, role: 'coordinator' as Roles },
    { text: 'Volunteer', href: '/volunteer', icon: <PeopleIcon />, role: 'volunteer' as Roles }
]

export default function Sidebar({ open, onClose }: SidebarProps) {
    const { session } = useSession();
    const userRole = session?.user?.unsafeMetadata?.role as Roles | undefined;

    return (
        <Drawer open={open} onClose={onClose}>
            <List>
                {menuItems
                    .filter(item => 
                        item.role === null || // Show items with no role requirement
                        (item.role === 'coordinator' && userRole === 'coordinator') || // Show admin to coordinators
                        (item.role === 'volunteer' && userRole === 'volunteer') // Show volunteer to volunteers
                    )
                    .map(({ text, href, icon }) => (
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
