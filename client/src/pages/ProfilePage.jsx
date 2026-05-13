import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import BottomNav from '../components/BottomNav';

export default function ProfilePage() {
    const { dbUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="max-w-[430px] mx-auto min-h-screen bg-background pb-20">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => navigate('/home')}>
                    <ArrowLeft size={20} />
                </Button>
                <h1 className="font-display text-xl font-bold">Profile</h1>
            </header>

            {/* Profile Card */}
            <Card className="mx-4 mt-6 bg-card border-border">
                <CardContent className="pt-6">
                    {/* Avatar & Info */}
                    <div className="flex flex-col items-center text-center mb-6">
                        <Avatar className="w-24 h-24 ring-4 ring-teal-400 mb-3">
                            <AvatarImage src={dbUser?.profilePicUrl} />
                            <AvatarFallback className="bg-teal-600 text-white text-2xl">
                                {dbUser?.name?.[0]}
                            </AvatarFallback>
                        </Avatar>
                        <h2 className="font-display text-xl font-semibold">{dbUser?.name}</h2>
                        <p className="text-muted-foreground text-sm mb-3">{dbUser?.email}</p>
                        {dbUser?.isPremium ? (
                            <Badge className="bg-amber-400 text-slate-900 font-semibold">Premium ✦</Badge>
                        ) : (
                            <Badge variant="outline" className="text-muted-foreground">
                                Free Plan
                            </Badge>
                        )}
                    </div>

                    <Separator className="my-4" />

                    {/* Menu Items */}
                    <div className="space-y-2">
                        <div className="px-4 py-3 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                            <p className="font-medium">My Account</p>
                            <p className="text-xs text-muted-foreground">Manage your account settings</p>
                        </div>
                        <div className="px-4 py-3 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                            <p className="font-medium">Help & Support</p>
                            <p className="text-xs text-muted-foreground">Get help or contact us</p>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Logout Button */}
                    <Button
                        variant="destructive"
                        className="w-full"
                        size="lg"
                        onClick={handleLogout}
                    >
                        Log Out
                    </Button>
                </CardContent>
            </Card>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
