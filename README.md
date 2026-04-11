# RK's - Web Solution

A modern developer portfolio website built with React, Redux Toolkit, Tailwind CSS, and Vite.

## Overview

This repository contains a responsive single-page portfolio website with smooth section navigation, animated UI interactions, and a functional contact form.

## Features

- Responsive hero section with primary CTA actions
- Service offerings and tech stack showcase
- Portfolio project cards and professional experience
- Contact form with EmailJS email sending
- Toast notifications for form status updates
- Active section tracking with smooth scrolling
- Global dark theme and responsive mobile menu

## Tech Stack

- React 18
- Redux Toolkit + `react-redux`
- Tailwind CSS
- Vite
- Framer Motion
- Wouter for routing
- React Query for async state management
- EmailJS browser SDK for contact email sending
- Radix UI packages for toast and tooltip utilities

## EmailJS Integration

The contact form uses `@emailjs/browser` to send messages directly from the client.

- Email service is configured using `VITE_EMAILJS_SERVICE_ID`
- Email template is configured using `VITE_EMAILJS_TEMPLATE_ID`
- EmailJS public key uses `VITE_EMAILJS_PUBLIC_KEY`
- Form fields are sent from React state managed by Redux
- Submission status is tracked with `pending`, `success`, or `error`

## Environment Variables

Create a `.env` file at the project root with the following variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Project Structure

```text
src/
  App.jsx              - Root component with providers and router
  main.jsx             - React entry point
  index.css            - Global styles and Tailwind setup
  pages/
    Home.jsx           - Main portfolio page and contact handling
    not-found.jsx      - 404 fallback route
  store/
    index.js           - Redux store setup
    uiSlice.js         - UI state for navbar, menu, and active section
    contactSlice.js    - Contact form state and submission status
  hooks/
    use-mobile.jsx     - Mobile viewport detection hook
    use-toast.js       - Toast state hook
  components/ui/
    Tooltip.jsx        - Tooltip provider and component
    Toaster.jsx        - Toast notification UI
  lib/
    utils.js           - Utility helpers
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Redux State

### UI Slice (`src/store/uiSlice.js`)
- `navScrolled` - updates navbar styling when the page is scrolled
- `menuOpen` - tracks mobile menu open/close state
- `activeSection` - tracks the currently visible page section

### Contact Slice (`src/store/contactSlice.js`)
- `name`, `email`, `phone`, `projectType`, `message`
- `status` - email submission state: `idle`, `pending`, `success`, `error`

## Notes

- The site adds a global dark theme class on mount.
- Toasts are displayed using the custom `useToast` hook and `Toaster` component.
- EmailJS is used for client-side form submissions.

## License

This repository is provided for demonstration purposes. Add a license if you plan to publish or share it publicly.
