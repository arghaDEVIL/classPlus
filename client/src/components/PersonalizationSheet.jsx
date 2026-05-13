import { useState } from 'react';
import { Share2, Loader2 } from 'lucide-react';
import { Sheet, SheetContent } from './ui/sheet';
import { Button } from './ui/button';
import GreetingCardPreview from './GreetingCardPreview';
import { shareGreetingCard } from '../utils/imageComposer';
import { useToast } from '../hooks/use-toast';

export default function PersonalizationSheet({ template, open, onOpenChange, dbUser }) {
    const [sharing, setSharing] = useState(false);
    const { toast } = useToast();

    const handleShare = async () => {
        try {
            setSharing(true);
            const result = await shareGreetingCard('greeting-card', dbUser.name);
            toast({
                title: result === 'shared' ? 'Shared! 🎉' : 'Downloaded!',
                description:
                    result === 'shared'
                        ? 'Your greeting has been shared successfully'
                        : 'Your greeting has been downloaded to your device',
            });
            onOpenChange(false);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to share greeting. Please try again.',
            });
        } finally {
            setSharing(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="bottom" className="h-[90vh] bg-card rounded-t-3xl p-0 overflow-y-auto">
                <div className="px-4 pt-4 pb-6">
                    {/* Drag handle */}
                    <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />

                    {/* Title */}
                    <h3 className="font-display text-lg font-semibold text-center mb-4">
                        {template?.title}
                    </h3>

                    {/* Greeting card preview */}
                    {template && <GreetingCardPreview template={template} user={dbUser} />}

                    {/* Share button */}
                    <Button
                        className="w-full mt-5 bg-brand-gradient text-white font-semibold"
                        size="lg"
                        onClick={handleShare}
                        disabled={sharing}
                    >
                        {sharing ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Share2 className="mr-2 h-4 w-4" />
                        )}
                        {sharing ? 'Preparing...' : 'Share Greeting'}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
