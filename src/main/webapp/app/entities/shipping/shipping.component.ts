import { Component, Inject, Vue } from 'vue-property-decorator';
import { IShipping } from '@/shared/model/shipping.model';
import AlertService from '@/shared/alert/alert.service';

import ShippingService from './shipping.service';

@Component
export default class Shipping extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('shippingService') private shippingService: () => ShippingService;
  private removeId: number = null;
  public shippings: IShipping[] = [];

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
    this.retrieveAllShippings();
  }

  public clear(): void {
    this.retrieveAllShippings();
  }

  public retrieveAllShippings(): void {
    this.isFetching = true;

    this.shippingService()
      .retrieve()
      .then(
        res => {
          this.shippings = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IShipping): void {
    this.removeId = instance.id;
  }

  public removeShipping(): void {
    this.shippingService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Shipping is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllShippings();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
