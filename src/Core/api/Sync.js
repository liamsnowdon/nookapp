import Api from 'Core/api/Api';
import { CRITTERSYNC } from 'Core/constants/api';

export default class Sync {
  static async get (uuid) {
    const url = Api.url(`${CRITTERSYNC.BASE}${CRITTERSYNC.SESSION}`, { uuid });

    return await Api.$instance.get(url);
  }

  static async create () {
    const url = Api.url(CRITTERSYNC.BASE);

    return await Api.$instance.post(url);
  }

  static async patch () {

  }

  static async delete () {

  }
}
