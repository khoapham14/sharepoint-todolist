import React from "react";

import PriorityHighlighter from '../webparts/practiceProject/components/PriorityHighlighter/PriorityHighlighter';

export default{
    title: 'Priority Label',
    component: PriorityHighlighter,
}

const Template = (args) => <PriorityHighlighter {...args} />;

export const High = Template.bind({});
High.args = { 
    priority: "High"
}

export const Medium = Template.bind({});
Medium.args = { 
    priority: "Med"
}

export const Low = Template.bind({});
Low.args = { 
    priority: "Low"
}