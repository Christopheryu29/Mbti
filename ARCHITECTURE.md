# MBTI Project Architecture

## Overview
This document describes the improved architecture of the MBTI Patch Project, following React and TypeScript best practices.

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   └── ...             # Feature components
├── contexts/           # React Context providers
│   └── FlowContext.tsx
├── hooks/              # Custom React hooks
│   ├── useAsync.ts
│   ├── useImageUpload.ts
│   └── useNavigation.ts
├── services/           # API and business logic
│   ├── apiService.ts
│   ├── googleDriveService.ts
│   ├── googleSheetsService.ts
│   └── mbtiScoringService.ts
├── types/              # TypeScript type definitions
│   ├── user.ts
│   ├── mbti.ts
│   ├── api.ts
│   └── index.ts
├── utils/              # Utility functions
│   ├── errorHandler.ts
│   └── validators.ts
├── config/             # Configuration management
│   └── env.ts
├── App.tsx             # Main app component
└── main.tsx            # Application entry point
```

## Architecture Principles

### 1. **Separation of Concerns**
- **Components**: Only handle UI rendering and user interactions
- **Hooks**: Encapsulate reusable stateful logic
- **Services**: Handle API calls and business logic
- **Utils**: Provide pure utility functions

### 2. **Type Safety**
- Centralized type definitions in `src/types/`
- All functions and components are properly typed
- No `any` types unless absolutely necessary

### 3. **Error Handling**
- Centralized error handling in `src/utils/errorHandler.ts`
- Custom error classes for different error types
- Consistent error logging in development mode

### 4. **Configuration Management**
- Single source of truth for environment variables
- Type-safe configuration access via `config` singleton
- Easy to add new configuration values

### 5. **Reusability**
- Shared UI components in `src/components/ui/`
- Custom hooks for common patterns
- Utility functions for validation and error handling

## Key Components

### Custom Hooks

#### `useAsync`
Handles async operations with loading and error states.

```typescript
const { data, loading, error, execute } = useAsync(fetchData);
```

#### `useImageUpload`
Manages image file selection, validation, and preview.

```typescript
const {
  file,
  preview,
  error,
  handleFileSelect,
  triggerFileInput,
} = useImageUpload();
```

#### `useNavigation`
Provides consistent navigation patterns.

```typescript
const { goTo, goBack, goToWithDelay } = useNavigation();
```

### UI Components

#### `Button`
Reusable button component with variants and loading states.

```typescript
<Button
  variant="primary"
  size="medium"
  isLoading={isProcessing}
  onClick={handleSubmit}
>
  Submit
</Button>
```

#### `ImageUpload`
Reusable image upload component with validation.

```typescript
<ImageUpload
  onImageSelect={(file, preview) => setImage({ file, preview })}
  placeholder="Upload Payment"
/>
```

#### `LoadingSpinner`
Loading indicator with customizable size and message.

```typescript
<LoadingSpinner size="medium" message="Processing..." />
```

#### `ErrorMessage`
Error display with optional retry button.

```typescript
<ErrorMessage message={error} onRetry={handleRetry} />
```

### Services

#### `ApiService`
Handles order processing with automatic fallback.

```typescript
const result = await ApiService.processOrder(orderData);
```

#### Configuration Service
Type-safe access to environment variables.

```typescript
import { config } from './config/env';

const apiUrl = config.get('apiBaseUrl');
const isConfigured = config.isConfigured(['googleSheetsId']);
```

### Error Handling

#### Custom Error Classes
```typescript
throw new ValidationError("Invalid phone number");
throw new NetworkError("Failed to connect");
throw new ApiError("Server error", 500);
```

#### Error Logging
```typescript
logError(error, "ComponentName.methodName");
```

### Validation

#### Validators
```typescript
import { validators, validateUserData } from './utils';

validators.required(name, "Name");
validators.phone(phoneNumber);
validators.fileSize(file, 10); // 10MB max

validateUserData({ name, phone, address });
```

## Best Practices

### Component Structure
```typescript
import React from 'react';
import { useNavigation } from '../hooks';
import type { UserData } from '../types';

interface Props {
  userData: UserData;
  onSubmit: (data: UserData) => void;
}

export const MyComponent: React.FC<Props> = ({ userData, onSubmit }) => {
  const { goTo } = useNavigation();

  const handleSubmit = () => {
    onSubmit(userData);
    goTo('/next-page');
  };

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};
```

### Using Custom Hooks
```typescript
import { useAsync } from '../hooks';
import { ApiService } from '../services';

const MyComponent = () => {
  const { data, loading, error, execute } = useAsync(
    ApiService.processOrder
  );

  const handleSubmit = async () => {
    const result = await execute(orderData);
    if (result) {
      // Handle success
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return <div>{/* Component content */}</div>;
};
```

### Service Pattern
```typescript
export class MyService {
  static async fetchData(): Promise<ApiResponse<Data>> {
    try {
      const response = await fetch(config.get('apiBaseUrl'));
      return { success: true, data: await response.json() };
    } catch (error) {
      logError(error, 'MyService.fetchData');
      return { success: false, error: handleError(error).message };
    }
  }
}
```

## Future Improvements

1. **Testing**
   - Add unit tests for services and hooks
   - Add integration tests for critical flows
   - Add E2E tests with Playwright

2. **Performance**
   - Implement code splitting
   - Add lazy loading for routes
   - Optimize images and assets

3. **Accessibility**
   - Add ARIA labels
   - Improve keyboard navigation
   - Add screen reader support

4. **State Management**
   - Consider Zustand or Redux if state becomes more complex
   - Add persistent state with localStorage

5. **API Layer**
   - Add request caching
   - Implement retry logic
   - Add request cancellation

## Migration Guide

### Updating Existing Components

1. **Import types from centralized location**
   ```typescript
   // Before
   interface UserData { ... }

   // After
   import type { UserData } from '../types';
   ```

2. **Use custom hooks**
   ```typescript
   // Before
   const navigate = useNavigate();
   const handleClick = () => navigate('/path');

   // After
   const { goTo } = useNavigation();
   const handleClick = () => goTo('/path');
   ```

3. **Use reusable UI components**
   ```typescript
   // Before
   <button onClick={handleClick} disabled={loading}>
     {loading ? 'Loading...' : 'Submit'}
   </button>

   // After
   <Button onClick={handleClick} isLoading={loading}>
     Submit
   </Button>
   ```

4. **Use configuration helper**
   ```typescript
   // Before
   const apiUrl = import.meta.env.VITE_API_BASE_URL;

   // After
   import { config } from '../config/env';
   const apiUrl = config.get('apiBaseUrl');
   ```

## Conclusion

This architecture provides:
- **Maintainability**: Clear structure and separation of concerns
- **Scalability**: Easy to add new features and components
- **Type Safety**: Full TypeScript support with shared types
- **Reusability**: Shared components and hooks
- **Developer Experience**: Better tooling and autocomplete
