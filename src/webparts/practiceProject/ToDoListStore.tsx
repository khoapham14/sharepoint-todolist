import * as React from "react";
import { observable, action, toJS } from 'mobx';
import { sp, Web } from '@pnp/sp/presets/all';
import { Dialog, DialogFooter, DialogType, DefaultButton } from '@fluentui/react';

class ToDoListStore{
    // A list that can be used by all component
    @observable list: any[] = []

    /**
     * Fetch data from a Sharepoint List and add to this list array.
     * @param spList SharePoint list ID
     * @param webUrl SharePoint site URL
     */
    @action 
    getListData = ( spList: any, webUrl: any) =>{
        let spWeb = Web(webUrl)
        let toDoList = spWeb.lists.getById(spList)

        toDoList.items.select("ID", "Title", "Description", "Priority", "DueDate").get().then((results : any[]) => {
            if(results !== null){
              this.list = results;
            }
            else{
              alert("Failed to retrieve list data. Make sure you have created and selected a ToDo List!");
            }
        }), (error: any): void => {
            // An error has occurred while loading the data. Notify the user
            // that loading data is finished and return the error message.
            console.log(error)
        }
    }

    /**
     * Update the content of a list item 
     * @param title New Title (or Task) for the list item 
     * @param desc New Description for the list item
     * @param prio New Priority Level for the list item
     * @param due New Due Date for the list item
     * @param itemId ID of the list item to be updated
     * @param spList SharePoint list ID
     * @param webUrl SharePoint site URL
     */
    @action
    updateListItem = (title: string, desc: string, prio: string, due: string, itemId: number, spList: any, webUrl: any) => {
        let spWeb = Web(webUrl);
        let list = spWeb.lists.getById(spList)

        list.items.getById(itemId).update({
            Title: title,
            Description: desc,
            Priority: prio,
            DueDate: due,
        }).then(i => {
            console.log(i);
            alert("Item has been updated!")
        })
    }


    /**
     * Removes an item from the chosen Sharepoint list.
     * @param itemId ID of item to be removed
     * @param listId SharePoint list ID
     * @param webUrl SharePoint site URL
     */
    @action
    removeListItem = (itemId: number, listId: any, webUrl: any) => {
        let spWeb = Web(webUrl)

        spWeb.lists.getById(listId).items.getById(itemId).delete().then(() =>
        {
            alert("Task with ID:" + itemId + " has been deleted.")
            window.location.reload()
        })      
    }

    /**
     * Set a MS calendar reminder for a list item
     * @param id ID of item to set reminder for
     */
    @action 
    setReminder = (id: number) => {

        //TODO: Create calendar event using details of list item.
        alert("Reminder added to calendar");
    }
}

const store = new ToDoListStore();

export default store;


