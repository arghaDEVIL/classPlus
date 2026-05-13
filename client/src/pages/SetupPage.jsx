import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

export default function SetupPage() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.displayName || '');
    const [profilePicUrl, setProfilePicUrl] = useState(''); // Don't auto-fill from Google
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file size (max 2MB for base64)
        if (file.size > 2 * 1024 * 1024) {
            toast({
                variant: 'destructive',
                title: 'File too large',
                description: 'Please select an image smaller than 2MB',
            });
            return;
        }

        // Check file type
        if (!file.type.startsWith('image/')) {
            toast({
                variant: 'destructive',
                title: 'Invalid file',
                description: 'Please select an image file',
            });
            return;
        }

        try {
            setUploading(true);

            // Convert image to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setProfilePicUrl(base64String);
                toast({
                    title: 'Photo selected',
                    description: 'Your profile picture is ready',
                });
                setUploading(false);
            };
            reader.onerror = () => {
                toast({
                    variant: 'destructive',
                    title: 'Upload failed',
                    description: 'Failed to read the image file',
                });
                setUploading(false);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Upload error:', error);
            toast({
                variant: 'destructive',
                title: 'Upload failed',
                description: error.message,
            });
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!name.trim()) {
            toast({
                variant: 'destructive',
                title: 'Name required',
                description: 'Please enter your display name',
            });
            return;
        }

        if (!profilePicUrl) {
            toast({
                variant: 'destructive',
                title: 'Photo required',
                description: 'Please upload a profile picture',
            });
            return;
        }

        try {
            setSaving(true);
            await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, {
                uid: user.uid,
                name: name.trim(),
                email: user.email,
                profilePicUrl,
            });
            navigate('/home');
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Save failed',
                description: error.message,
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <Card className="max-w-[430px] w-full mx-6 bg-card border-border">
                <CardHeader>
                    <CardTitle className="font-display text-center">Set Up Your Profile</CardTitle>
                    <CardDescription className="text-center">
                        This appears on your greeting cards (Name and Photo required)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center">
                        <div
                            className="relative cursor-pointer group"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Avatar className="w-24 h-24 ring-4 ring-teal-400">
                                <AvatarImage src={profilePicUrl} />
                                <AvatarFallback className="bg-teal-600 text-white text-2xl">
                                    {name?.[0] || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileSelect}
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                            {uploading
                                ? 'Processing...'
                                : profilePicUrl
                                    ? '✓ Photo ready'
                                    : '⚠ Click to upload photo (required)'}
                        </p>
                    </div>

                    {/* Name Input */}
                    <div>
                        <Label htmlFor="name">Display Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={30}
                        />
                    </div>

                    {/* Save Button */}
                    <Button
                        className="w-full bg-brand-gradient text-white font-semibold"
                        size="lg"
                        onClick={handleSave}
                        disabled={saving || uploading}
                    >
                        {saving ? 'Saving...' : 'Save & Continue'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
