function polygon() {

    const n = 9;
    const centerX = 100;
    const centerY = 100;

    const strokeWidth = 1
    const stroke = "black"
    const fill = "white"
    const radius = 50

    const canvasWidth = 200;
    const canvasHeight = 200;

    let pointsForPolygon = ""
    let linesOfPolygon = ""

    for (let i = 0; i < n; i++) {

        let x = centerX + (radius * Math.cos(i * 2 * Math.PI / n))
        let y = centerY + (radius * Math.sin(i * 2 * Math.PI / n))

        pointsForPolygon += `${x},${y} `;

        linesOfPolygon += `<line x1="${x}" y1="${y}" x2="${centerX}" y2="${centerY}"/>`
    }

    let polygonOut = `<polygon points="${pointsForPolygon}" fill="none" stroke="${stroke}" />`

    console.clear();

    console.log(`<svg viewBox="0 0 ${canvasWidth} ${canvasHeight}" xmlns="http://www.w3.org/2000/svg">\n<g id="polygon" fill="${fill}" stroke-width="${strokeWidth}" stroke="${stroke}">`)

    console.log(polygonOut)
    console.log(linesOfPolygon)
    console.log(`<animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 ${centerX} ${centerY}"
                to="360 ${centerX} ${centerY}"
                dur="10s"
                repeatCount="indefinite" />`);
    console.log(`</g>\n</svg>`)
}

polygon()