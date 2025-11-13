#!/bin/bash

# Start both frontend and backend for local development

echo "Starting MBTI Project Development Environment..."
echo "=============================================="

# Function to get local IP address
get_local_ip() {
    # Try different methods to get local IP
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "localhost"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        hostname -I | awk '{print $1}' 2>/dev/null || echo "localhost"
    else
        echo "localhost"
    fi
}

LOCAL_IP=$(get_local_ip)

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

# Wait a moment for frontend to start
sleep 2

echo ""
echo "✅ Development servers started!"
echo ""
echo "📍 Local access:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3001"
echo ""
echo "📱 Mobile access (same network):"
echo "   Frontend: http://${LOCAL_IP}:5173"
echo "   Backend:  http://${LOCAL_IP}:3001"
echo ""
echo "💡 Make sure your mobile device is on the same Wi-Fi network"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $FRONTEND_PID $BACKEND_PID
