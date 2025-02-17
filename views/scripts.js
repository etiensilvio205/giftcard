// Don't need any custom config?:
//import Module from "https://esm.sh/@vercel/postgres@0.7.2";
//import { createPool } from 'https://esm.sh/pg@8.11.3';
//import domtoimage from 'https://esm.sh/dom-to-image@2.6.0'
//import google from 'https://esm.sh/googleapis@133.0.0'
//import 'https://esm.sh/googleapis-common@7.0.1'
//import 'https://esm.sh/google-auth-library@9.6.3'


function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to open the pop-up form
document.getElementById("openFormButton").addEventListener("click", function() {
    document.getElementById("myForm").style.display = "block";
});

// Function to close the pop-up form
document.getElementById("closeFormButton").addEventListener("click", function() {
    document.getElementById("myForm").style.display = "none";
});

// Function to generate the coupon
document.getElementById("generateCouponButton").addEventListener("click", function() {
    const receiver = document.getElementById("receiver").value;
    const issuer = document.getElementById("issuer").value;
    const meetingDate = document.getElementById("meeting-date").value;
    const leader = document.getElementById("leader").value;

    const headerDiv = document.getElementById('coupon-header');
    headerDiv.textContent = receiver;

    const couponCode = generateRandomString(8);
    const qrtext = `Receiver: ${receiver}, Issuer: ${issuer}, Meeting Date: ${meetingDate}, Leader: ${leader}, Coupon Code: ${couponCode}`;
    const qrCodeAPI = `https://api.qrserver.com/v1/create-qr-code/?data=${qrtext}&size=200x200`;

    const qrCodeDiv = document.getElementById('qr-code');
    qrCodeDiv.innerHTML = `<img src="${qrCodeAPI}" alt="QR Code">`;

    document.getElementById("myForm").style.display = "none";

});



// Function to download the coupon
document.getElementById("downloadCouponButton").addEventListener("click", function() {
    const couponContainer = document.getElementById('coupon-container');
    domtoimage.toBlob(couponContainer)
        .then(function(blob) {
            const link = document.createElement('a');
            link.download = 'coupon.jpg';
            link.href = URL.createObjectURL(blob);
            link.click();
            document.head.removeChild(style);
        });
});




// Function to set the background image (if needed)
function setBackgroundImage() {
    const backgroundImage = document.getElementById('background-image');
    backgroundImage.style.display = 'block';
    backgroundImage.src = "invite.jpeg";
}


setBackgroundImage(); // Call the function to set the background image


