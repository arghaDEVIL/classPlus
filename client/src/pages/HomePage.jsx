import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { ScrollArea } from '../components/ui/scroll-area';
import { Skeleton } from '../components/ui/skeleton';
import CategoryFilter from '../components/CategoryFilter';
import TemplateCard from '../components/TemplateCard';
import PersonalizationSheet from '../components/PersonalizationSheet';
import PremiumDialog from '../components/PremiumDialog';
import BottomNav from '../components/BottomNav';

export default function HomePage() {
    const { dbUser, refreshDbUser } = useAuth();
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All');
    const [templates, setTemplates] = useState([]);
    const [trendingTemplates, setTrendingTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [premiumTemplate, setPremiumTemplate] = useState(null);

    useEffect(() => {
        fetchTrending();
        fetchTemplates();
    }, []);

    useEffect(() => {
        fetchTemplates();
    }, [activeCategory]);

    const fetchTrending = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/templates/trending`);
            setTrendingTemplates(res.data);
        } catch (error) {
            console.error('Failed to fetch trending:', error);
        }
    };

    const fetchTemplates = async () => {
        try {
            setLoading(true);
            const params = activeCategory !== 'All' ? { category: activeCategory } : {};
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/templates`, { params });
            setTemplates(res.data.templates);
        } catch (error) {
            console.error('Failed to fetch templates:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (template) => {
        setSelectedTemplate(template);
    };

    const handlePremiumClick = (template) => {
        if (dbUser?.isPremium) {
            setSelectedTemplate(template);
        } else {
            setPremiumTemplate(template);
        }
    };

    return (
        <div className="max-w-[430px] mx-auto min-h-screen bg-background pb-20 relative">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
                <h1 className="font-display text-xl font-bold bg-brand-gradient bg-clip-text text-transparent">
                    GreetFlow
                </h1>
                <Avatar
                    className="w-8 h-8 ring-2 ring-teal-400 cursor-pointer"
                    onClick={() => navigate('/profile')}
                >
                    <AvatarImage src={dbUser?.profilePicUrl} />
                    <AvatarFallback>{dbUser?.name?.[0]}</AvatarFallback>
                </Avatar>
            </header>

            {/* Category Filter */}
            <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

            {/* Trending Section */}
            <section className="px-4 mb-4">
                <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                    🔥 <span>Trending for Today</span>
                </h2>
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex gap-3 pb-2">
                        {trendingTemplates.map((t) => (
                            <TemplateCard
                                key={t._id}
                                template={t}
                                compact
                                onSelect={handleSelect}
                                onPremiumClick={handlePremiumClick}
                            />
                        ))}
                    </div>
                </ScrollArea>
            </section>

            {/* Main Grid */}
            <section className="px-4">
                <div className="grid grid-cols-2 gap-3">
                    {loading
                        ? Array(8)
                            .fill(0)
                            .map((_, i) => <Skeleton key={i} className="h-64 rounded-2xl" />)
                        : templates.map((t) => (
                            <TemplateCard
                                key={t._id}
                                template={t}
                                onSelect={handleSelect}
                                onPremiumClick={handlePremiumClick}
                            />
                        ))}
                </div>
            </section>

            {/* Personalization Sheet */}
            <PersonalizationSheet
                template={selectedTemplate}
                open={!!selectedTemplate}
                onOpenChange={(open) => !open && setSelectedTemplate(null)}
                dbUser={dbUser}
            />

            {/* Premium Dialog */}
            <PremiumDialog
                open={!!premiumTemplate}
                onOpenChange={(open) => !open && setPremiumTemplate(null)}
                dbUser={dbUser}
                onUpgrade={refreshDbUser}
            />

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
