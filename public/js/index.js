/* eslint-disable */

import '@babel/polyfill';
import $ from 'jquery';

import Action from './utils/eventActions.js';
import Populate from './utils/populate.js';
import { eventRoute } from './utils/helper.js';

$(document).ready(async () => {
  //EVENT ROUTES
  eventRoute('.login-form', 'submit', Action.login);
  eventRoute('.nav-logout', 'click', Action.logout);
  eventRoute('.signup-form', 'submit', Action.signup);
  eventRoute('.popular-post-box', 'click', Action.popularPost);
  eventRoute('.my-posts-item', 'click', Action.myPostItems);
  eventRoute('.comment-form', 'submit', Action.newComment);
  eventRoute('.form--passwordChange', 'submit', Action.changePassword);
  eventRoute('.form--account-settings', 'submit', Action.accountSettings);
  eventRoute('.form--forgotPassword', 'submit', Action.forgotPassword);
  eventRoute('.form--resetPassword', 'submit', Action.resetPassword);
  eventRoute(
    '.section-createPost',
    'submit',
    Action.createPost,
    window.location.pathname.startsWith('/post/create')
  );
  eventRoute(
    '.section-createPost',
    'submit',
    Action.updatePost,
    window.location.pathname.startsWith('/post/update')
  );

  //POPULATES
  if (window.location.pathname.startsWith('/post/update')) {
    Populate.updatePost();
  }
  if ($('#forumsSelect').length > 0) {
    Populate.forumSelect();
  }
});
