/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ShiftManagerComponent from '@/entities/shift-manager/shift-manager.vue';
import ShiftManagerClass from '@/entities/shift-manager/shift-manager.component';
import ShiftManagerService from '@/entities/shift-manager/shift-manager.service';

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
  describe('ShiftManager Management Component', () => {
    let wrapper: Wrapper<ShiftManagerClass>;
    let comp: ShiftManagerClass;
    let shiftManagerServiceStub: SinonStubbedInstance<ShiftManagerService>;

    beforeEach(() => {
      shiftManagerServiceStub = sinon.createStubInstance<ShiftManagerService>(ShiftManagerService);
      shiftManagerServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ShiftManagerClass>(ShiftManagerComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          shiftManagerService: () => shiftManagerServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      shiftManagerServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllShiftManagers();
      await comp.$nextTick();

      // THEN
      expect(shiftManagerServiceStub.retrieve.called).toBeTruthy();
      expect(comp.shiftManagers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      shiftManagerServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeShiftManager();
      await comp.$nextTick();

      // THEN
      expect(shiftManagerServiceStub.delete.called).toBeTruthy();
      expect(shiftManagerServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
