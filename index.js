const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");
const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");
const sliderText = document.getElementById("sliderText");
const slider = document.getElementById("slider");
const lightenTxt = document.getElementById("lightenTxt");
const darkenTxt = document.getElementById("darkenTxt");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener('click', () =>{
    if(toggleBtn.classList.contains('toggled')){
        toggleBtn.classList.remove('toggled');
        lightenTxt.classList.remove('unselected');
        darkenTxt.classList.add('unselected');
    } else {
        toggleBtn.classList.add('toggled');
        lightenTxt.classList.add('unselected');
        darkenTxt.classList.remove('unselected');
    }
    reset();
})

hexInput.addEventListener('keyup', () => {
    const hex = hexInput.value;
    if(!isValidHex(hex)) return;

    const strippedHex = hex.replace('#', '');
    inputColor.style.backgroundColor = "#" + strippedHex;
    reset();
})


const isValidHex = (hex) => {
    if(!hex) return false;

    let strippedHex = hex.replace('#', '');
    
    return strippedHex.length === 3 || strippedHex.length === 6;

}


const convertHexToRgb = (hex) => {
    if(!isValidHex(hex)) return null;

    let strippedHex = hex.replace('#', '');

    if(strippedHex.length ===3){
        strippedHex = strippedHex[0] + strippedHex[0] +
        strippedHex[1] + strippedHex[1] +
        strippedHex[2] + strippedHex[2];
    }
    
    const r = parseInt(strippedHex.substring(0,2), 16);
    const g = parseInt(strippedHex.substring(2,4), 16);
    const b = parseInt(strippedHex.substring(4,6), 16);

    return {r, g, b};
}


const convertRGBtoHex = (r, g, b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);

    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
}

const alterColor = (hex, percentage) => {
    const {r, g, b} = convertHexToRgb(hex);

    const amount = Math.floor((percentage/100) * 255);

    const newR = convertToValidRange(r,amount);
    const newG = convertToValidRange(g,amount);
    const newB = convertToValidRange(b,amount);

    return convertRGBtoHex(newR, newG, newB);
}

const convertToValidRange = (color, amount) => {
    const newColor = color + amount;
    if(newColor>255) return 255;
    if(newColor<0) return 0;
    return newColor;
}

slider.addEventListener('input', () => {
    if(!isValidHex(hexInput.value)) return;

    sliderText.textContent = `${slider.value}%`;

    const valueAddition = toggleBtn.classList.contains('toggled') ? -slider.value : slider.value;

    const alteredHex = alterColor(hexInput.value, valueAddition);
    alteredColor.style.backgroundColor = alteredHex;
    alteredColorText.innerText = `Altered Color  ${alteredHex}`
})

const reset = () => {
    slider.value = 0;
    sliderText.innerText = `0%`;
    alteredColor.style.backgroundColor = hexInput.value;
    alteredColorText.innerText = `Altered Color ${hexInput.value}`;
}