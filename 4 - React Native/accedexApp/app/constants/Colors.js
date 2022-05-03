export default function(type) {
    switch(type) {
        case 'grass': return '#7eb95b'; break;
        case 'fire': return '#fd5d5c'; break;
        case 'water': return '#5ba6d2'; break;
        case 'normal': return '#dddbc6'; break;
        case 'flying': return '#93d0cb'; break;
        case 'bug': return '#bddd6e'; break;
        case 'poison': return '#c565e4'; break;
        case 'electric': return '#fffb6d'; break;
        case 'ground': return '#ede293'; break;
        case 'fighting': return '#ef6165'; break;
        case 'psychic': return '#f55792'; break;
        case 'rock': return '#94834f'; break;
        case 'ice': return '#65b8c0'; break;
        case 'ghost': return '#b38dc2'; break;
        case 'dragon': return '#b18dfd'; break;
        case 'dark': return '#916852'; break;
        case 'steel': return '#bbc5c4'; break;
        case 'fairy': return '#fdd1e0'; break;
        case 'gray': return '#d8d8d8'; break;
        case 'default': return '#fff'; break;
    }
}