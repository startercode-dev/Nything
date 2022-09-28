import $ from 'jquery';
import { apiConnect, formData } from './helper.js';

class Action {
  login(e) {
    apiConnect(
      'POST',
      '/api/v1/users/login',
      formData(e.target),
      'Logged in successfully!',
      '/'
    );
  }

  logout() {
    apiConnect('GET', '/api/v1/users/logout', {}, undefined, '/');
  }

  signup(e) {
    apiConnect(
      'POST',
      '/api/v1/users/signup',
      formData(e.target),
      'Signup successful',
      '/'
    );
  }

  popularPost(e) {
    //Clicking on popular post in home page
    const cTarget = $(e.currentTarget);
    const id = cTarget[0].dataset.id;
    location.href = `/post/${id}`;
  }

  myPostItems(e) {
    //Clicking on one of my post
    const target = $(e.target);
    const postId = $(e.currentTarget)[0].dataset.id;
    if (target.hasClass('my-posts-title'))
      return location.assign(`/post/${postId}`);

    if (target.hasClass('my-post-icons--delete')) {
      return apiConnect(
        'DELETE',
        `/api/v1/posts/${postId}`,
        {},
        'Post deleted successfully!',
        'reload'
      );
    }
    if (target.hasClass('my-post-icons--edit'))
      return location.assign(`/post/update/${postId}`);
  }

  newComment(e) {
    const postId = window.location.pathname.split('/')[2];

    apiConnect(
      'POST',
      `/api/v1/posts/${postId}/comments`,
      formData(e.target),
      'You have successfully commented on this post',
      'reload'
    );
  }

  changePassword(e) {
    apiConnect(
      'PATCH',
      '/api/v1/users/updatePassword',
      formData(e.target),
      'You have successfully updated your password',
      '/'
    );
  }

  accountSettings(e) {
    apiConnect(
      'PATCH',
      '/api/v1/users/updateMe',
      formData(e.target),
      'You have successfully updated your settings',
      '/'
    );
  }

  forgotPassword(e) {
    apiConnect(
      'POST',
      '/api/v1/users/forgotPassword',
      formData(e.target),
      'A reset link was successfully sent to your email',
      '/'
    );
  }

  resetPassword(e) {
    const token = window.location.pathname.split('/')[2];

    apiConnect(
      'PATCH',
      `/api/v1/users/resetPassword/${token}`,
      formData(e.target),
      'You have successfuly reset your password',
      '/'
    );
  }

  createPost(e) {
    apiConnect(
      'POST',
      '/api/v1/posts',
      formData(e.target),
      'Thank you for making a post!',
      '/'
    );
  }

  updatePost() {
    const postId = window.location.pathname.split('/')[3];

    apiConnect(
      'PATCH',
      `/api/v1/posts/${postId}`,
      formData(e.target),
      'Post has been successfully updated',
      '/'
    );
  }
}

module.exports = new Action();
