# MBTI Patch Project

A React TypeScript mobile-first application for creating personalized MBTI patches and custom shirts.

## Features

### Main Flow

1. **Start** - Welcome screen
2. **Name Input** - Collect user's full name
3. **Phone Number** - Collect contact information
4. **Address** - Collect delivery address
5. **MBTI Check** - Ask if user knows their MBTI type
   - If yes: **MBTI Input** - Select from predefined MBTI types
   - If no: **MBTI Test** - Take a color-based personality test
6. **Claim Order** - Review and proceed to order or get additional patches
7. **Design Shirt** - Choose color, size, and design style
8. **Payment** - Select payment method and enter details
9. **Calendar** - Choose delivery date
10. **Thank You** - Order confirmation

### Additional Patch Flow

- **Get Other Patch** - Choose between personalized or pre-designed patches
- **Personalized Patch** - Take a 20-question detailed assessment
- **Choose Own Patch** - Browse and select from pre-designed patch collection

## MBTI Test Logic

The MBTI test uses a color-based system:

- **Questions 1-10**: 1 point each
- **Questions 11-12**: 2 points each (tiebreaker questions)
- **Colors**: Green (Analytical), Purple (Creative), Yellow (Social), Blue (Calm)
- If there's a tie after 10 questions, additional tiebreaker questions are shown

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Lucide React** for icons
- **Mobile-first responsive design**
- **Context API** for state management

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to the provided local URL (usually `http://localhost:5173`)

## Project Structure

```
src/
├── components/          # React components for each flow step
├── contexts/           # React Context for state management
├── App.tsx            # Main app component with routing
├── App.css            # Mobile-first responsive styles
└── main.tsx           # Application entry point
```

## Mobile-First Design

The application is designed with mobile devices in mind:

- Touch-friendly interface
- Responsive layout that works on all screen sizes
- Optimized for portrait orientation
- Fast loading and smooth animations

## Features

- **Progressive Flow**: Step-by-step user journey with back navigation
- **State Persistence**: User data is maintained throughout the flow
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Modern UI**: Clean, modern interface with smooth animations
- **Type Safety**: Full TypeScript support for better development experience

## Development

The project uses Vite for fast development with hot module replacement. All components are built with TypeScript for type safety and better developer experience.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.
# Mbti
