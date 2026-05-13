import { useState } from 'react';
import { Lock, CheckCircle2, Loader2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import axios from 'axios';
import { useToast } from '../hooks/use-toast';

export default function PremiumDialog({ open, onOpenChange, dbUser, onUpgrade }) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubscribe = async () => {
        try {
            setLoading(true);
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/users/${dbUser.uid}/premium`
            );
            await onUpgrade();
            toast({
                title: "You're Premium! ✦",
                description: 'All templates are now unlocked.',
            });
            onOpenChange(false);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to upgrade. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[380px] bg-card rounded-2xl text-center">
                {/* Lock icon */}
                <div className="flex justify-center mb-2 mt-2">
                    <div className="w-16 h-16 rounded-full bg-amber-400/10 flex items-center justify-center">
                        <Lock className="w-8 h-8 text-amber-400" />
                    </div>
                </div>

                <DialogTitle className="font-display text-2xl">Unlock Premium</DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm mb-4">
                    Get unlimited access to all greeting templates
                </DialogDescription>

                {/* Benefits */}
                {[
                    '500+ exclusive greeting templates',
                    'Download & share without watermark',
                    'New content added every week',
                ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3 text-sm text-left px-4 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                        <span>{benefit}</span>
                    </div>
                ))}

                {/* Price */}
                <div className="my-4">
                    <span className="font-display text-3xl font-bold text-amber-400">₹99</span>
                    <span className="text-muted-foreground text-sm"> / month</span>
                </div>

                {/* Subscribe button */}
                <Button
                    className="w-full bg-brand-gradient text-white font-semibold"
                    size="lg"
                    onClick={handleSubscribe}
                    disabled={loading}
                >
                    {loading ? <Loader2 className="animate-spin mr-2 w-4 h-4" /> : null}
                    Subscribe Now
                </Button>

                {/* Dismiss */}
                <Button
                    variant="ghost"
                    className="w-full mt-2 text-muted-foreground"
                    onClick={() => onOpenChange(false)}
                >
                    Maybe Later
                </Button>
            </DialogContent>
        </Dialog>
    );
}
