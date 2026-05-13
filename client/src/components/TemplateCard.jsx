import { Lock } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useAuth } from '../context/AuthContext';
import { getCardDesign } from './GreetingCardDesign';

export default function TemplateCard({ template, onSelect, onPremiumClick, compact }) {
    const { dbUser } = useAuth();
    const cardDesign = getCardDesign(template.category);

    const handleClick = () => {
        if (template.isFree) {
            onSelect(template);
        } else {
            onPremiumClick(template);
        }
    };

    return (
        <Card
            className={`overflow-hidden rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform duration-200 ${compact ? 'w-36 h-52 flex-shrink-0' : 'w-full h-64'
                } ${cardDesign.border}`}
            onClick={handleClick}
        >
            <div className="relative w-full h-full">
                {/* Background image */}
                <img
                    src={template.imageUrl}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    crossOrigin="anonymous"
                    alt={template.title}
                />

                {/* Category-specific overlay */}
                <div className={`absolute inset-0 z-[5] ${cardDesign.overlay}`} />

                {/* Top gradient overlay */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 to-transparent z-10" />

                {/* User name banner (top-center) */}
                <div className="absolute top-2 left-0 right-0 flex justify-center z-20">
                    <span className="font-display text-white text-sm font-semibold tracking-wide px-3 py-0.5 rounded-full bg-black/50 backdrop-blur-sm">
                        {dbUser?.name || 'Your Name'}
                    </span>
                </div>

                {/* User avatar (top-left) */}
                <Avatar className="absolute top-1 left-2 w-10 h-10 ring-2 ring-teal-400 z-20">
                    <AvatarImage src={dbUser?.profilePicUrl} crossOrigin="anonymous" />
                    <AvatarFallback className="bg-teal-600 text-white text-xs">
                        {dbUser?.name?.[0] || 'G'}
                    </AvatarFallback>
                </Avatar>

                {/* Category-specific text area */}
                {!compact && <div className="z-[15]">{cardDesign.textArea}</div>}

                {/* Badge (bottom-right) */}
                <div className="absolute bottom-2 right-2 z-20">
                    {template.isFree ? (
                        <Badge className="bg-teal-600 text-white text-[10px] px-1.5">FREE</Badge>
                    ) : (
                        <Badge className="bg-amber-400 text-slate-900 text-[10px] px-1.5 flex items-center gap-1">
                            <Lock size={8} /> PREMIUM
                        </Badge>
                    )}
                </div>
            </div>
        </Card>
    );
}
