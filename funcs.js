let placeImagesInGrid = async (normalImage, differentImage, rows, cols, titleHeight, padx, pady) => {
    // img.src = "https://images.genius.com/e9005e4fca598448862e6dba9eb4370f.1000x1000x1.png";

    let placeableWidth = canvas.width - 2 * padx;
    let placeableHeight = canvas.height - titleHeight - 2 * pady;

    let imgRatio = normalImage.width / normalImage.height;

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

    let placeOffsetX = Math.round(padx + (placeableWidth - fullWidth) / 2);
    let placeOffsetY = Math.round(titleHeight + pady + (placeableHeight - fullHeight) / 2);
    let differentImageCoordinates = generateRandomCoordinate(rows, cols);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let placePosX = Math.round((newImageWidth + padx) * x);
            let placePosY = Math.round((newImageHeight + pady) * y);
            if (x == differentImageCoordinates.x && y == differentImageCoordinates.y) {
                ctx.drawImage(differentImage, placeOffsetX + placePosX, placeOffsetY + placePosY, newImageWidth, newImageHeight);
            } else {
                ctx.drawImage(normalImage, placeOffsetX + placePosX, placeOffsetY + placePosY, newImageWidth, newImageHeight);
            }
        }
    }
};

let generateRandomCoordinate = (amountOfRows, amountOfCols) => {
    const x = Math.floor(Math.random() * amountOfCols);
    const y = Math.floor(Math.random() * amountOfRows);

    return { x, y };
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
