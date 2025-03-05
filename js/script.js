const url_inp = document.querySelector("input"),
    res = document.querySelector(".result"),
    img = document.querySelector(".QRimg"),
    generate_btn = document.querySelector(".generate"),
    download_btn = document.querySelector(".download");

setInterval(() => {
    if (url_inp.checkValidity() == true) {
        generate_btn.classList.add("valid");
    } else {
        generate_btn.classList.remove("valid");
    }
}, 500);

const generate = () => {
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${url_inp.value}`;

    res.classList.add("box");

    if (img.src.length > 0) {
        download_btn.classList.add("valid");
    }
};

const download = () => {
    fetch(img.src)
        .then((response) => response.blob())

        .then((blob) => {
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "QR-kod-makemeaqr.png";

            document.body.appendChild(a);

            a.click();

            document.body.removeChild(a);
            

        })

        .catch((error) => console.error("QR kodni yuklashda xato:", error));
};
