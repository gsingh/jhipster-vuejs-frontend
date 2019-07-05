import { IEventOfPlateMill } from '@/shared/model/event-of-plate-mill.model';

export interface IPictureOfEvent {
  id?: number;
  picDate?: Date;
  imgFile?: string;
  eventPM?: IEventOfPlateMill;
}

export class PictureOfEvent implements IPictureOfEvent {
  constructor(public id?: number, public picDate?: Date, public imgFile?: string, public eventPM?: IEventOfPlateMill) {}
}
