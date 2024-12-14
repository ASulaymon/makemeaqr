const text = document.querySelector("input"),
    res = document.querySelector(".result"),
    img = document.querySelector(".QRimg"),
    buttons = document.querySelectorAll(".btn"),
    label = document.querySelector(".label"),
    totext_link = document.querySelector(".totext_link");

setInterval(() => {
    buttons.forEach((btn) => {
        if (text.checkValidity() == true) {
            btn.classList.add("valid");
        } else {
            btn.classList.remove("valid");
        }
    });
}, 500);

const checkvalid = () => {
    const input = text.value.trim();
    let url;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;
    const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;

    if (emailPattern.test(input)) {
        return true;
    }

    if (domainPattern.test(input)) {
        url = `http://${input}`;
    } else if (input.startsWith("http://") || input.startsWith("https://")) {
        url = input;
    } else {
        return false;
    }

    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

let value = text.value.trim();

const generate = () => {
    if (text.value.length > 0) {
        if (checkvalid()) {
            img.src = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${text.value}`;

            res.classList.add("box");
        } else {
            alert("Iltimos, URL kiriting");
        }
    } else {
        alert("Iltimos to'ldiring");
    }
};

const download = () => {
    fetch(img.src)
        .then((response) => response.blob())

        .then((blob) => {
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "QR-kod.png";

            document.body.appendChild(a);

            a.click();

            document.body.removeChild(a);
        })

        .catch((error) => console.error("QR kodni yuklashda xato:", error));
};
