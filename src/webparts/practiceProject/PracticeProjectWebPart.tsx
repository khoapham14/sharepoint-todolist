import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PracticeProjectWebPartStrings';
import PracticeProject from './components/PracticeProject';
import { IPracticeProjectProps } from './components/IPracticeProjectProps';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { sp, Web, IListEnsureResult, IFieldAddResult, IFieldUpdateResult, IFieldCreationProperties, IItemAddResult } from "@pnp/sp/presets/all";
import { ToDoListProvider } from './ToDoListContext';
import { graph } from "@pnp/graph";


export interface IPracticeProjectWebPartProps {
  title: string;
  list: string;
  loading: boolean;
  // taskName: string;
  // taskDescription: string;
  // taskStakeholder: string;
  // taskDueDate: string;
}


export default class PracticeProjectWebPart extends BaseClientSideWebPart<IPracticeProjectWebPartProps> {

  public onInit(): Promise<void> {
    this.properties.loading = false;
   
    return super.onInit().then(_ => {

      // other init code may be present
  
      graph.setup({
        spfxContext: this.context
      });
    });
  }


  public render(): void {
    const element: React.ReactElement<IPracticeProjectProps> = React.createElement(
      PracticeProject,
     
      {
        webUrl: this.context.pageContext.web.absoluteUrl,
        spHttpClient: this.context.spHttpClient,
        title: this.properties.title,
        list: this.properties.list,
        displayMode: this.displayMode,
        onTitleUpdate: (newTitle: string) => {
          this.properties.title= newTitle;
        },
        context: this.context
      }
    
    );
    ReactDom.render(
      <ToDoListProvider>
        {element}
      </ToDoListProvider>
    , this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      showLoadingIndicator: this.properties.loading,
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldListPicker('list', {
                  label: "Select todo list",
                  selectedList: this.properties.list,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
