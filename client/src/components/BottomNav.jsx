import { Home, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Home', path: '/home' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card/90 backdrop-blur-md border-t border-border z-50">
            <div className="flex justify-around items-center h-16 px-4">
                {navItems.map(({ icon: Icon, label, path }) => {
                    const active = location.pathname === path;
                    return (
                        <button
                            key={path}
                            onClick={() => navigate(path)}
                            className={`flex flex-col items-center gap-1 ${active ? 'text-teal-400' : 'text-muted-foreground'
                                }`}
                        >
                            <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                            <span className="text-[10px] font-medium">{label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
