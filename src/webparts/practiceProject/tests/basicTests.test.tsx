import React from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

import ItemList from '../components/ItemList/ItemList';


it('renders correctly', () => {
    const tree = renderer
      .create(<ItemList />)
      .toJSON();
    expect(tree).toMatchSnapshot();
});
