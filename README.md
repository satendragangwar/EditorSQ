# Online SQL Editor

# Project Overview

This project is a web application built with React and TypeScript. It provides a user-friendly interface for managing and querying customer data. The application includes several components to facilitate data entry, query execution, and result visualization.

## Features

- **Query Editor**: Write and execute custom queries to filter customer data.
- **Query History**: View and manage previously executed queries.
- **Results Table**: Display query results in a tabular format.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/satendragangwar/EditorSQ.git
    cd your-repo
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

1. Start the development server:
    ```sh
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:5173`.

## Extra Features

- **Export Results**: Export query results to CSV or JSON.
- **Query History**: View and manage previously executed queries.

## Demo

Check out the live demo [https://editor-sq.vercel.app/](https://editor-sq.vercel.app/).
<img width="1435" alt="Image" src="https://github.com/user-attachments/assets/d0bf8a83-a5e0-4ac9-a924-8a380a549584" />

## Technical Details

### JavaScript Framework

The project is built using the React framework. React is a popular JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience.

### Page Load Time

The page load time of the application is approximately 0.3 to 0.6 seconds. This time was measured using the Chrome DevTools Performance panel.

### Performance Optimizations

To decrease load time and increase performance, the following optimizations were implemented:

- **Code Splitting**: Using React's lazy and Suspense to load components only when needed.
- **Caching**: Implementing browser caching for static assets.
- **Minification**: Minifying JavaScript and CSS files to reduce their size.
- **Image Optimization**: Compressing images to reduce their load time.

<img width="1253" alt="Image" src="https://github.com/user-attachments/assets/de1ea905-144a-4abe-9a48-49ad5acf0d9c" />

