/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ShippingDetailComponent from '@/entities/shipping/shipping-details.vue';
import ShippingClass from '@/entities/shipping/shipping-details.component';
import ShippingService from '@/entities/shipping/shipping.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Shipping Management Detail Component', () => {
    let wrapper: Wrapper<ShippingClass>;
    let comp: ShippingClass;
    let shippingServiceStub: SinonStubbedInstance<ShippingService>;

    beforeEach(() => {
      shippingServiceStub = sinon.createStubInstance<ShippingService>(ShippingService);

      wrapper = shallowMount<ShippingClass>(ShippingDetailComponent, {
        store,
        localVue,
        provide: { shippingService: () => shippingServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundShipping = { id: 123 };
        shippingServiceStub.find.resolves(foundShipping);

        // WHEN
        comp.retrieveShipping(123);
        await comp.$nextTick();

        // THEN
        expect(comp.shipping).toBe(foundShipping);
      });
    });
  });
});
