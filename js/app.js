document.addEventListener('DOMContentLoaded', function () {
    const html5QrCode = new Html5Qrcode("reader");
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        handleQRCode(decodedText);
    };
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);

    function handleQRCode(qrData) {
        try {
            const attendeeData = JSON.parse(qrData);
            const attendee = attendees.find(a => a.email === attendeeData.email);

            if (attendee) {
                if (!attendee.checkedIn) {
                    attendee.checkedIn = true;
                    updateAttendeesList();
                    displayResult(`Welcome, ${attendee.name}! You've been checked in.`, 'success');
                } else {
                    displayResult(`${attendee.name} has already checked in.`, 'warning');
                }
            } else {
                displayResult('Attendee not found.', 'danger');
            }
        } catch (error) {
            console.error('Error parsing QR code data:', error);
            displayResult('Invalid QR code.', 'danger');
        }
    }

    function displayResult(message, type) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }

    function updateAttendeesList() {
        localStorage.setItem('attendees', JSON.stringify(attendees));
    }
});