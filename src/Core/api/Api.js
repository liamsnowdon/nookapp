import axios from 'axios';

class Api {
  static get $instance () {
    if (!Api.instance) {
      Api.instance = new Api();
    }

    return Api.instance;
  }

  static url (url, params) {
    if (!params) {
      return url;
    }

    Object.keys(params).forEach((param) => {
      if ({}.hasOwnProperty.call(params, param)) {
        url = url.replace(
          new RegExp(`:${param}`, 'g'),
          params[param],
        );
      }
    });

    return url;
  }

  async request (config) {
    try {
      return await axios.request(config);
    } catch (e) {
      return e.response;
    }
  }

  async get (url, params = {}) {
    return this.request({
      method: 'GET',
      url,
      ...params,
    });
  }

  async post (url, data, params = {}) {
    return this.request({
      method: 'POST',
      url,
      data,
      ...params,
    });
  }

  async put (url, data, params = {}) {
    return this.request({
      method: 'PUT',
      url,
      data,
      ...params,
    });
  }

  async patch (url, data, params = {}) {
    return this.request({
      method: 'PATCH',
      url,
      data,
      ...params,
    });
  }

  async delete (url, params = {}) {
    return this.request({
      method: 'DELETE',
      url,
      ...params,
    });
  }
}

export default Api;
