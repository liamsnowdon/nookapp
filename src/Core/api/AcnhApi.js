import Api from 'Core/api/Api';

import { ACNH_API } from 'Core/constants/api';

export default class AcnhApi {
  static async getFish () {
    const url = `${ACNH_API.BASE}${ACNH_API.FISH}`;

    const response = await Api.$instance.get(url);

    return Object.values(response.data);
  }

  static async getBugs () {
    const url = `${ACNH_API.BASE}${ACNH_API.BUGS}`;

    const response = await Api.$instance.get(url);

    return Object.values(response.data);
  }

  static async getSeaCreatures () {
    const url = `${ACNH_API.BASE}${ACNH_API.SEA_CREATURES}`;

    const response = await Api.$instance.get(url);

    return Object.values(response.data);
  }

  static async getFossils () {
    const url = `${ACNH_API.BASE}${ACNH_API.FOSSILS}`;

    const response = await Api.$instance.get(url);

    return Object.values(response.data);
  }

  static async getVillagers () {
    const url = `${ACNH_API.BASE}${ACNH_API.VILLAGERS}`;

    const response = await Api.$instance.get(url);

    return Object.values(response.data);
  }
}
