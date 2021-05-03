import * as React from 'react';
import styles from './PracticeProject.module.scss';
import { IPracticeProjectProps } from './IPracticeProjectProps';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import store from '../ToDoListStore';
import ItemList from '../components/ItemList/ItemList';


interface IPracticeProjectState {
  showPlaceholder: boolean,
}


export default class PracticeProject extends React.Component<IPracticeProjectProps, IPracticeProjectState> {
  constructor(props: IPracticeProjectProps) {
    super(props);

    this.state = {
      showPlaceholder: true,
    }
  }


  private getListData(callback: Function): void {
    if (this.props.list === null || this.props.list === "") {
      this.setState({
        showPlaceholder: true
      });
    } else {
      store.getListData(this.props.list, this.props.webUrl);
      callback();
    }

  }


  public componentDidMount(): void {
    // load information about terms after the component has been
    // initiated on the page
    if (this.props.list !== null && this.props.list !== "") {
      this.getListData(() => { this.setState({ showPlaceholder: false })});
    }
  }

  public componentDidUpdate(prevProps: IPracticeProjectProps, prevState: IPracticeProjectState) {
    if (this.props.list !== prevProps.list) {
      if (this.props.list !== null && this.props.list !== "") {
        this.getListData(() => { this.setState({ showPlaceholder: false }) })
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
          iconText="Configuration"
          description="Please configure the web part to show a todo list."
          buttonLabel="Configure"
          onConfigure={this._configureWebPart.bind(this)} />
      );
    }
    else {
      return (
        <ItemList listID={this.props.list} webUrl={this.props.webUrl} />
      );
    }
  }
}
