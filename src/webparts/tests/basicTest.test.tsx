import renderer from 'react-test-renderer';
import ItemList from '../practiceProject/components/ItemList/ItemList';
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
