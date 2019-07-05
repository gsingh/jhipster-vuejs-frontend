/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import PictureOfEventComponent from '@/entities/picture-of-event/picture-of-event.vue';
import PictureOfEventClass from '@/entities/picture-of-event/picture-of-event.component';
import PictureOfEventService from '@/entities/picture-of-event/picture-of-event.service';

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
  describe('PictureOfEvent Management Component', () => {
    let wrapper: Wrapper<PictureOfEventClass>;
    let comp: PictureOfEventClass;
    let pictureOfEventServiceStub: SinonStubbedInstance<PictureOfEventService>;

    beforeEach(() => {
      pictureOfEventServiceStub = sinon.createStubInstance<PictureOfEventService>(PictureOfEventService);
      pictureOfEventServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<PictureOfEventClass>(PictureOfEventComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          pictureOfEventService: () => pictureOfEventServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      pictureOfEventServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllPictureOfEvents();
      await comp.$nextTick();

      // THEN
      expect(pictureOfEventServiceStub.retrieve.called).toBeTruthy();
      expect(comp.pictureOfEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      pictureOfEventServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removePictureOfEvent();
      await comp.$nextTick();

      // THEN
      expect(pictureOfEventServiceStub.delete.called).toBeTruthy();
      expect(pictureOfEventServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
