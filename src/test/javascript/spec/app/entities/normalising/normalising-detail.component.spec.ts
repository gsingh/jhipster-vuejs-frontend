/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import NormalisingDetailComponent from '@/entities/normalising/normalising-details.vue';
import NormalisingClass from '@/entities/normalising/normalising-details.component';
import NormalisingService from '@/entities/normalising/normalising.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Normalising Management Detail Component', () => {
    let wrapper: Wrapper<NormalisingClass>;
    let comp: NormalisingClass;
    let normalisingServiceStub: SinonStubbedInstance<NormalisingService>;

    beforeEach(() => {
      normalisingServiceStub = sinon.createStubInstance<NormalisingService>(NormalisingService);

      wrapper = shallowMount<NormalisingClass>(NormalisingDetailComponent, {
        store,
        localVue,
        provide: { normalisingService: () => normalisingServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundNormalising = { id: 123 };
        normalisingServiceStub.find.resolves(foundNormalising);

        // WHEN
        comp.retrieveNormalising(123);
        await comp.$nextTick();

        // THEN
        expect(comp.normalising).toBe(foundNormalising);
      });
    });
  });
});
