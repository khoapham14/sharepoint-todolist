import * as React from 'react';
import styles from './PopUpDialog.module.scss';
import store from '../../ToDoListStore';

import { Dialog, DialogType, DialogFooter, 
        DefaultButton, TextField, DatePicker, 
        IDatePicker, mergeStyleSets,
        ChoiceGroup, IChoiceGroupOption } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks';


interface PopUpDialogProps{
    title: string, 
    listID: any, 
    webUrl: any, 
    itemID?: number, 
    itemTitle?: string, 
    itemDesc?: string, 
    itemPrio?: string, 
    itemDue?: string
}

/**
 * A UI component that conditionally renders Fluent UI Dialog boxes based on which button was pressed.
 * @param props Takes props from CustomButton to display dialog boxes and execute store functions
 * @returns Nothing.
 */
function PopUpDialog(props: PopUpDialogProps) {

    const [ hideDialog, {toggle :toggleHideDialog} ] = useBoolean(false); //Toggle to show or hide

    const [ newTitle, setNewTitle ] = React.useState(props.itemTitle);
    const [ newDesc, setNewDesc ] = React.useState(props.itemDesc);
    const [ newPrio, setNewPrio ] = React.useState(props.itemPrio);
    const [ newDueDate, setNewDate ] = React.useState<Date | undefined>();
    const datePickerRef = React.useRef<IDatePicker>(null);

    const setTitle = (e: any) => {
        setNewTitle(e.target.value)
    }

    const setDesc = (e: any) => {
        setNewDesc(e.target.value)
    }

   
    // Choice group 
    const setPrio = React.useCallback((ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
        setNewPrio(option.key);
    }, []);

    const options: IChoiceGroupOption[] = [
        { key: 'High', text: 'High' },
        { key: 'Med', text: 'Med' },
        { key: 'Low', text: 'Low' }
    ]


    // Date picker
    const styles = mergeStyleSets({
        root: { selectors: { '> *': { marginBottom: 15 } } },
        control: { maxWidth: 300, marginBottom: 15 },
    });

    const onFormatDate = (date?: Date): string => {
        return !date ? '' : (date.getFullYear()) + '-' +  ('0' + (date.getMonth()+1)).slice(-2) + '-' +('0' + date.getDate()).slice(-2);
    };

    let subText = "";

    // Conditionally show subtext based on button title.
    if(props.title === "Edit"){
        subText = "Input your changes to list item.";
    } else if (props.title === "Delete"){
        subText = "Are you sure you wish to delete this item?";
    } else if (props.title === "Remind"){
        subText = "Would you like to set reminder for this item?";
    } else if (props.title === "Add new task"){
        subText = "Input details for the new task:"
    }

    const modalPropsStyles = { main: { maxWidth: 700 } };
    const dialogContentProps = {
        type: DialogType.normal,
        title: props.title,
        subText: subText,
    };

    const modalProps = {
        isBlocking: true,
        styles: modalPropsStyles,
    }

 

    // Conditionally show dialog box based on button title.
    switch(props.title){
        case "Edit": 
            return(
                <Dialog
                hidden={hideDialog}
                onDismiss={toggleHideDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modalProps}
                >
                    <TextField required label="New Task Name" defaultValue={newTitle} onChange={setTitle} />
                    <TextField required label="New Description" defaultValue={newDesc} onChange={setDesc} multiline autoAdjustHeight />
                    <DatePicker
                        componentRef={datePickerRef}
                        label="New Due Date"
                        ariaLabel="Select a date. Input format is yyyy-mm-dd"
                        value={newDueDate}
                        onSelectDate={setNewDate as (date?: Date) => void}
                        formatDate={onFormatDate}
                        className={styles.control}
                    />
                    <ChoiceGroup  required label="Priority Level" options={options} onChange={setPrio} />

                <DialogFooter>
                  <DefaultButton onClick={() => store.updateListItem(props.itemID, props.listID, props.webUrl, newTitle, newDesc, newPrio, newDueDate)} text="Submit changes" />
                  <DefaultButton onClick={toggleHideDialog} text="Cancel" />
                </DialogFooter>
        
                </Dialog>
            );
        case "Delete": 
            return(
                <Dialog
                hidden={hideDialog}
                onDismiss={toggleHideDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modalProps}
                >
                <DialogFooter>
                    <DefaultButton onClick={() => {store.removeListItem(props.itemID, props.listID, props.webUrl)}} text="Yes" />
                    <DefaultButton onClick={toggleHideDialog} text="No" />
                </DialogFooter>
        
                </Dialog>
            );
        case "Remind": 
            return(
                <Dialog
                hidden={hideDialog}
                onDismiss={toggleHideDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modalProps}
                >
                <DialogFooter>
                    <DefaultButton onClick={toggleHideDialog} text="Yes" />
                    <DefaultButton onClick={toggleHideDialog} text="No" />
                </DialogFooter>
        
                </Dialog>
            );
        case "Add new task":
            return(
                <Dialog
                hidden={hideDialog}
                onDismiss={toggleHideDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modalProps}
                >
                
                <TextField required label="New Task Name" onChange={setTitle} />
                    <TextField required label="New Description" onChange={setDesc} multiline autoAdjustHeight />
                    <DatePicker
                        componentRef={datePickerRef}
                        label="New Due Date"
                        ariaLabel="Select a date. Input format is yyyy-mm-dd"
                        onSelectDate={setNewDate as (date?: Date) => void}
                        formatDate={onFormatDate}
                        className={styles.control}
                    />
                    <ChoiceGroup  required label="Priority Level" options={options} onChange={setPrio} />
            
                <DialogFooter>
                    <DefaultButton onClick={() => store.addNewTask(props.listID, props.webUrl, newTitle, newDesc, newPrio, newDueDate)} text="Add task" />
                    <DefaultButton onClick={toggleHideDialog} text="Cancel" />
                </DialogFooter>
        
                </Dialog>
            );
        default:
            break;
    }
}

export default PopUpDialog;

