import { IEventOfPlateMill } from '@/shared/model/event-of-plate-mill.model';

export interface IVideoOfEvent {
  id?: number;
  videoDate?: Date;
  videoFile?: string;
  eventPM?: IEventOfPlateMill;
}

export class VideoOfEvent implements IVideoOfEvent {
  constructor(public id?: number, public videoDate?: Date, public videoFile?: string, public eventPM?: IEventOfPlateMill) {}
}
