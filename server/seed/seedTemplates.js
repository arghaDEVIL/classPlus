require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Template = require('../models/Template');

const templates = [
    {
        title: 'Sunset Love',
        category: 'Shayari',
        imageUrl: 'https://picsum.photos/seed/shayari1/400/600',
        isFree: true,
        tags: ['love', 'urdu'],
    },
    {
        title: 'Rose Shayari',
        category: 'Shayari',
        imageUrl: 'https://picsum.photos/seed/shayari2/400/600',
        isFree: true,
        tags: ['rose', 'romantic'],
    },
    {
        title: 'Birthday Blast',
        category: 'Birthday',
        imageUrl: 'https://picsum.photos/seed/bday1/400/600',
        isFree: true,
        tags: ['birthday', 'celebration'],
    },
    {
        title: 'Golden Birthday',
        category: 'Birthday',
        imageUrl: 'https://picsum.photos/seed/bday2/400/600',
        isFree: false,
        tags: ['birthday', 'premium'],
    },
    {
        title: 'Diwali Sparkle',
        category: 'Festival',
        imageUrl: 'https://picsum.photos/seed/fest1/400/600',
        isFree: true,
        tags: ['diwali', 'festival'],
    },
    {
        title: 'Holi Colors',
        category: 'Festival',
        imageUrl: 'https://picsum.photos/seed/fest2/400/600',
        isFree: false,
        tags: ['holi', 'premium'],
    },
    {
        title: 'Morning Laugh',
        category: 'Joke',
        imageUrl: 'https://picsum.photos/seed/joke1/400/600',
        isFree: true,
        tags: ['funny', 'morning'],
    },
    {
        title: 'Office Joke',
        category: 'Joke',
        imageUrl: 'https://picsum.photos/seed/joke2/400/600',
        isFree: true,
        tags: ['office', 'funny'],
    },
    {
        title: 'Heart Full',
        category: 'Love',
        imageUrl: 'https://picsum.photos/seed/love1/400/600',
        isFree: true,
        tags: ['love', 'heart'],
    },
    {
        title: 'Forever Love',
        category: 'Love',
        imageUrl: 'https://picsum.photos/seed/love2/400/600',
        isFree: false,
        tags: ['love', 'premium'],
    },
    {
        title: 'Rise & Shine',
        category: 'Motivational',
        imageUrl: 'https://picsum.photos/seed/moti1/400/600',
        isFree: true,
        tags: ['morning', 'motivation'],
    },
    {
        title: 'Updesh Daily',
        category: 'Updesh',
        imageUrl: 'https://picsum.photos/seed/updesh1/400/600',
        isFree: false,
        tags: ['wisdom', 'premium'],
    },
];

mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
        await Template.deleteMany({});
        await Template.insertMany(templates);
        console.log('Seeded 12 templates successfully');
        process.exit();
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
