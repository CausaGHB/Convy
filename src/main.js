const { invoke } = window.__TAURI__.tauri;
const { save } = window.__TAURI__.dialog;

const inpChoose = document.getElementById('low');
const fileInput = document.querySelector('#file-upload');
const form = document.querySelector('#form');
const optFileElements = document.getElementsByClassName('opt-file');
const inpT = false

fileInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        inpChoose.value = selectedFile.name;
    }
});

const translations = {
    en: {
      "Image Converter": "Image Converter",
      "Choose File": "Choose File",
      "Width": "Width:",
      "Height": "Height:",
      "Preserve Aspect Ratio": "Preserve Aspect Ratio:",
      "Convert": "Convert",
      "ConvertMsg": "Conversion completed!",
      "Converting...":"Converting..."
    },
    es: {
      "Image Converter": "Conversion de imagenes",
      "Choose File": "Elegir Archivo",
      "Width": "Ancho:",
      "Height": "Alto:",
      "Preserve Aspect Ratio": "Mantener Proporción de Aspecto:",
      "Convert": "Convertir",
      "ConvertMsg": "Conversion lista!",
      "Converting...": "Convirtiendo"
    }
};

document.getElementById('language-select').addEventListener('change', (event) => {
    const language = event.target.value;
    localStorage.setItem('language', language);
    const t = translations[language];
    console.log(language)
    const img = document.querySelector('img')
    const inp = document.getElementById('low')
    if (language == "es") {
        img.style.marginTop = '6px'
        inp.style.marginTop = '5.3rem'
    } else {
        img.style.marginTop = '62px'
        inp.style.marginTop = '8.8rem'
    }

    document.querySelector('h1').textContent = t['Image Converter'];
    document.getElementById('btn-choose').textContent = t['Choose File'];
    document.querySelector('label[for="width-input"]').textContent = t['Width'];
    document.querySelector('label[for="height-input"]').textContent = t['Height'];
    document.querySelector('label[for="aspect-ratio-checkbox"]').textContent = t['Preserve Aspect Ratio'];
    document.getElementById('btn-submit').textContent = t['Convert'];

    if (inp.value === translations.en["ConvertMsg"] || inp.value === translations.es["ConvertMsg"]) {
        inp.value = t["ConvertMsg"];
        inpT = true
    }
});

const btnChoose = document.querySelector('#btn-choose');

btnChoose.addEventListener('click', () => {
  inpChoose.value = ""
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const img = document.querySelector('img');
    const low = document.querySelector('#low');
    img.classList.add('jump1');
    low.classList.add('jump2');

    setTimeout(() => {
        img.classList.remove('jump1');
        low.classList.remove('jump2');
    }, 500);

    const fileInput = document.querySelector('#file-upload');
    const formatSelect = document.querySelector('#format-select');
    const widthInput = document.querySelector('#width-input');
    const heightInput = document.querySelector('#height-input');
    const aspectRatioCheckbox = document.querySelector('#aspect-ratio-checkbox');
    const file = fileInput.files[0];

    if (file) {
        try {
            console.log("Selected file name:", file.name);
            inpChoose.value = file.name
            const reader = new FileReader();
            reader.onload = async (event) => {
                const arrayBuffer = event.target.result;
                const savePath = await save({
                    filters: [{ name: formatSelect.value.toUpperCase(), extensions: [formatSelect.value] }],
                    defaultPath: ''
                });
                if (savePath) {
                    const width = parseInt(widthInput.value);
                    const height = parseInt(heightInput.value);
                    const aspectRatio = aspectRatioCheckbox.checked;

                    if (aspectRatio) {
                        const img = new Image();
                        img.src = URL.createObjectURL(file);
                        img.onload = () => {
                            const imgWidth = img.width;
                            const imgHeight = img.height;
                            const imgAspectRatio = imgWidth / imgHeight;
                            if (width && !height) {
                                heightInput.value = Math.round(width / imgAspectRatio);
                            } else if (!width && height) {
                                widthInput.value = Math.round(height * imgAspectRatio);
                            }
                            convertAndSaveImage(arrayBuffer, formatSelect.value, widthInput.value, heightInput.value, savePath);
                        };
                    } else {
                        convertAndSaveImage(arrayBuffer, formatSelect.value, width, height, savePath);
                    }
                }
            };
            reader.readAsArrayBuffer(file);
        } catch (e) {
            console.error(`Error invoking convert_image command: ${e}`);
        }
    }
});


async function convertAndSaveImage(arrayBuffer, format, width, height, savePath) {
    try {
      console.log("Converting and saving image...");
      const languageSelect = document.querySelector('#language-select');
      const language = languageSelect.value;
      const t = translations[language];
      inpChoose.value = t["Converting..."];
      const widthInput = document.querySelector('#width-input');
      const heightInput = document.querySelector('#height-input');
      if (format === 'ico') {
        if (width > 256 || height > 256) {
          widthInput.value = 256
          heightInput.value = 256
        }
        width = Math.min(width, 256);
        height = Math.min(height, 256);
      }

      await invoke('convert_image', {
        arrayBuffer: Array.from(new Uint8Array(arrayBuffer)),
        format,
        width: parseInt(width),
        height: parseInt(height),
        savePath
      });

      console.log("Image conversion completed.");
      inpChoose.value = t["ConvertMsg"];
    } catch (e) {
      console.error(`Error invoking convert_image command: ${e}`);
    }
}

function initLanguage() {
    const language = localStorage.getItem('language');
    if (language) {
        const languageSelect = document.getElementById('language-select');
        languageSelect.value = language;
        languageSelect.dispatchEvent(new Event('change'))
    }
}
initLanguage();