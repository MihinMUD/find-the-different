let placeImagesInGrid = async (normalImage, differentImage, gridRect, padRect, titleHeight) => {

	let placeableRect = {
		x:canvas.width - 2 * padRect.x,
		y:canvas.height - titleHeight - 2 * padRect.y,

	} 

	// we first assume the width will fit perfectly while the height fits with space left.
	let newImageSize = getNewImageRect(normalImage, placeableRect, gridRect, padRect)

	let allImagesSize = {
		x: (newImageSize.x + padRect.x) * gridRect.x - padRect.x,
		y: (newImageSize.y + padRect.y) * gridRect.y - padRect.y
	}

	const placeOffset = {
		x : Math.round(padRect.x + (placeableRect.x - allImagesSize.x) / 2),
		y: Math.round(titleHeight + padRect.y + (placeableRect.y - allImagesSize.y) / 2),
	}

	const differentImageCoordinates = generateRandomCoordinate(gridRect);

	for (let y = 0; y < gridRect.y; y++) {
		for (let x = 0; x < gridRect.x; x++) {
			let placePosX = Math.round((newImageSize.x + padRect.x) * x);
			let placePosY = Math.round((newImageSize.y + padRect.y) * y);
			if (x == differentImageCoordinates.x && y == differentImageCoordinates.y) {
				ctx.drawImage(differentImage, placeOffset.x + placePosX, placeOffset.y + placePosY, newImageSize.x, newImageSize.y);
			} else {
				ctx.drawImage(normalImage, placeOffset.x + placePosX, placeOffset.y + placePosY, newImageSize.x, newImageSize.y);
			}
		}
	}
};

let getNewImageRect = (img, placeableRect, gridRect, padRect) => {
	// gridRect x == amount of columns and y == gridRect.x
	let imgRatio = img.width / img.height;
	let size = {
		x: placeableRect.x / gridRect.x - padRect.x, 
	}

	size.y = size.x / imgRatio

	if (size.y> placeableRect.y / gridRect.y - padRect.y) {
		size.y = placeableRect.y / gridRect.y - padRect.y,
		size.x = size.y * imgRatio
	}
	return size
}

let generateRandomCoordinate = (gridRect) => {
	return {
		x: Math.floor(Math.random() * gridRect.x),
		y: Math.floor(Math.random() * gridRect.y)

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
