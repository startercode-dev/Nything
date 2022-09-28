import $ from 'jquery';
import { apiConnect } from './helper.js';

class Populate {
  async updatePost() {
    const postId = window.location.pathname.split('/')[3];
    const { post } = await apiConnect(
      'GET',
      `/api/v1/posts/${postId}`,
      {},
      undefined,
      undefined
    );
    const { forum, title, paragraph } = post;

    $('#forumsSelect').val(forum._id);
    $('.title-input').val(title);
    $('#paragraph').val(paragraph);
  }

  async forumSelect() {
    const forumData = await apiConnect(
      'GET',
      '/api/v1/forums?sort=forum',
      {},
      undefined,
      undefined
    );

    $(forumData.data).each((i, r) => {
      $('#forumsSelect').append(`<option value="${r._id}">${r.forum}</option>`);
    });
  }
}

module.exports = new Populate();
