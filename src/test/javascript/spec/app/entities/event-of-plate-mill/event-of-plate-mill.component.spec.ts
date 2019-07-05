/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import EventOfPlateMillComponent from '@/entities/event-of-plate-mill/event-of-plate-mill.vue';
import EventOfPlateMillClass from '@/entities/event-of-plate-mill/event-of-plate-mill.component';
import EventOfPlateMillService from '@/entities/event-of-plate-mill/event-of-plate-mill.service';

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
  describe('EventOfPlateMill Management Component', () => {
    let wrapper: Wrapper<EventOfPlateMillClass>;
    let comp: EventOfPlateMillClass;
    let eventOfPlateMillServiceStub: SinonStubbedInstance<EventOfPlateMillService>;

    beforeEach(() => {
      eventOfPlateMillServiceStub = sinon.createStubInstance<EventOfPlateMillService>(EventOfPlateMillService);
      eventOfPlateMillServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<EventOfPlateMillClass>(EventOfPlateMillComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          eventOfPlateMillService: () => eventOfPlateMillServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      eventOfPlateMillServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllEventOfPlateMills();
      await comp.$nextTick();

      // THEN
      expect(eventOfPlateMillServiceStub.retrieve.called).toBeTruthy();
      expect(comp.eventOfPlateMills[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      eventOfPlateMillServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeEventOfPlateMill();
      await comp.$nextTick();

      // THEN
      expect(eventOfPlateMillServiceStub.delete.called).toBeTruthy();
      expect(eventOfPlateMillServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
