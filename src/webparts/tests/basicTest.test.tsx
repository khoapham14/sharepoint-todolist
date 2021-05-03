import renderer from 'react-test-renderer';
import ItemList from '../practiceProject/components/ItemList/ItemList';
import CustomButton from '../practiceProject/components/CustomButton/CustomButton';
import PopUpDialog from '../practiceProject/components/PopUpDialog/PopUpDialog';
import PriorityHighlighter from '../practiceProject/components/PriorityHighlighter/PriorityHighlighter';
import React from 'react';

import { configure, mount, ReactWrapper } from 'enzyme';
const Adapter = require('enzyme-adapter-react-16')


configure({ adapter: new Adapter() });


it('Base Item list renders correctly', () => {
    const tree = renderer
      .create(<ItemList />)
      .toJSON();
    expect(tree).toMatchSnapshot();
});


it('Base button renders correctly', () => {
  const tree = renderer
      .create(<CustomButton buttonText="Edit" listID="" webUrl="" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
})

it('Pop up dialog renders correctly', () => {
  const tree = renderer
      .create(<PopUpDialog title="Edit" listID="" webUrl="" handleStateChange="" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
})

it('Priority Highlighter renders correctly', () => {
  const tree = renderer
      .create(<PriorityHighlighter priority="High" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
})

