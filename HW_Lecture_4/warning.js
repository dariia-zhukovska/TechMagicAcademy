class WarningMessage {
  constructor() {
    this.errorMsgContainer = document.querySelector(".error-msg");
  }

  displayWarningMsg(msg, delay = 5000) {
    this.errorMsgContainer.innerHTML = msg;
    setTimeout(() => {
      this.errorMsgContainer.innerHTML = "";
    }, delay);
  }
}

export default WarningMessage;
