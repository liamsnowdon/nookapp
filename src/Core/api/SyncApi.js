import Api from 'Core/api/Api';
import { CRITTERSYNC } from 'Core/constants/api';

export default class SyncApi {
  static async get (uuid) {
    const url = Api.url(`${CRITTERSYNC.BASE}${CRITTERSYNC.SESSION}`, { uuid }); // 9358d67b-33b3-4d40-b585-8c157995dea7

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
