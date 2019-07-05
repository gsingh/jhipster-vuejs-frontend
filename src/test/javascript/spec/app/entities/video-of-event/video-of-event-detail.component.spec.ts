/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import VideoOfEventDetailComponent from '@/entities/video-of-event/video-of-event-details.vue';
import VideoOfEventClass from '@/entities/video-of-event/video-of-event-details.component';
import VideoOfEventService from '@/entities/video-of-event/video-of-event.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('VideoOfEvent Management Detail Component', () => {
    let wrapper: Wrapper<VideoOfEventClass>;
    let comp: VideoOfEventClass;
    let videoOfEventServiceStub: SinonStubbedInstance<VideoOfEventService>;

    beforeEach(() => {
      videoOfEventServiceStub = sinon.createStubInstance<VideoOfEventService>(VideoOfEventService);

      wrapper = shallowMount<VideoOfEventClass>(VideoOfEventDetailComponent, {
        store,
        localVue,
        provide: { videoOfEventService: () => videoOfEventServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundVideoOfEvent = { id: 123 };
        videoOfEventServiceStub.find.resolves(foundVideoOfEvent);

        // WHEN
        comp.retrieveVideoOfEvent(123);
        await comp.$nextTick();

        // THEN
        expect(comp.videoOfEvent).toBe(foundVideoOfEvent);
      });
    });
  });
});
