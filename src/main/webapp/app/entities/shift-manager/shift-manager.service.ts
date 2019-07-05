import axios from 'axios';

import { IShiftManager } from '@/shared/model/shift-manager.model';

const baseApiUrl = 'api/shift-managers';

export default class ShiftManagerService {
  public find(id: number): Promise<IShiftManager> {
    return new Promise<IShiftManager>(resolve => {
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

  public create(entity: IShiftManager): Promise<IShiftManager> {
    return new Promise<IShiftManager>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IShiftManager): Promise<IShiftManager> {
    return new Promise<IShiftManager>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
