import React from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import { TextField, DatePicker, DialogFooter, ChoiceGroup } from "@fluentui/react";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import PopUpDialog from '../practiceProject/components/PopUpDialog/PopUpDialog';
import { PopUpDialogProps } from '../practiceProject/components/PopUpDialog/PopUpDialog';


describe('Pop Up Dialog tests', () => {

    let reactComponent: ReactWrapper<PopUpDialogProps>;
  
    beforeEach(() => {
  
      reactComponent = mount(React.createElement(
        PopUpDialog,
        {
            title: "Edit",
            listID: "",
            webUrl: "", 
            itemID: 1 ,
            itemTitle: "",
            itemDesc: "",
            itemPrio: "",
            itemDue: "",
            handleStateChange: "",
            dialogState: true,
        }
      ));
    });
  
    afterEach(() => {
      reactComponent.unmount();
    });
  
    it('Pop Up Dialog root div exists', () => {
  
      // define the css selector
      let cssSelector: string = '#popUpDialog';
  
      // find the element using css selector
      const element = reactComponent.find(cssSelector);
      expect(element.length).toBeGreaterThan(0);
    });
  
    it('Edit pop up should have correct sub title', () => {
  
        // Arrange
        // define contains/like css selector
        let cssSelector: string = 'p';
    
        // Act
        // find the elemet using css selector
        const text = reactComponent.find(cssSelector).text();
    
        // Assert
        expect(text).toBe("Input your changes to list item.");  
      });
  });