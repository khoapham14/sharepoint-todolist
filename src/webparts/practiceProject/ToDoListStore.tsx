import * as React from "react";
import { observable, action, toJS } from 'mobx';
import { Web } from '@pnp/sp/presets/all';

class ToDoListStore{
    // A list that can be used by all component
    @observable list: any[] = []

    /**
     * Fetch data from a Sharepoint List and add to this list array.
     * @param listId SharePoint list ID
     * @param webUrl SharePoint site URL
     */
    @action 
    getListData = ( listId: any, webUrl: any) =>{
        let spWeb = Web(webUrl)
        let toDoList = spWeb.lists.getById(listId)

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
     * @param title (Optional) New Title (or Task) for the list item 
     * @param desc (Optional) New Description for the list item
     * @param prio (Optional) New Priority Level for the list item
     * @param due (Optional) New Due Date for the list item
     * @param itemId ID of the list item to be updated
     * @param listId SharePoint list ID
     * @param webUrl SharePoint site URL
     */
    @action
    updateListItem = (itemId: number, listId: any, webUrl: any, title?: string, desc?: string, prio?: string, due?: any) => {
        let spWeb = Web(webUrl);
        let list = spWeb.lists.getById(listId)

        list.items.getById(itemId).update({
            Title: title,
            Description: desc,
            Priority: prio,
            DueDate: due,
        }).then(i => {
            console.log(i);
            alert("Item has been updated!");
            window.location.reload();
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

    /**
     * Adds a new task to the chosen Sharepoint list.
     * @param listId SharePoint list ID
     * @param webUrl SharePoint site URL
     * @param title Title of the new task
     * @param desc Description of the new task
     * @param prio Priority level of the new task
     * @param due Due date of the new task
     */
    @action 
    addNewTask = (listId: any, webUrl: any, title: string, desc: string, prio: string, due: any) => {

        let spWeb = Web(webUrl);
        let list = spWeb.lists.getById(listId)

        if( title === undefined || desc === undefined || prio === undefined || due === undefined)
        {
            alert("Required fields cannot be empty. Please input all details for new task!");
        } else{
            list.items.add({
                Title: title,
                Description: desc,
                Priority: prio,
                DueDate: due,
            }).then(i => {
                console.log(i);
                alert("New task added to list!");
                window.location.reload();
            })
        }      
    }
}

const store = new ToDoListStore();

export default store;


