// Change this for a different gradient palette
const colors = [ //
    {r: 177, g: 42, b: 40}, //
    {r: 192, g: 84, b: 60}, //
    {r: 227, g: 193, b: 73}, //
    {r: 93, g: 165, b: 72}, //
    {r: 64, g: 135, b: 200} //
];

function gradient(c1, c2, ratio) {
    const r = Math.ceil((c1.r * (1 - ratio)) + (c2.r * ratio));
    const g = Math.ceil((c1.g * (1 - ratio)) + (c2.g * ratio));
    const b = Math.ceil((c1.b * (1 - ratio)) + (c2.b * ratio));
    return {r: r, g: g, b: b};
}

function colorToString(c) {
    return `rgb(${c.r}, ${c.g}, ${c.b})`;
}

function getColor(index, sequenceLength) {
    const c1Index = Math.floor(index / sequenceLength);
    const c2Index = Math.min(4, Math.ceil(index / sequenceLength));
    const ratio = (index / sequenceLength) - c1Index;
    return colorToString(gradient(colors[c1Index], colors[c2Index], ratio));
}

function getElements(text) {
    const sequenceLength = text.length / colors.length;
    return text.split('').map(function (c, i) {
        const span = document.createElement('span');
        if (sequenceLength <= 1) {
            span.style.color = colorToString(colors[i]);
        } else {
            span.style.color = getColor(i, sequenceLength);
        }
        span.innerText = c;
        return span;
    });
}

const initialBannerText = 'JavaScript gradient text color demo';
const bannerTextElement = document.getElementById('banner-text');
getElements(initialBannerText).forEach(function (e) {
    bannerTextElement.appendChild(e);
});

const inputTextElement = document.getElementById('input-text');

inputTextElement.addEventListener('input', function () {
    let s = inputTextElement.value;
    if (s.length === 0) {
        s = initialBannerText;
    }
    bannerTextElement.textContent = '';
    getElements(s).forEach(function (e) {
        bannerTextElement.appendChild(e);
    });
});