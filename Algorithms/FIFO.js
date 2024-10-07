const secuence = "1 2 3 4 1 2 5 1 2 3 4 5".split(" ").map(Number);
const frames = 3;
const pages = secuence.length;
let page_faults = 0;
let fifo = [];


function insertIntoFIFO(page) {
    if (!fifo.includes(page)) {
        if (fifo.length === frames) {
            fifo.shift(); 
        }
        fifo.push(page); 
        page_faults++; 
    }
    console.log(fifo);
}

for (let i = 0; i < pages; i++) {
    insertIntoFIFO(secuence[i]);
}

console.log("Secuence: ", secuence);
console.log("Frames: ", frames);
console.log("Pages: ", pages);
console.log("Page faults: ", page_faults);
