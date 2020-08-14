import Api from 'Core/api/Api';

import { SYNC_API } from 'Core/constants/api';

export default class SyncApi {
  static async get (uuid) {
    const url = Api.url(`${SYNC_API.BASE}${SYNC_API.SESSION}`, { uuid });

    const response = await Api.$instance.get(url);

    return response.data;
  }

  static async create (data) {
    const url = Api.url(SYNC_API.BASE);

    const response = await Api.$instance.post(url, data);

    return response.data;
  }

  static async patch (uuid, data) {
    const url = Api.url(`${SYNC_API.BASE}${SYNC_API.SESSION}`, { uuid });

    const response = await Api.$instance.patch(url, data);

    return response.data;
  }

  static async delete (uuid, data) {
    const url = Api.url(`${SYNC_API.BASE}${SYNC_API.SESSION}`, { uuid });

    const response = await Api.$instance.delete(url, { data });

    return response.data;
  }
}
