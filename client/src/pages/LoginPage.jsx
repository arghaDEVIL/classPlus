import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInAnonymously,
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Google users: auto-save with Google profile pic and go directly to home
            if (user.displayName && user.photoURL) {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    profilePicUrl: user.photoURL,
                });
                navigate('/home');
            } else {
                // Fallback: go to setup if Google data is incomplete
                navigate('/setup');
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Login failed',
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let result;
            if (isSignUp) {
                result = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                result = await signInWithEmailAndPassword(auth, email, password);
            }
            navigate('/setup');
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Authentication failed',
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGuestLogin = async () => {
        try {
            setLoading(true);
            await signInAnonymously(auth);
            navigate('/setup');
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Guest login failed',
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="max-w-[430px] w-full px-6">
                {/* Logo */}
                <h1 className="font-display text-3xl font-bold bg-brand-gradient bg-clip-text text-transparent text-center mb-2">
                    GreetFlow
                </h1>
                <p className="text-muted-foreground text-sm text-center mb-8">
                    Create beautiful greetings in seconds
                </p>

                <Card className="bg-card border-border">
                    <CardContent className="pt-6">
                        {/* Google Sign In */}
                        <Button
                            className="w-full mb-4"
                            variant="outline"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </Button>

                        <Separator className="my-4" />
                        <div className="relative flex justify-center text-xs uppercase mb-4">
                            <span className="bg-card px-2 text-muted-foreground absolute -top-2.5">or</span>
                        </div>

                        {/* Email/Password Form */}
                        <form onSubmit={handleEmailAuth} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-brand-gradient text-white"
                                disabled={loading}
                            >
                                {isSignUp ? 'Sign Up' : 'Sign In'}
                            </Button>
                        </form>

                        <button
                            className="w-full text-center text-sm text-muted-foreground mt-4 hover:text-foreground"
                            onClick={() => setIsSignUp(!isSignUp)}
                        >
                            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </button>
                    </CardContent>
                </Card>

                {/* Guest Login */}
                <Button
                    variant="ghost"
                    className="w-full mt-4 text-muted-foreground"
                    onClick={handleGuestLogin}
                    disabled={loading}
                >
                    Continue as Guest
                </Button>
            </div>
        </div>
    );
}
