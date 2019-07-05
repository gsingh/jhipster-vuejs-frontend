/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import VideoOfEventComponent from '@/entities/video-of-event/video-of-event.vue';
import VideoOfEventClass from '@/entities/video-of-event/video-of-event.component';
import VideoOfEventService from '@/entities/video-of-event/video-of-event.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {}
  }
};

describe('Component Tests', () => {
  describe('VideoOfEvent Management Component', () => {
    let wrapper: Wrapper<VideoOfEventClass>;
    let comp: VideoOfEventClass;
    let videoOfEventServiceStub: SinonStubbedInstance<VideoOfEventService>;

    beforeEach(() => {
      videoOfEventServiceStub = sinon.createStubInstance<VideoOfEventService>(VideoOfEventService);
      videoOfEventServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<VideoOfEventClass>(VideoOfEventComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          videoOfEventService: () => videoOfEventServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      videoOfEventServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllVideoOfEvents();
      await comp.$nextTick();

      // THEN
      expect(videoOfEventServiceStub.retrieve.called).toBeTruthy();
      expect(comp.videoOfEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      videoOfEventServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeVideoOfEvent();
      await comp.$nextTick();

      // THEN
      expect(videoOfEventServiceStub.delete.called).toBeTruthy();
      expect(videoOfEventServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
