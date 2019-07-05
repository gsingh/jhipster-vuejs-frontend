import axios from 'axios';

import { IVideoOfEvent } from '@/shared/model/video-of-event.model';

const baseApiUrl = 'api/video-of-events';

export default class VideoOfEventService {
  public find(id: number): Promise<IVideoOfEvent> {
    return new Promise<IVideoOfEvent>(resolve => {
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

  public create(entity: IVideoOfEvent): Promise<IVideoOfEvent> {
    return new Promise<IVideoOfEvent>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IVideoOfEvent): Promise<IVideoOfEvent> {
    return new Promise<IVideoOfEvent>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
