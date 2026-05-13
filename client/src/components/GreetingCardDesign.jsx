// Greeting card design overlays for different categories
export const getCardDesign = (category) => {
    const designs = {
        Shayari: {
            border: 'border-4 border-amber-400/80',
            overlay: 'bg-gradient-to-b from-purple-900/40 via-transparent to-purple-900/40',
            textArea: (
                <div className="absolute bottom-16 left-4 right-4 bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-amber-400/50">
                    <p className="text-amber-200 text-sm font-serif italic text-center">
                        "दिल की बातें, शायरी की ज़ुबानी..."
                    </p>
                </div>
            ),
        },
        Birthday: {
            border: 'border-4 border-pink-400',
            overlay: 'bg-gradient-to-br from-pink-500/20 via-transparent to-yellow-500/20',
            textArea: (
                <div className="absolute bottom-16 left-4 right-4 bg-gradient-to-r from-pink-500/80 to-purple-500/80 backdrop-blur-sm p-3 rounded-xl">
                    <p className="text-white text-lg font-bold text-center">🎉 Happy Birthday! 🎂</p>
                </div>
            ),
        },
        Festival: {
            border: 'border-4 border-orange-400',
            overlay: 'bg-gradient-to-t from-orange-900/50 via-transparent to-yellow-900/50',
            textArea: (
                <div className="absolute bottom-16 left-4 right-4 bg-gradient-to-r from-orange-600/80 to-red-600/80 backdrop-blur-sm p-3 rounded-lg border-2 border-yellow-400">
                    <p className="text-yellow-100 text-base font-semibold text-center">✨ Festival Greetings ✨</p>
                </div>
            ),
        },
        Joke: {
            border: 'border-4 border-green-400',
            overlay: 'bg-gradient-to-br from-green-500/20 via-transparent to-blue-500/20',
            textArea: (
                <div className="absolute bottom-16 left-4 right-4 bg-green-600/80 backdrop-blur-sm p-3 rounded-full">
                    <p className="text-white text-sm font-bold text-center">😄 Have a Laugh! 😂</p>
                </div>
            ),
        },
        Love: {
            border: 'border-4 border-red-400',
            overlay: 'bg-gradient-to-br from-red-500/30 via-pink-500/20 to-red-500/30',
            textArea: (
                <div className="absolute bottom-16 left-4 right-4 bg-gradient-to-r from-red-600/80 to-pink-600/80 backdrop-blur-sm p-4 rounded-2xl border-2 border-red-300">
                    <p className="text-white text-base font-serif italic text-center">💕 With Love 💕</p>
                </div>
            ),
        },
        Motivational: {
            border: 'border-4 border-blue-400',
            overlay: 'bg-gradient-to-t from-blue-900/40 via-transparent to-cyan-900/40',
            textArea: (
                <div className="absolute bottom-16 left-4 right-4 bg-blue-600/80 backdrop-blur-sm p-3 rounded-lg">
                    <p className="text-cyan-100 text-sm font-bold text-center">💪 Stay Motivated! ⭐</p>
                </div>
            ),
        },
        Updesh: {
            border: 'border-4 border-yellow-600',
            overlay: 'bg-gradient-to-b from-yellow-900/40 via-transparent to-orange-900/40',
            textArea: (
                <div className="absolute bottom-16 left-4 right-4 bg-gradient-to-r from-yellow-700/80 to-orange-700/80 backdrop-blur-sm p-4 rounded-lg border border-yellow-400">
                    <p className="text-yellow-100 text-sm font-serif text-center">🙏 Words of Wisdom 📿</p>
                </div>
            ),
        },
    };

    return designs[category] || designs.Love;
};
