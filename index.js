let imageInputField = document.getElementById("inputImage");
let generateButton = document.getElementById("generate");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let img = new Image();

generateButton.addEventListener("click", async () => {
    img.src = URL.createObjectURL(imageInputField.files[0]);
    // img.addEventListener("load", () => {
    //     ctx.drawImage(img, 0, 0);
    // });
    drawTitle("Title", "#fff", "#0A0", 180);
    placeImgInGrid(img, 8, 10, 180, 20, 20);
});

let placeImgInGrid = async (img, rows, cols, titleHeight, padx, pady) => {
    // img.src = "https://images.genius.com/e9005e4fca598448862e6dba9eb4370f.1000x1000x1.png";

    // waits for the image to load.
    await img.decode();

    let placeableWidth = canvas.width - 2 * padx;
    let placeableHeight = canvas.height - titleHeight - 2 * pady;

    let imgRatio = img.width / img.height;

    // we first assume the width will fit perfectly while the height fits with space left.
    let newImageWidth = placeableWidth / cols - padx;
    let newImageHeight = newImageWidth / imgRatio;

    // then we see if height will cut off. if yes we set it the other way around
    if (newImageHeight > placeableHeight / rows - pady) {
        newImageHeight = placeableHeight / rows - pady;
        newImageWidth = newImageHeight * imgRatio;
    }

    let fullWidth = (newImageWidth + padx) * cols - padx;
    let fullHeight = (newImageHeight + pady) * rows - pady;

    let placeOffsetX = padx + (placeableWidth - fullWidth) / 2;
    let placeOffsetY = pady + (placeableHeight - fullHeight) / 2;
    console.log(placeOffsetY);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let placePosX = (newImageWidth + padx) * x;
            let placePosY = (newImageHeight + pady) * y;

            ctx.drawImage(img, placeOffsetX + placePosX, placeOffsetY + titleHeight + placePosY, newImageWidth, newImageHeight);
        }
    }
};

let drawTitle = (title, titleColor, bgColor, bgHeight) => {
    let fontSize = (bgHeight * 8) / 10;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, bgHeight);
    ctx.fillStyle = titleColor;
    ctx.font = `${fontSize}px sans`;
    ctx.textAlign = "center";
    ctx.fillText(title, canvas.width * 0.5, bgHeight - bgHeight / 2 + fontSize / 3);
};
