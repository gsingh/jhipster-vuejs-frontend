import { Component, Vue, Inject } from 'vue-property-decorator';

import { IVideoOfEvent } from '@/shared/model/video-of-event.model';
import VideoOfEventService from './video-of-event.service';

@Component
export default class VideoOfEventDetails extends Vue {
  @Inject('videoOfEventService') private videoOfEventService: () => VideoOfEventService;
  public videoOfEvent: IVideoOfEvent = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.videoOfEventId) {
        vm.retrieveVideoOfEvent(to.params.videoOfEventId);
      }
    });
  }

  public retrieveVideoOfEvent(videoOfEventId) {
    this.videoOfEventService()
      .find(videoOfEventId)
      .then(res => {
        this.videoOfEvent = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
