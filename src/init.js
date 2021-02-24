import "bootstrap";
import onChange from "on-change";
import axios from 'axios';

const routes = {
  posts: () => "https://jsonplaceholder.typicode.com/posts",
};

const sendMessage = async (username, message) => {
  const response = await axios.post(routes.posts(), { username, message });
  console.log(response);
};

const showContainer = (container, mustShow) => {
  if (mustShow) {
    container.classList.remove('d-none');
  } else {
    container.classList.add('d-none');
  }
};

export default () => {
  const state = {
    user: {
      isRegistered: false,
      name: "",
      messagesHistory: [],
    },
    inputMessageForm: {
      fields: {
        message: "",
      },
    },
  };

  const messageElement = {
    container: document.querySelector("#input-message-box"),
    form: document.querySelector("#input-message-box > form"),
    input: document.querySelector("#input-message-box > form input"),
  };

  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case "user.name":
        console.log(value);
        break;

      case "user.isRegistered":
        showContainer(messageElement.container, value);
        break;

      case "inputMessageForm.fields.message":
        console.log(value);
        break;

      default:
        break;
    }
  });

  const registrationForm = document.querySelector("#registration-box");
  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    watchedState.user.name = name;
    watchedState.user.isRegistered = true;
  });

  messageElement.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const message = formData.get("name");

    try {
      sendMessage(state.user.name, message);

      watchedState.inputMessageForm.fields.message = message;
      watchedState.user.messagesHistory.push(message);

      messageElement.form.reset();
      messageElement.input.focus();
    } catch (err) {
      console.log(err.message);
    }
  });
};
