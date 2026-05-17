const fs = require('fs');
const filePath = 'src/components/Projects.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const techImages = [
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1510511459019-5dee99c48db8?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2606&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bb25a5f4981d?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551703599-6b3e8379aa8b?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558483320-dc69223e75e9?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1531746790731-6c2079ee3922?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2574&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1614064641913-6b7140414c71?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?q=80&w=2668&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618060932014-4deda4932554?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2670&auto=format&fit=crop'
];

let counter = 0;
content = content.replace(/image:\s*".*?"(,)?/g, (match, comma) => {
    const img = techImages[counter % techImages.length];
    counter++;
    return 'image: "' + img + '"' + (comma ? ',' : '');
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Replaced gifs with high-quality AI/Cyber images.');
