import * as React from 'react';
import styles from './PracticeProject.module.scss';
import { IPracticeProjectProps } from './IPracticeProjectProps';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { DetailsList, IColumn } from "@fluentui/react";
import { sp, Web } from '@pnp/sp/presets/all';


interface IPracticeProjectState{
  list: any,
  showPlaceholder: boolean,
  columns: IColumn[];
}


export default class PracticeProject extends React.Component<IPracticeProjectProps, IPracticeProjectState> {
  constructor(props: IPracticeProjectProps){
    super(props);

    this.state={
      list: [],
      showPlaceholder: true,
      columns: [ 
        {
          key: 'Title',
          name: 'Title',
          fieldName: 'Title',
          minWidth: 50,
          maxWidth: 250
        },
        {
          key: 'Description',
          name: 'Description',
          fieldName: 'Description',
          minWidth: 50,
          maxWidth: 250
        },
        {
          key: 'Priority',
          name: 'Priority',
          fieldName: 'Priority',
          minWidth: 50,
          maxWidth: 250
        },
        {
          key: 'DueDate',
          name: 'DueDate',
          fieldName: 'DueDate',
          minWidth: 50,
          maxWidth: 250
        }
      ]
    }
  }
  
  private getListData() : void {
    let spWeb = Web(this.props.webUrl);

    spWeb.lists.getById(this.props.list).items.select("Title", "Description", "Priority", "DueDate").get().then((results : any[]) => {
      if(results !== null){
        console.log(results);
        this.setState({
          list: results,
          showPlaceholder: false,
        })
      }
      else{
        alert("Failed to retrieve list data. Make sure you have created and selected a ToDo List!");
      }
    })
  }


  public componentDidMount(): void {
    // load information about terms after the component has been
    // initiated on the page
    if (this.props.list !== null && this.props.list !== "") {  
      this.getListData();
    }
  }

  public componentDidUpdate(prevProps: IPracticeProjectProps, prevState: IPracticeProjectState) {
    if (this.props.list !== prevProps.list) {
      if (this.props.list !== null && this.props.list !== "") {
        this.getListData();
      } else {
        this.setState({
          showPlaceholder: true
        });
      }
    }
  }
  
  /*
   * Opens the web part property pane
  */
  private _configureWebPart() {
    this.props.context.propertyPane.open();
  }

  public render(): React.ReactElement<IPracticeProjectProps> {

    // Check if placeholder needs to be shown
    if (this.state.showPlaceholder) {
      return (
        <Placeholder
          iconName="Edit"
          iconText="To do list configuration"
          description="Please configure the web part to show a todo list."
          buttonLabel="Configure"
          onConfigure={this._configureWebPart.bind(this)} />
      );
    }
    else{
      return (
        <div className={ styles.practiceProject }>
         <DetailsList items={this.state.list} columns={this.state.columns} /> 
        </div>
      );
    }
  }
}
