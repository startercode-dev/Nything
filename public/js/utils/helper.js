import $ from 'jquery';
import axios from 'axios';

export const eventRoute = (selector, action, fn, condition) => {
  //Checks if selector exist and creates route from event trigger to function execution
  const exist = $(selector).length > 0;
  const conditionValidation = condition !== undefined ? condition : true;
  if (exist && conditionValidation) {
    $(selector).on(action, (e) => {
      e.preventDefault();

      return fn(e);
    });
  }
};

export const apiConnect = async (method, url, data, alertMessage, redirect) => {
  //Runs API endpoint based on the given argument (provides alert message and page redirect)
  try {
    const res = await axios({
      method,
      url,
      data,
    });

    if (res.data.status === 'success' || !res) {
      if (alertMessage) alert(alertMessage);
      window.setTimeout(() => {
        if (redirect == 'reload') return location.reload();
        if (!redirect) return;
        location.assign(redirect);
      }, 500);
      return res.data.data;
    }
  } catch (err) {
    alert(err);
  }
};

export const formData = (target) => {
  //Convert form data into an object
  const data = new FormData(target);
  return Object.fromEntries(data);
};
