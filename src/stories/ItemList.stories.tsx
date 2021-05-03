import React from 'react';

import ItemList from "../webparts/practiceProject/components/ItemList/ItemList"

export default{
    title: 'To Do List',
    component: ItemList
}
const Template = (args) => <ItemList {...args} />;

export const Default = Template.bind({});
Default.args = { 
    webUrl: "",
    listID: "",
}