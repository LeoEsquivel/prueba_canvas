const d = document

const canvas_contenedor = d.getElementById('canvas');

const btnAgregarCanvas = d.getElementById('btnAgregarCanvas');
const btnDibujarFigura = d.getElementById('btnDibujarFigura');

let numeroHojas = 1;
let currentPaper = undefined;

const papers = [
    {
        hoja: numeroHojas,
        elemets: [

        ]
    }
];

btnAgregarCanvas.addEventListener('click', () => {
    try {
        numeroHojas++;
        const hojaContenedor = d.createElement('div');
        hojaContenedor.classList.add('col', 'py-2');
        const canva = d.createElement('canvas');
        canva.classList.add('hoja');
        canva.width = 600;
        canva.height = 400;
        canva.id = numeroHojas
        hojaContenedor.appendChild(canva);
        canvas_contenedor.appendChild(hojaContenedor);

        papers.push({
            hoja: numeroHojas,
            elemets: []
        });

        canva.addEventListener('mousedown', (e) => {
            updateCurrentPaper(e.target);
        })

    } catch (error) {
        throw new Error('Error al crear la hoja')
    }
});

btnDibujarFigura.addEventListener('click', () => {
    drawRectangle();
})

const updateCurrentPaper = (canva) => {
    currentPaper = canva;
    offsetX = currentPaper.offsetLeft
    offsetY = currentPaper.offsetTop;
    scrollX = currentPaper.scrollLeft;
    scrollY = currentPaper.scrollTop;
    console.log(`Se cambio de hoja: ${currentPaper.id}`);
}



const drawRectangle = () => {
    const canvas = currentPaper
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        const rectangle = new Path2D();
        rectangle.rect(10, 10, 50, 50);

        papers[canvas.id - 1].elemets.push({
            type: 'rectangle',
            positions: [10, 10, 50, 50]
        })
        ctx.stroke(rectangle);
    }
    console.log(papers);
}

window.addEventListener('click', () => {
    const hojaInicial = d.getElementById('hoja_1');

    hojaInicial.addEventListener('click', (e) => {
        const { target } = e;
        updateCurrentPaper(target);
    })
})