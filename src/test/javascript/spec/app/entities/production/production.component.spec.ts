/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ProductionComponent from '@/entities/production/production.vue';
import ProductionClass from '@/entities/production/production.component';
import ProductionService from '@/entities/production/production.service';

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
  describe('Production Management Component', () => {
    let wrapper: Wrapper<ProductionClass>;
    let comp: ProductionClass;
    let productionServiceStub: SinonStubbedInstance<ProductionService>;

    beforeEach(() => {
      productionServiceStub = sinon.createStubInstance<ProductionService>(ProductionService);
      productionServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ProductionClass>(ProductionComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          productionService: () => productionServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      productionServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllProductions();
      await comp.$nextTick();

      // THEN
      expect(productionServiceStub.retrieve.called).toBeTruthy();
      expect(comp.productions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      productionServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeProduction();
      await comp.$nextTick();

      // THEN
      expect(productionServiceStub.delete.called).toBeTruthy();
      expect(productionServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
