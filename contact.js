document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submit-btn");
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    showModal();
  });
  const closeButton = document.getElementsByClassName("btn-close");
  closeButton[0].addEventListener("click", function (event) {
    alert("Message not sent. Reason: Closed captcha window.");
    location.reload();
  });
});

function showModal() {
  const verifyModal = new bootstrap.Modal(document.getElementById("verify-modal"));
  verifyModal.show();
}

window.onload = function () {
  function captchaCompleted() {
    const modal = document.getElementById('verify-modal');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    if (bootstrapModal) {
      bootstrapModal.hide();
    }
    alert("We've got your message, and we will reply in the next 3 weekdays.");
    location.reload();
  }
  window.captchaCompleted = captchaCompleted;
};