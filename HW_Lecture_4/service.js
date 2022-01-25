import errorHandler from "./error.js";
const domain = "https://jsonplaceholder.typicode.com";

export const get = async (url) => {
  // outer Lexical Environment
  return errorHandler.handle(async () => {
    // inner Lexical Environment
    const response = await fetch(`${domain}${url}`);
    if (response.ok) {
      return await response.json();
    }
    throw {
      status: response.status,
      result: [],
    };
  });
};

export const put = async (url, body) => {
  return errorHandler.handle(async () => {
    const response = await fetch(`${domain}${url}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response.ok) {
      return await response.json();
    }
    throw {
      status: response.status,
      result: {},
    };
  });
};

export const post = async (url, body) => {
  return errorHandler.handle(async () => {
    const response = await fetch(`${domain}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response.ok) {
      return await response.json();
    }
    throw {
      status: response.status,
    };
  });
};
