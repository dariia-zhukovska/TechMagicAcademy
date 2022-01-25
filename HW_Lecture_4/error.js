import WarningMessage from "./warning.js";

class ErrorHandler extends WarningMessage {
  constructor() {
    super();
  }

  async handle(fn) {
    let result;
    try {
      result = await fn();
    } catch (err) {
      console.log(err);
      result = err.result;
      this.displayWarningMsg("Error: " + err.status);
    }
    return result;
  }
}

const errorHandler = new ErrorHandler();

export default errorHandler;
