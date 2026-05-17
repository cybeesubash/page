const fs = require('fs');
const filePath = 'src/components/Projects.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// Curated list of serious, cinematic tech, AI, and cyber security GIFs.
// Removed all the meme/funny ones.
const seriousGifs = [
    'https://media.giphy.com/media/xTiTnxpQ3ghPiB2Hp6/giphy.gif', // Matrix
    'https://media.giphy.com/media/26tn33aiTi1jVDzO0/giphy.gif', // Hacker
    'https://media.giphy.com/media/l41lOugjmO32UvUSk/giphy.gif', // Network Globe
    'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif', // Digital Network
    'https://media.giphy.com/media/l0HlNaQ6gWfllcjDO/giphy.gif', // Code scrolling
    'https://media.giphy.com/media/uBZeSikXG640w/giphy.gif',     // Digital lines
    'https://media.giphy.com/media/7ZfB2O9mU8T2U/giphy.gif',     // Hacker code
    'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif', // Tech HUD
    'https://media.giphy.com/media/d9a10xP22Ym6ZzE9p8/giphy.gif', // Cyber data
    'https://media.giphy.com/media/k5uEwE93jE9O8/giphy.gif',     // Binary/Data
    'https://media.giphy.com/media/QvBoMEcQ7DQXK/giphy.gif'      // Interface
];

let counter = 0;
content = content.replace(/image:\s*".*?"(,)?/g, (match, comma) => {
    const img = seriousGifs[counter % seriousGifs.length];
    counter++;
    return 'image: "' + img + '"' + (comma ? ',' : '');
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Replaced images with SERIOUS tech/AI GIFs.');
