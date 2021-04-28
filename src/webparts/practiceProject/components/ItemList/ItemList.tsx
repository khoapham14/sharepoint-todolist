import * as React from 'react';
import styles from './ItemList.module.scss';
import { useObserver } from 'mobx-react-lite';
import store from '../../ToDoListStore';




function ItemList() {
  return useObserver(() => (
    <div>
      <p className={styles.pageHeader}> To Do List </p>
      {store.list.length > 0 ? store.list.map((listItems) => {
        if (listItems.Title === undefined || listItems.Title === null) {
          return (<p> No items in todo list</p>)
        } else {
          return (
            <div className={styles.flexContainer}>
              <div className={styles.title}>  {listItems.Title} </div>
              <div className={styles.description}>  {listItems.Description} </div>
              <div className={styles.priority}> {listItems.Priority} </div>
              <div className={styles.dueDate}>  {listItems.DueDate.slice(0,10)} </div>
              <div className={styles.buttonContainer}> <button onClick={() => { }}> Remind me </button> 
               <button onClick={() => { }}> Edit  </button>  
               <button onClick={() => { }}> Delete </button></div>
            </div>
          );
        }
      }) : ""}

      {console.log(store.list)}

    </div>
  ));
}

export default ItemList;