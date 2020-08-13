import axios from 'axios';

const defaultParams = {
  timeout: 5000,
};

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
      throw e.response;
    }
  }

  async get (url, params = {}) {
    return this.request({
      method: 'GET',
      url,
      ...defaultParams,
      ...params,
    });
  }

  async post (url, data, params = {}) {
    return this.request({
      method: 'POST',
      url,
      data,
      ...defaultParams,
      ...params,
    });
  }

  async put (url, data, params = {}) {
    return this.request({
      method: 'PUT',
      url,
      data,
      ...defaultParams,
      ...params,
    });
  }

  async patch (url, data, params = {}) {
    return this.request({
      method: 'PATCH',
      url,
      data,
      ...defaultParams,
      ...params,
    });
  }

  async delete (url, params = {}) {
    return this.request({
      method: 'DELETE',
      url,
      ...defaultParams,
      ...params,
    });
  }
}

export default Api;
