/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import NormalisingComponent from '@/entities/normalising/normalising.vue';
import NormalisingClass from '@/entities/normalising/normalising.component';
import NormalisingService from '@/entities/normalising/normalising.service';

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
  describe('Normalising Management Component', () => {
    let wrapper: Wrapper<NormalisingClass>;
    let comp: NormalisingClass;
    let normalisingServiceStub: SinonStubbedInstance<NormalisingService>;

    beforeEach(() => {
      normalisingServiceStub = sinon.createStubInstance<NormalisingService>(NormalisingService);
      normalisingServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<NormalisingClass>(NormalisingComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          normalisingService: () => normalisingServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      normalisingServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllNormalisings();
      await comp.$nextTick();

      // THEN
      expect(normalisingServiceStub.retrieve.called).toBeTruthy();
      expect(comp.normalisings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      normalisingServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeNormalising();
      await comp.$nextTick();

      // THEN
      expect(normalisingServiceStub.delete.called).toBeTruthy();
      expect(normalisingServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
