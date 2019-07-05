import axios from 'axios';

import { IEventOfPlateMill } from '@/shared/model/event-of-plate-mill.model';

const baseApiUrl = 'api/event-of-plate-mills';

export default class EventOfPlateMillService {
  public find(id: number): Promise<IEventOfPlateMill> {
    return new Promise<IEventOfPlateMill>(resolve => {
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

  public create(entity: IEventOfPlateMill): Promise<IEventOfPlateMill> {
    return new Promise<IEventOfPlateMill>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IEventOfPlateMill): Promise<IEventOfPlateMill> {
    return new Promise<IEventOfPlateMill>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
