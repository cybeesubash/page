const fs = require('fs');
const filePath = 'src/components/Projects.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const gifs = [
    'https://media.giphy.com/media/xTiTnxpQ3ghPiB2Hp6/giphy.gif',
    'https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif',
    'https://media.giphy.com/media/YQitE4YNQBroM/giphy.gif',
    'https://media.giphy.com/media/fwc2ZTEhwTqVvYp2n4/giphy.gif',
    'https://media.giphy.com/media/26n7b7PjSOZJwVCmY/giphy.gif',
    'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif',
    'https://media.giphy.com/media/l41lOugjmO32UvUSk/giphy.gif',
    'https://media.giphy.com/media/3o6Ztg2MgUkcXyCpnG/giphy.gif',
    'https://media.giphy.com/media/26tn33aiTi1jVDzO0/giphy.gif',
    'https://media.giphy.com/media/5wWf7HapU1B0A06h7F2/giphy.gif',
    'https://media.giphy.com/media/l0HlNaQ6gWfllcjDO/giphy.gif',
    'https://media.giphy.com/media/uBZeSikXG640w/giphy.gif',
    'https://media.giphy.com/media/7ZfB2O9mU8T2U/giphy.gif',
    'https://media.giphy.com/media/L0IEnEkuFpBqE/giphy.gif',
    'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',
    'https://media.giphy.com/media/QvBoMEcQ7DQXK/giphy.gif',
    'https://media.giphy.com/media/d9a10xP22Ym6ZzE9p8/giphy.gif',
    'https://media.giphy.com/media/k5uEwE93jE9O8/giphy.gif'
];

let counter = 0;
content = content.replace(/image:\s*".*?",/g, () => {
    const img = gifs[counter % gifs.length];
    counter++;
    return 'image: "' + img + '",';
});

// Let's also make sure the hover effect is intense
// If it currently has whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5, z: 50 }}
// we can change it to rotate more or add a border color
content = content.replace(
    'whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5, z: 50 }}',
    'whileHover={{ scale: 1.05, rotateY: 10, rotateX: -10, z: 100 }}'
);

// enhance the CSS hover effect
content = content.replace(
    'hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]',
    'hover:shadow-[0_0_80px_rgba(255,255,255,0.2)] hover:border-white/50'
);

// We also ensure the background gradient is stronger
content = content.replace(
    'bg-gradient-to-t from-black via-black/20 to-transparent',
    'bg-gradient-to-t from-black via-black/40 to-transparent mix-blend-multiply group-hover:mix-blend-normal transition-all duration-1000'
);


fs.writeFileSync(filePath, content, 'utf-8');
console.log('Updated Projects.tsx with ALL GIFs successfully.');
