#!/bin/bash

# GreetFlow Quick Start Script

echo "🚀 Starting GreetFlow Application..."
echo ""

# Check if MongoDB is running
echo "📦 Checking MongoDB..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   Run: mongod"
    exit 1
fi
echo "✅ MongoDB is running"
echo ""

# Seed database if needed
echo "🌱 Checking database..."
cd server
if [ ! -f ".seeded" ]; then
    echo "📝 Seeding database with sample templates..."
    npm run seed
    touch .seeded
    echo "✅ Database seeded"
else
    echo "✅ Database already seeded"
fi
echo ""

# Start backend in background
echo "🔧 Starting backend server..."
npm start &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
echo ""

# Wait for backend to be ready
sleep 3

# Start frontend
echo "🎨 Starting frontend..."
cd ../client
npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
