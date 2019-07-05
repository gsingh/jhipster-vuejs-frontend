import axios from 'axios';

import { INormalising } from '@/shared/model/normalising.model';

const baseApiUrl = 'api/normalisings';

export default class NormalisingService {
  public find(id: number): Promise<INormalising> {
    return new Promise<INormalising>(resolve => {
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

  public create(entity: INormalising): Promise<INormalising> {
    return new Promise<INormalising>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: INormalising): Promise<INormalising> {
    return new Promise<INormalising>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
