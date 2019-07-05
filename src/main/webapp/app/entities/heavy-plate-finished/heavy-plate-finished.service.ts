import axios from 'axios';

import { IHeavyPlateFinished } from '@/shared/model/heavy-plate-finished.model';

const baseApiUrl = 'api/heavy-plate-finisheds';

export default class HeavyPlateFinishedService {
  public find(id: number): Promise<IHeavyPlateFinished> {
    return new Promise<IHeavyPlateFinished>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl).then(function(res) {
        resolve(res);
      });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>(resolve => {
      axios.delete(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public create(entity: IHeavyPlateFinished): Promise<IHeavyPlateFinished> {
    return new Promise<IHeavyPlateFinished>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IHeavyPlateFinished): Promise<IHeavyPlateFinished> {
    return new Promise<IHeavyPlateFinished>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
