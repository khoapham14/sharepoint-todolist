import React from 'react';

import CustomButton from "../webparts/practiceProject/components/CustomButton/CustomButton"

export default{
    title: 'Custom Button',
    component: CustomButton
}
const Template = (args) => <CustomButton {...args} />;

export const Default = Template.bind({});
Default.args = { 
    buttonText: "String from props",
    listID: "",
    webUrl: "",
    itemID: "",
}