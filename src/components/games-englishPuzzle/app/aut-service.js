import { startwindow } from "./components/start-window/start-window.js";

class AutService {
  async registration(user) {
    const rawResponse = await fetch(
      "https://afternoon-falls-25894.herokuapp.com/users",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    const content = await rawResponse.json();

    try {
      if (content.id) {
        startwindow.init();
      }
    } catch (error) {}
  }

  async login(user) {
    const rawResponse = await fetch(
      "https://afternoon-falls-25894.herokuapp.com/signin",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    const content = await rawResponse.json();

    try {
      if (content.token) {
        startwindow.init();
      }
    } catch (error) {}
  }
}

export const autService = new AutService();
