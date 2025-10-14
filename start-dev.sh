#!/bin/bash

# Start both frontend and backend for local development

echo "Starting MBTI Project Development Environment..."
echo "=============================================="

# Function to kill background processes on exit
cleanup() {
    echo "Stopping development servers..."
    kill $FRONTEND_PID $BACKEND_PID 2>/dev/null
    exit
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend server
echo "Starting backend server on port 3001..."
npm run dev:backend &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend server
echo "Starting frontend server on port 5173..."
npm run dev:frontend &
FRONTEND_PID=$!

echo ""
echo "✅ Development servers started!"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $FRONTEND_PID $BACKEND_PID
