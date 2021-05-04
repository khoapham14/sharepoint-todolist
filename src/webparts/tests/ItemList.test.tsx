import React from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import ItemList from '../practiceProject/components/ItemList/ItemList';
import { ItemListProps } from '../practiceProject/components/ItemList/ItemList';

describe('Item List tests', () => {

    let reactComponent: ReactWrapper<ItemListProps>;
  
    beforeEach(() => {
  
      reactComponent = mount(React.createElement(
        ItemList,
        {
          webUrl: "",
          listID: ""
        }
      ));
    });
  
    afterEach(() => {
      reactComponent.unmount();
    });
  
    it('Item List root div exists', () => {
  
      // define the css selector
      let cssSelector: string = '#itemList';
  
      // find the element using css selector
      const element = reactComponent.find(cssSelector);
      expect(element.length).toBeGreaterThan(0);
    });
  
    it('should have the correct title', () => {
  
      // Arrange
      // define contains/like css selector
      let cssSelector: string = 'p';
  
      // Act
      // find the elemet using css selector
      const text = reactComponent.find(cssSelector).text();
  
      // Assert
      expect(text).toBe("To Do List");  
    });
  });