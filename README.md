# Clip Spin: Video Transcription & Regeneration Platform

## Project Overview

Clip Spin is a web application that enables users to extract transcriptions from existing videos and generate new videos based on those transcriptions using either AI-generated avatars or real human presenters. This tool helps content creators repurpose content across platforms, create multilingual versions, or update visuals while preserving the original message.

## Features

- **Video Source Input**: Support for URLs from YouTube, TikTok, Instagram, and direct video file uploads (MP4, MOV, AVI formats)
- **Transcription Process**: Automatic language detection with timestamps synchronized with original video
- **Transcription Editing**: Edit capability for correcting errors in transcription
- **Presenter Selection**: Choose between AI-generated avatars or real human presenters
- **Output Customization**: Resolution options (720p, 1080p, 4K), aspect ratio options (16:9, 9:16, 1:1, 4:5), and video delivery format (MP4, MOV)
- **Project Management**: Dashboard to track all current and past projects with status indicators

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
