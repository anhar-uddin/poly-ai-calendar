import React from 'react';
import Calendar from './components/calendar';
import { mount } from 'enzyme';


describe('<Login /> with no props', () => {
  const container = mount(<Calendar year={2020} month={6} />);

  it('should have header', () => {
    expect(container.find('div.calendar-heading').length).toEqual(1);
  });

  it('header should show correct month and year', () => {
    expect(container.find('div.calendar-heading').text()).toEqual('June 2020');
  });

  it('header should show one selected date', () => {
    expect(container.find('th.selected-date').length).toEqual(1);
  });

  it('should have 29 normal dates', () => {
    expect(container.find('th.normal-date').length).toEqual(29);
  });

});