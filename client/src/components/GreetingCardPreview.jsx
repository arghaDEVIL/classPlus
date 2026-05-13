import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

export default function GreetingCardPreview({ template, user }) {
    return (
        <div id="greeting-card" className="relative w-full aspect-[2/3] overflow-hidden rounded-2xl">
            {/* Background image */}
            <img
                src={template.imageUrl}
                className="absolute inset-0 w-full h-full object-cover"
                crossOrigin="anonymous"
                alt={template.title}
            />

            {/* Top gradient overlay */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />

            {/* Name banner */}
            <div className="absolute top-3 left-0 right-0 flex justify-center">
                <span className="font-display text-white text-base font-semibold px-4 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                    {user?.name}
                </span>
            </div>

            {/* Avatar */}
            <Avatar className="absolute top-2 left-3 w-14 h-14 ring-3 ring-teal-400 ring-offset-1">
                <AvatarImage src={user?.profilePicUrl} crossOrigin="anonymous" />
                <AvatarFallback className="bg-teal-600 text-white">{user?.name?.[0]}</AvatarFallback>
            </Avatar>
        </div>
    );
}
