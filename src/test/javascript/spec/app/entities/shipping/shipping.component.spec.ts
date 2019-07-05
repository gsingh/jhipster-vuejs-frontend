/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ShippingComponent from '@/entities/shipping/shipping.vue';
import ShippingClass from '@/entities/shipping/shipping.component';
import ShippingService from '@/entities/shipping/shipping.service';

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
  describe('Shipping Management Component', () => {
    let wrapper: Wrapper<ShippingClass>;
    let comp: ShippingClass;
    let shippingServiceStub: SinonStubbedInstance<ShippingService>;

    beforeEach(() => {
      shippingServiceStub = sinon.createStubInstance<ShippingService>(ShippingService);
      shippingServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ShippingClass>(ShippingComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          shippingService: () => shippingServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      shippingServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllShippings();
      await comp.$nextTick();

      // THEN
      expect(shippingServiceStub.retrieve.called).toBeTruthy();
      expect(comp.shippings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      shippingServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeShipping();
      await comp.$nextTick();

      // THEN
      expect(shippingServiceStub.delete.called).toBeTruthy();
      expect(shippingServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
