import React from 'react';

import PopUpDialog from "../webparts/practiceProject/components/PopUpDialog/PopUpDialog";

export default{
    title: 'Pop Up Dialog',
    component: PopUpDialog
}
const Template = (args) => <PopUpDialog {...args} />;

export const Edit = Template.bind({});
Edit.args = { 
    title: "Edit",
    listID: "",
    webUrl: "",
    dialogState: true,
};

export const Add = Template.bind({});
Add.args = { 
    title: "Add new task",
    listID: "",
    webUrl: "",
    dialogState: true,
};

export const Delete = Template.bind({});
Delete.args = { 
    title: "Delete",
    listID: "",
    webUrl: "",
    dialogState: true,
};

export const Remind = Template.bind({});
Remind.args = { 
    title: "Remind",
    listID: "",
    webUrl: "",
    dialogState: true,
};
