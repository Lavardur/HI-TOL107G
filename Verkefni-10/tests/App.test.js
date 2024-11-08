import { expect, test, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../src/App.vue';
import WeatherComponent from '../src/components/WeatherComponent.vue';

describe('App.vue', () => {
  test('renders the App component', () => {
    const wrapper = mount(App);
    expect(wrapper.exists()).toBe(true);
  });

  test('contains the WeatherComponent', () => {
    const wrapper = mount(App);
    const weatherComponent = wrapper.findComponent(WeatherComponent);
    expect(weatherComponent.exists()).toBe(true);
  });

  test('has the correct class applied', () => {
    const wrapper = mount(App);
    expect(wrapper.classes()).toContain('d-flex');
    expect(wrapper.classes()).toContain('justify-content-center');
    expect(wrapper.classes()).toContain('align-items-center');
    expect(wrapper.classes()).toContain('min-vh-100');
  });
});