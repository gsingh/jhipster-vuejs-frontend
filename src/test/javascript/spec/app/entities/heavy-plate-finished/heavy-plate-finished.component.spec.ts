/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import HeavyPlateFinishedComponent from '@/entities/heavy-plate-finished/heavy-plate-finished.vue';
import HeavyPlateFinishedClass from '@/entities/heavy-plate-finished/heavy-plate-finished.component';
import HeavyPlateFinishedService from '@/entities/heavy-plate-finished/heavy-plate-finished.service';

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
  describe('HeavyPlateFinished Management Component', () => {
    let wrapper: Wrapper<HeavyPlateFinishedClass>;
    let comp: HeavyPlateFinishedClass;
    let heavyPlateFinishedServiceStub: SinonStubbedInstance<HeavyPlateFinishedService>;

    beforeEach(() => {
      heavyPlateFinishedServiceStub = sinon.createStubInstance<HeavyPlateFinishedService>(HeavyPlateFinishedService);
      heavyPlateFinishedServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<HeavyPlateFinishedClass>(HeavyPlateFinishedComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          heavyPlateFinishedService: () => heavyPlateFinishedServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      heavyPlateFinishedServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllHeavyPlateFinisheds();
      await comp.$nextTick();

      // THEN
      expect(heavyPlateFinishedServiceStub.retrieve.called).toBeTruthy();
      expect(comp.heavyPlateFinisheds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      heavyPlateFinishedServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeHeavyPlateFinished();
      await comp.$nextTick();

      // THEN
      expect(heavyPlateFinishedServiceStub.delete.called).toBeTruthy();
      expect(heavyPlateFinishedServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
