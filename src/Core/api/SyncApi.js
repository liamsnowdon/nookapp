import Api from 'Core/api/Api';
import { CRITTERSYNC } from 'Core/constants/api';

export default class SyncApi {
  static async get (uuid) {
    const url = Api.url(`${CRITTERSYNC.BASE}${CRITTERSYNC.SESSION}`, { uuid }); // 1ae9eeac-44b9-4f65-9282-7bedf274ecfb

    return await Api.$instance.get(url);
  }

  static async create (payload) {
    const url = Api.url(CRITTERSYNC.BASE);

    const response =  await Api.$instance.post(url, payload);

    return response.data;
  }

  static async patch () {

  }

  static async delete () {

  }
}
