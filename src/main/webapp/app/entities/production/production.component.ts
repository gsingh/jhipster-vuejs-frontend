import { Component, Inject, Vue } from 'vue-property-decorator';
import { IProduction } from '@/shared/model/production.model';
import AlertService from '@/shared/alert/alert.service';

import ProductionService from './production.service';

@Component
export default class Production extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('productionService') private productionService: () => ProductionService;
  private removeId: number = null;
  public productions: IProduction[] = [];

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
    this.retrieveAllProductions();
  }

  public clear(): void {
    this.retrieveAllProductions();
  }

  public retrieveAllProductions(): void {
    this.isFetching = true;

    this.productionService()
      .retrieve()
      .then(
        res => {
          this.productions = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IProduction): void {
    this.removeId = instance.id;
  }

  public removeProduction(): void {
    this.productionService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Production is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllProductions();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
