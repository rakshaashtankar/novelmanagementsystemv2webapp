module.exports = {
    root: ".",
    buildCommand: "npm install --legacy-peer-deps && npm run build",
    startCommand: "serve -s build"
};