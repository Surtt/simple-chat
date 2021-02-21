import 'bootstrap';
import onChange from 'on-change';

export default () => {
  const state = {
    form: {
      name: '',
    },
  };

  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.name':
        console.log(value);
        break;
      default:
        break;
    }
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    watchedState.form.name = name;
  });
};
