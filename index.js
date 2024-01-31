const canvas = document.getElementById("canvas");
const generateButton = document.getElementById("generate");
const downloadButton = document.getElementById("download");

const imageInputField = document.getElementById("inputImage");
const diffImageInputField = document.getElementById("diffInputImage");

const titleText = document.getElementById("titleText");
const titleHeight = document.getElementById("titleHeight");
const titleColor = document.getElementById("titleColor");
const titleBgColor = document.getElementById("titleBgColor");
const bgColor = document.getElementById("bgColor");

const inputFields = document.querySelectorAll(".inputField");
const imageFields = document.querySelectorAll(".imageField");

const resolutionXField = document.getElementById("resolutionX");
const resolutionYField = document.getElementById("resolutionY");

const padXField = document.getElementById("padX");
const padYField = document.getElementById("padY");

const columnsField = document.getElementById("columnsField");
const rowsField = document.getElementById("rowsField");

let ctx = canvas.getContext("2d");

let img = new Image();
let diffImg = new Image();

let startGenerating = false;

const reGenerate = () => {
	if (startGenerating) {
		canvas.width = resolutionXField.value;
		canvas.height = resolutionYField.value;
		ctx = canvas.getContext("2d");
		ctx.fillStyle = bgColor.value;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		const gridRect = {
			x: Number(columnsField.value),
			y: Number(rowsField.value)
		}

		const padRect = {
			x: Number(padX.value),
			y: Number(padY.value)
		}

		drawTitle(titleText.value, titleColor.value, titleBgColor.value, Number(titleHeight.value));
		placeImagesInGrid(img, diffImg, gridRect, padRect, Number(titleHeight.value));
	}
};

imageFields.forEach((element) => {
	element.addEventListener("input", async () => {
		img.src = URL.createObjectURL(imageInputField.files[0]);
		diffImg.src = URL.createObjectURL(diffImageInputField.files[0]);

		await img.decode();
		await diffImg.decode();

		reGenerate();
	});
});

inputFields.forEach((element) => {
	element.addEventListener("input", reGenerate);
});

generateButton.addEventListener("click", () => {
	startGenerating = true;
	reGenerate();
});

downloadButton.addEventListener("click", () => {
	const link = document.createElement("a");
	link.download = titleText.value;
	link.href = canvas.toDataURL();
	link.click();
});
