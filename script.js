// Hàm mã hoá: đảo ngược chuỗi và chia thành các cặp
function encodeText() {
  const input = document.getElementById("inputText").value;
  const method = document.getElementById("method").value;
  let result = "";

  if (method === "base64") {
    result = btoa(unescape(encodeURIComponent(input)));
  } else if (method === "caesar") {
    result = input.split("").map(char => shiftChar(char, 3)).join("");
  } else if (method === "reverse") {
    result = input.split("").reverse().join("");
  } else if (method === "reverse-chunk") {
    result = input
      .split("")
      .reverse()
      .join("")
      .match(/.{1,2}/g)
      .join(",");
  } else if (method === "custom") {
    // Phương thức của bạn: Đảo ngược chuỗi và chia thành cặp
    result = input.split('').reverse().join('').match(/.{1,2}/g).join(',');
  }

  document.getElementById("outputText").textContent = result;
  document.getElementById("copyMessage").style.visibility = "hidden"; // Ẩn thông báo sao chép sau khi mã hoá
}

// Hàm giải mã: nối các cặp ký tự và đảo ngược lại chuỗi
function decodeText() {
  const input = document.getElementById("inputText").value;
  const method = document.getElementById("method").value;
  let result = "";

  if (method === "base64") {
    try {
      result = decodeURIComponent(escape(atob(input)));
    } catch (e) {
      result = "⚠️ Không thể giải mã Base64.";
    }
  } else if (method === "caesar") {
    result = input.split("").map(char => shiftChar(char, -3)).join("");
  } else if (method === "reverse") {
    result = input.split("").reverse().join("");
  } else if (method === "reverse-chunk") {
    result = input
      .split(",")
      .join("")
      .split("")
      .reverse()
      .join("");
  } else if (method === "custom") {
    // Giải mã cho phương thức của bạn: nối các cặp và đảo ngược lại chuỗi
    result = input
      .split(",")
      .join("") // Nối các cặp lại thành chuỗi
      .split("")
      .reverse() // Đảo ngược lại chuỗi
      .join("");
  }

  document.getElementById("outputText").textContent = result;
  document.getElementById("copyMessage").style.visibility = "hidden"; // Ẩn thông báo sao chép sau khi giải mã
}

// Hàm dịch chuyển ký tự theo bảng chữ cái Caesar Cipher
function shiftChar(char, shift) {
  const code = char.charCodeAt(0);
  if (char >= 'a' && char <= 'z') {
    return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
  } else if (char >= 'A' && char <= 'Z') {
    return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
  } else {
    return char;
  }
}

// Tính năng copy khi nhấn vào output
document.getElementById("outputText").addEventListener("click", function (e) {
  const range = document.createRange();
  range.selectNodeContents(this);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  try {
    document.execCommand("copy");

    // Lấy vị trí con trỏ chuột
    const x = e.pageX;
    const y = e.pageY;

    const copyMessage = document.getElementById("copyMessage");
    copyMessage.textContent = "Copied!";
    copyMessage.style.left = `${x + 10}px`;
    copyMessage.style.top = `${y + 10}px`;
    copyMessage.style.visibility = "visible"; // Hiện thông báo "Copied!"

    // Ẩn thông báo sau 2 giây
    setTimeout(function () {
      copyMessage.style.visibility = "hidden";
    }, 2000);
  } catch (err) {
    const copyMessage = document.getElementById("copyMessage");
    copyMessage.textContent = "Không thể copy. Hãy dùng Ctrl+C.";
    copyMessage.style.left = `${e.pageX + 10}px`;
    copyMessage.style.top = `${e.pageY + 10}px`;
    copyMessage.style.visibility = "visible"; // Hiện thông báo "Không thể copy"

    // Ẩn thông báo sau 2 giây
    setTimeout(function () {
      copyMessage.style.visibility = "hidden";
    }, 2000);
  }
});
