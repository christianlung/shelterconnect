import { memo } from 'react';
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
import { Roles } from '@/types/global';
import { useSession } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { text: 'Map', href: '/', icon: <MapIcon />, role: null },
  { text: 'Donate', href: '/donate', icon: <PaidIcon />, role: null },
  {
    text: 'Admin',
    href: '/admin',
    icon: <HomeIcon />,
    role: 'coordinator' as Roles,
  },
  {
    text: 'Volunteer',
    href: '/volunteer',
    icon: <PeopleIcon />,
    role: 'volunteer' as Roles,
  },
];

const Sidebar = memo(function Sidebar({ open, onClose }: SidebarProps) {
  const { session } = useSession();
  const userRole = session?.user?.unsafeMetadata?.role as Roles | undefined;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          backgroundColor: '#2563eb', // primary-500 color
          color: 'white',
        },
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-4 border-b border-white/10 p-6">
          <Image
            src="/favicon_white.png"
            alt="ShelterConnect Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <h2 className="text-xl font-bold text-white">Menu</h2>
        </div>

        <List className="flex-1 py-4">
          <AnimatePresence>
            {menuItems
              .filter(
                (item) =>
                  item.role === null || // Show items with no role requirement
                  (item.role === 'coordinator' && userRole === 'coordinator') || // Show admin to coordinators
                  (item.role === 'volunteer' && userRole === 'volunteer'), // Show volunteer to volunteers
              )
              .map(({ text, href, icon }, index) => (
                <motion.div
                  key={href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ListItem disablePadding>
                    <Link href={href} className="w-full">
                      <ListItemButton
                        onClick={onClose}
                        className="mx-2 rounded-lg transition-colors hover:bg-white/10"
                      >
                        <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                          {icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={text}
                          primaryTypographyProps={{
                            className: 'font-medium',
                          }}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                </motion.div>
              ))}
          </AnimatePresence>
        </List>

        <div className="border-t border-white/10 p-4 text-center text-sm text-white/60">
          © {new Date().getFullYear()} ShelterConnect
        </div>
      </div>
    </Drawer>
  );
});

export default Sidebar;
