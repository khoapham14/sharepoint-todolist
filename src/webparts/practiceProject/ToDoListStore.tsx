import * as React from "react";
import { graph } from '@pnp/graph';
import '@pnp/graph/calendars';
import '@pnp/graph/users';
import { observable, action } from 'mobx';
import { Web } from '@pnp/sp/presets/all';
import Swal from 'sweetalert2';

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
              Swal.fire({
                title: 'Error!',  
                text: "Failed to retrieve list data. Make sure you have created and selected a ToDo List!",
                icon: 'error'
              });
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
            Swal.fire({
                title: "Success", 
                text: "Item has been updated!", 
                icon: "success"
            }).then( () => {
                window.location.reload()
            });
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
            Swal.fire("Success",  "Task with ID:" + itemId + " has been deleted.", "success").then( () => {
                window.location.reload()
            });
        })      
    }

    /**
     * Set a MS calendar reminder for a list item
     * @param id ID of item to set reminder for
     */
    @action 
    setReminder = async (title: string, desc: string, due: any) => {
        await graph.me.calendar.events.add({
            "subject": title,
            "body": {
                "content": desc
            },
            "start": {
                "dateTime": due.toString(),
                "timeZone": "Pacific/Auckland"
            },
            "end": {
                "dateTime": due.toString(),
                "timeZone": "Pacific/Auckland"
            }
        }).then((i) => {
            console.log(i)
            Swal.fire("Success", "Reminder added to calendar", "success").then( () => {
                window.location.reload()
            });
        })

        // await graph.me.people().then(i => {
        //     console.log(i)
        // })
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
            Swal.fire("Error", "Required fields cannot be empty. Please input all details for new task!", "error");
        } else{
            list.items.add({
                Title: title,
                Description: desc,
                Priority: prio,
                DueDate: due,
            }).then(i => {
                console.log(i);
                Swal.fire("Success", "New task added to list!", "success").then( () => {
                    window.location.reload()
                });
            })
        }      
    }
}

const store = new ToDoListStore();

export default store;


