# <https://www.virtual-asphalt.org> Website

## Quick Start: Running the Website Locally

1. **Install Node.js (includes npm)**

  Download and install from [https://nodejs.org/](https://nodejs.org/).

1. **Install dependencies**

 In your project directory, run:
    ```bash
    npm install
    ```

2.. **Start the development server**

 Run:
    ```bash
    npm start
    ```
 The website will be available locally.

## Deployment

After merging changes into the `main` branch, the website will be automatically built and deployed to the FTP server via the GitHub workflow.

## Adding Race Calendar Images & Descriptions

1. **Add Image**

- Place your image file (e.g., `005-newrace.png`) in the folder: `src/img/rennkalender/`.

2. **Add Description**

- Create a `.txt` file with the same base name as the image (e.g., `005-newrace.txt`).
- Write the description for the race in this text file.
- Place the `.txt` file in the same folder: `src/img/rennkalender/`.

The image and its description will be picked up automatically by the website.
