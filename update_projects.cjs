const fs = require('fs');
const filePath = 'src/components/Projects.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const images = [
    'https://media.giphy.com/media/xTiTnxpQ3ghPiB2Hp6/giphy.gif',
    'https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif',
    'https://media.giphy.com/media/YQitE4YNQBroM/giphy.gif',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop',
    'https://media.giphy.com/media/fwc2ZTEhwTqVvYp2n4/giphy.gif',
    'https://media.giphy.com/media/26n7b7PjSOZJwVCmY/giphy.gif',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
    'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif',
    'https://images.unsplash.com/photo-1510511459019-5dee99c48db8?q=80&w=2670&auto=format&fit=crop',
    'https://media.giphy.com/media/l41lOugjmO32UvUSk/giphy.gif',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop',
    'https://media.giphy.com/media/3o6Ztg2MgUkcXyCpnG/giphy.gif',
    'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2606&auto=format&fit=crop',
    'https://media.giphy.com/media/26tn33aiTi1jVDzO0/giphy.gif',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop',
    'https://media.giphy.com/media/5wWf7HapU1B0A06h7F2/giphy.gif',
    'https://media.giphy.com/media/l0HlNaQ6gWfllcjDO/giphy.gif',
    'https://images.unsplash.com/photo-1551288049-bb25a5f4981d?q=80&w=2670&auto=format&fit=crop'
];

let counter = 0;
content = content.replace(/image:\s*".*?",/g, () => {
    const img = images[counter % images.length];
    counter++;
    return 'image: "' + img + '",';
});

content = content.replace(
    'exit={{ opacity: 0, scale: 0.95 }}',
    'exit={{ opacity: 0, scale: 0.95 }}\n                  whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5, z: 50 }}'
);

content = content.replace(
    'className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"',
    'className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start perspective-2000"'
);

content = content.replace(
    'className={`relative group overflow-hidden rounded-[3rem] bg-[#080808] border border-white/5 cinematic-glow transition-all duration-1000 hover:border-white/20',
    'className={`relative group overflow-hidden rounded-[3rem] bg-[#080808] border border-white/5 cinematic-glow transition-all duration-1000 hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] preserve-3d'
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Updated Projects.tsx successfully.');
