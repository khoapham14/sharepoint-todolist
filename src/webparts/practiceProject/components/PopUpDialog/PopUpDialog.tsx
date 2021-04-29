import * as React from 'react';
import styles from './PopUpDialog.module.scss';
import store from '../../ToDoListStore';

import { Dialog, DialogType, DialogFooter, DefaultButton } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks';

/**
 * A UI component that conditionally renders Fluent UI Dialog boxes based on which button was pressed.
 * @param props Takes props from CustomButton to display dialog boxes and execute store functions
 * @returns Nothing.
 */
function PopUpDialog(props: {title: string, itemID: number, listID: any, webUrl: any}) {

    const [ hideDialog, {toggle :toggleHideDialog} ] = useBoolean(false); //Toggle to show / hide

    let subText = "";

    // Conditionally show subtext based on button title.
    if(props.title === "Edit")
    {
        subText = "Input your changes to list item.";
    } else if (props.title === "Delete"){
        subText = "Are you sure you wish to delete this item?";
    } else if (props.title === "Remind"){
        subText = "Would you like to set reminder for this item?";
    }

    const modalPropsStyles = { main: { maxWidth: 450 } };
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
                <p> This is the edit box </p>
            
                <DialogFooter>
                  <DefaultButton onClick={toggleHideDialog} text="Yes" />
                  <DefaultButton onClick={toggleHideDialog} text="No" />
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
                <p> This is the delete box </p>
            
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
                <p> This is the remind box </p>
            
                <DialogFooter>
                    <DefaultButton onClick={toggleHideDialog} text="Yes" />
                    <DefaultButton onClick={toggleHideDialog} text="No" />
                </DialogFooter>
        
                </Dialog>
            );
        default:
            break;
    }
}

export default PopUpDialog;

