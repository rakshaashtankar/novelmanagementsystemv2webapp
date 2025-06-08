// railway.config.js
module.exports = {
    root: ".",                     // root of your React app
    buildCommand: "npm run build", // builds production build
    startCommand: "serve -s build" // if you are not using Netlify/Vercel-style hosting
};