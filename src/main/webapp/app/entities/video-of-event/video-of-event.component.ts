import { Component, Inject, Vue } from 'vue-property-decorator';
import { IVideoOfEvent } from '@/shared/model/video-of-event.model';
import AlertService from '@/shared/alert/alert.service';

import VideoOfEventService from './video-of-event.service';

@Component
export default class VideoOfEvent extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('videoOfEventService') private videoOfEventService: () => VideoOfEventService;
  private removeId: number = null;
  public videoOfEvents: IVideoOfEvent[] = [];

  public isFetching = false;
  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public mounted(): void {
    this.retrieveAllVideoOfEvents();
  }

  public clear(): void {
    this.retrieveAllVideoOfEvents();
  }

  public retrieveAllVideoOfEvents(): void {
    this.isFetching = true;

    this.videoOfEventService()
      .retrieve()
      .then(
        res => {
          this.videoOfEvents = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IVideoOfEvent): void {
    this.removeId = instance.id;
  }

  public removeVideoOfEvent(): void {
    this.videoOfEventService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A VideoOfEvent is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllVideoOfEvents();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
