import { Lock } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useAuth } from '../context/AuthContext';

export default function TemplateCard({ template, onSelect, onPremiumClick, compact }) {
    const { dbUser } = useAuth();

    // Debug logging
    console.log('TemplateCard render:', {
        templateTitle: template?.title,
        userName: dbUser?.name,
        userPhoto: dbUser?.profilePicUrl,
        compact
    });

    const handleClick = () => {
        if (template.isFree) {
            onSelect(template);
        } else {
            onPremiumClick(template);
        }
    };

    return (
        <Card
            className={`overflow-hidden rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform duration-200 border-2 border-teal-500 ${compact ? 'w-36 h-52 flex-shrink-0' : 'w-full h-64'
                }`}
            onClick={handleClick}
        >
            <div className="relative w-full h-full bg-slate-900">
                {/* Background image */}
                <img
                    src={template.imageUrl}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    crossOrigin="anonymous"
                    alt={template.title}
                    onLoad={() => console.log('Image loaded:', template.title)}
                    onError={() => console.error('Image failed:', template.title)}
                />

                {/* Top gradient overlay */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none" />

                {/* User name banner (top-center) */}
                <div className="absolute top-2 left-0 right-0 flex justify-center z-20 pointer-events-none">
                    <span className="font-display text-white text-sm font-semibold tracking-wide px-3 py-0.5 rounded-full bg-black/70 backdrop-blur-sm shadow-lg">
                        {dbUser?.name || 'Your Name'}
                    </span>
                </div>

                {/* User avatar (top-left) */}
                <div className="absolute top-1 left-2 z-20 pointer-events-none">
                    <Avatar className="w-10 h-10 ring-2 ring-teal-400 shadow-lg">
                        <AvatarImage src={dbUser?.profilePicUrl} crossOrigin="anonymous" />
                        <AvatarFallback className="bg-teal-600 text-white text-xs font-bold">
                            {dbUser?.name?.[0]?.toUpperCase() || 'G'}
                        </AvatarFallback>
                    </Avatar>
                </div>

                {/* Badge (bottom-right) */}
                <div className="absolute bottom-2 right-2 z-20 pointer-events-none">
                    {template.isFree ? (
                        <Badge className="bg-teal-600 text-white text-[10px] px-2 py-0.5 font-bold shadow-lg">
                            FREE
                        </Badge>
                    ) : (
                        <Badge className="bg-amber-400 text-slate-900 text-[10px] px-2 py-0.5 flex items-center gap-1 font-bold shadow-lg">
                            <Lock size={8} /> PREMIUM
                        </Badge>
                    )}
                </div>

                {/* Debug overlay - remove this after testing */}
                <div className="absolute bottom-10 left-2 z-30 bg-red-500 text-white text-[8px] px-1 py-0.5 rounded pointer-events-none">
                    {template.title}
                </div>
            </div>
        </Card>
    );
}
