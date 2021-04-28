import { observable, action, toJS } from 'mobx';
import { sp, Web } from '@pnp/sp/presets/all';


class ToDoListStore{
    @observable list: any[] = []

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

    @action
    updateListItem = (id: number, title: string, desc: string, priority: string, duedate: string, spList: any) => {
        let list = sp.web.lists.getById(spList)
        list.items.getById(id).update({
            Title: title,
            Description: desc,
            Priority: priority,
            DueDate: duedate,
        }).then(i => {
            console.log(i);
        }); 
    }

    @action
    removeListItem = (itemId: number, listId: any, webUrl: any) => {
        let spWeb = Web(webUrl)

        spWeb.lists.getById(listId).items.getById(itemId).delete()

        alert("Task with ID:" + itemId + " has been deleted.")
    }

    @action 
    setReminder = (id: number) => {
        // Function to set reminder
    }
}

const store = new ToDoListStore();

export default store;
