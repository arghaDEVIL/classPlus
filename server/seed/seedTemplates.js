require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Template = require('../models/Template');

const templates = [
    // Shayari Category - Urdu/Hindi poetry cards
    {
        title: 'Sunset Love Shayari',
        category: 'Shayari',
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop',
        isFree: true,
        tags: ['love', 'urdu', 'sunset'],
    },
    {
        title: 'Rose Romance Shayari',
        category: 'Shayari',
        imageUrl: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=400&h=600&fit=crop',
        isFree: true,
        tags: ['rose', 'romantic', 'poetry'],
    },

    // Birthday Category - Celebration cards
    {
        title: 'Birthday Celebration',
        category: 'Birthday',
        imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=600&fit=crop',
        isFree: true,
        tags: ['birthday', 'celebration', 'balloons'],
    },
    {
        title: 'Golden Birthday Wishes',
        category: 'Birthday',
        imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=600&fit=crop',
        isFree: false,
        tags: ['birthday', 'premium', 'golden'],
    },

    // Festival Category - Indian festivals
    {
        title: 'Diwali Sparkle',
        category: 'Festival',
        imageUrl: 'https://images.unsplash.com/photo-1605811345787-4d5d5d4b8f9f?w=400&h=600&fit=crop',
        isFree: true,
        tags: ['diwali', 'festival', 'lights'],
    },
    {
        title: 'Holi Colors',
        category: 'Festival',
        imageUrl: 'https://images.unsplash.com/photo-1583241800698-9c2e0c3e9e3e?w=400&h=600&fit=crop',
        isFree: false,
        tags: ['holi', 'premium', 'colors'],
    },

    // Joke Category - Funny/humorous cards
    {
        title: 'Morning Laugh',
        category: 'Joke',
        imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&h=600&fit=crop',
        isFree: true,
        tags: ['funny', 'morning', 'coffee'],
    },
    {
        title: 'Office Humor',
        category: 'Joke',
        imageUrl: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=600&fit=crop',
        isFree: true,
        tags: ['office', 'funny', 'work'],
    },

    // Love Category - Romantic cards
    {
        title: 'Heart Full Love',
        category: 'Love',
        imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=600&fit=crop',
        isFree: true,
        tags: ['love', 'heart', 'romantic'],
    },
    {
        title: 'Forever Love',
        category: 'Love',
        imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=600&fit=crop',
        isFree: false,
        tags: ['love', 'premium', 'couple'],
    },

    // Motivational Category - Inspirational cards
    {
        title: 'Rise & Shine',
        category: 'Motivational',
        imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=600&fit=crop',
        isFree: true,
        tags: ['morning', 'motivation', 'sunrise'],
    },

    // Updesh Category - Wisdom/advice cards
    {
        title: 'Daily Wisdom',
        category: 'Updesh',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
        isFree: false,
        tags: ['wisdom', 'premium', 'nature'],
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
