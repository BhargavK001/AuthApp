# Auth App - React Native + Expo + Firebase

A production-ready mobile authentication app built with React Native, Expo, and Firebase Authentication.

## Features

- ✅ Email/Password signup and login
- ✅ Form validation (email format, password length, etc.)
- ✅ Persistent login sessions
- ✅ Protected routes
- ✅ Clean, professional UI
- ✅ EAS Build support (APK/AAB)

## Project Structure

```
auth-app/
├── app/                     # Expo Router screens
│   ├── _layout.js           # Root layout with AuthProvider
│   ├── index.js             # Welcome screen
│   ├── login.js             # Login screen
│   ├── signup.js            # Signup screen
│   └── (protected)/         # Protected routes
│       ├── _layout.js       # Auth guard layout
│       └── home.js          # Home screen
├── components/              # Reusable UI components
│   ├── Button.js            # Custom button component
│   └── Input.js             # Input with label component
├── contexts/                # React contexts
│   └── AuthContext.js       # Authentication state
├── config/                  # Configuration files
│   └── firebase.js          # Firebase config (ADD YOUR KEYS HERE)
├── utils/                   # Utility functions
│   └── validation.js        # Form validation helpers
├── assets/                  # Images and icons
├── app.json                 # Expo configuration
├── eas.json                 # EAS Build configuration
└── package.json             # Dependencies
```

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`) - for building APK/AAB
- Firebase account
- Android device/emulator (or Expo Go app)

## Installation

1. **Clone or navigate to the project:**

   ```bash
   cd auth-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the steps
3. Once created, click the gear icon → **Project Settings**

### 2. Add Web App to Firebase

1. In Project Settings, scroll to "Your apps"
2. Click the **Web** icon (`</>`)
3. Register app with any nickname (e.g., "Auth App")
4. Copy the config object

### 3. Enable Email/Password Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Email/Password**
3. Enable it and click **Save**

### 4. Add Firebase Config to App

Open `config/firebase.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
};
```

## Running the App

### Development Mode

```bash
# Start Expo development server
npm start

# Or for Android specifically
npm run android
```

Then:

- Scan QR code with Expo Go app (Android)
- Or press `a` to open in Android emulator

## Building APK/AAB (EAS Build)

### 1. Login to Expo

```bash
eas login
```

### 2. Configure Project (First time only)

```bash
eas build:configure
```

This links your project to Expo. Update `app.json` with the generated `projectId`.

### 3. Build APK (for testing)

```bash
eas build --profile preview --platform android
```

This creates a `.apk` file you can install directly on Android devices.

### 4. Build AAB (for Play Store)

```bash
eas build --profile production --platform android
```

This creates a `.aab` file for Google Play Store submission.

### 5. Download Build

After the build completes, you'll get a download link in the terminal and on your [Expo dashboard](https://expo.dev/).

## Configuration Files

### app.json - Update these before building:

```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.yourappname" // Change this
    },
    "extra": {
      "eas": {
        "projectId": "your-eas-project-id" // Added after eas build:configure
      }
    }
  }
}
```

### eas.json - Build profiles:

| Profile       | Purpose            | Output     |
| ------------- | ------------------ | ---------- |
| `development` | Development builds | Dev client |
| `preview`     | Testing            | APK file   |
| `production`  | Play Store         | AAB bundle |

## GitHub Actions - Automatic APK Builds

This project includes a GitHub Actions workflow that automatically builds an APK whenever you push to the `main` branch. The APK is uploaded as a GitHub Release for easy download.

### Setup Instructions

1. **Get your Expo Token:**

   - Go to [expo.dev/settings/access-tokens](https://expo.dev/settings/access-tokens)
   - Click "Create Token" → give it a name → copy the token

2. **Add secrets to GitHub:**

   Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

   Add these secrets:

   | Secret Name                    | Value                                 |
   | ------------------------------ | ------------------------------------- |
   | `EXPO_TOKEN`                   | Your Expo access token                |
   | `FIREBASE_API_KEY`             | Your Firebase API key                 |
   | `FIREBASE_AUTH_DOMAIN`         | `your-project-id.firebaseapp.com`     |
   | `FIREBASE_PROJECT_ID`          | Your Firebase project ID              |
   | `FIREBASE_STORAGE_BUCKET`      | `your-project-id.firebasestorage.app` |
   | `FIREBASE_MESSAGING_SENDER_ID` | Your messaging sender ID              |
   | `FIREBASE_APP_ID`              | Your Firebase app ID                  |

3. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

4. **Download APK:**
   - Go to your GitHub repo → **Actions** tab
   - Click the latest workflow run
   - Download the APK from **Artifacts** section
   - Or go to **Releases** for versioned downloads

> **Note:** The workflow generates `config/firebase.js` during build using your GitHub Secrets, so your credentials stay safe!

## Troubleshooting

### "Firebase config not working"

- Make sure Email/Password is enabled in Firebase Console
- Verify all config values are correct (no extra spaces)

### "Metro bundler stuck"

```bash
npx expo start --clear
```

### "Build fails"

- Ensure you're logged in: `eas whoami`
- Check build logs on expo.dev dashboard

### "Auth state not persisting"

- Make sure AsyncStorage is properly installed
- Clear app data and try again

## Tech Stack

- **React Native** - Mobile framework
- **Expo SDK 52** - Development platform
- **Expo Router** - File-based navigation
- **Firebase 11** - Authentication backend
- **AsyncStorage** - Session persistence

## License

MIT
