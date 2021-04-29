import * as React from 'react';
import styles from './ItemList.module.scss';
import { useObserver } from 'mobx-react-lite';
import store from '../../ToDoListStore';
import CustomButton from '../CustomButton/CustomButton';
import PriorityHighlighter from '../PriorityHighlighter/PriorityHighlighter';

function ItemList(props: { webUrl: any, listID: any }) {
  return useObserver(() => (
    <div>
      <p className={styles.pageHeader}> To Do List </p>
      <div className={styles.flexContainer}>
        <div className={styles.titleHeader}>  Task </div>
        <div className={styles.descriptionHeader}>  Task Description </div>
        <div className={styles.priorityHeader}> Priority </div>
        <div className={styles.dueDateHeader}>  Due Date </div>
        <div className={styles.buttonHeader}> Actions </div>
      </div>
      {store.list.length > 0 ? store.list.map((listItems) => {
        if (listItems.Title === undefined || listItems.Title === null) {
          return (<p> No items in todo list</p>)
        } else {
          return (
            <div className={styles.flexContainer}>
              <div className={styles.title}>  {listItems.Title} </div>
              <div className={styles.description}>  {listItems.Description} </div>
              <div className={styles.priority}> <PriorityHighlighter priority={listItems.Priority} /> </div>
              <div className={styles.dueDate}>  {listItems.DueDate.slice(0, 10)} </div>
              <div className={styles.buttonContainer}>
                <CustomButton buttonText={"Remind"} listID={props.listID} webUrl={props.webUrl} itemID={listItems.ID} />
                <CustomButton buttonText={"Edit"} listID={props.listID} webUrl={props.webUrl} itemID={listItems.ID} />
                <CustomButton buttonText={"Delete"} listID={props.listID} webUrl={props.webUrl} itemID={listItems.ID} />
              </div>
            </div>
          );
        }
      }) : ""}
    </div>
  ));
}

export default ItemList;