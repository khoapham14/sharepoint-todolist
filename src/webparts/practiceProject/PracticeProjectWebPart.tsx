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
import { PropertyFieldButtonWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldButtonWithCallout';
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/Callout';
import { sp, Web, IListEnsureResult, IFieldAddResult, IFieldUpdateResult, IFieldCreationProperties, IItemAddResult } from "@pnp/sp/presets/all";
import { ToDoListProvider } from './ToDoListContext';
import { ChoiceFieldFormatType, DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType } from "@pnp/sp/fields/types";
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
          this.properties.title = newTitle;
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
                  label: "Select To Do List",
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
                }),
                PropertyFieldButtonWithCallout('createListButton', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'buttonWithCalloutFieldId',
                  calloutContent: React.createElement('p', {}, "Creates a sample To Do list with the required fields. You can change the list / column names in SharePoint later."),
                  calloutWidth: 150,
                  text: "Create Sample List",
                  onClick: this.createToDoList.bind(this),
                  disabled: false
                }),
              ]
            }
          ]
        }
      ]
    };
  }

  private async createToDoList(): Promise<void> {
    this.properties.loading = true;
    this.context.propertyPane.refresh();

    let w: any = window;
    let context = this.context;
    let spWeb = Web(this.context.pageContext.web.absoluteUrl);
    let spListTitle = "ToDo" + Date.now(); //Creating a unique identifier for the glossary list to prevent 304s from being thrown.
    let spListDescription = "To Do List";
    let spListTemplateId = 100;
    let spEnableCT = false;
    await spWeb.lists.ensure(spListTitle, spListDescription, spListTemplateId, spEnableCT).then((listEnsureResult: IListEnsureResult) => {
      if (listEnsureResult.created) {
        // CREATE FIELDS
        this.addToDoListFields(listEnsureResult)
          .then((res: any) => {
            this.properties.loading = false;
            context.propertyPane.close();
            context.propertyPane.open();
            w.alert("The To Do list has been created");
          })
          .catch((e: any) => {
            console.error(e);
          });
      }
    }).catch(err => {
      this.properties.loading = false;
      console.log(err);
      w.alert("Something went wrong creating the list!");
      context.propertyPane.refresh();
    });
  }

  private addToDoListFields = async (listEnsureResult: IListEnsureResult): Promise<void> => {
    try {
      const prioChoices = [`High`, `Med`, `Low`]

      await listEnsureResult.list.fields.getByInternalNameOrTitle("Title");
      await listEnsureResult.list.fields.addMultilineText("Description", 10, true, false, false, true, {
        Description: "The description of the task",
        Group: "GlossaryList",
        Hidden: false,
        Indexed: false,
        Required: true
      });

      await listEnsureResult.list.fields.addChoice("Priority", prioChoices, ChoiceFieldFormatType.Dropdown, false)
      await listEnsureResult.list.fields.addDateTime("DueDate", DateTimeFieldFormatType.DateOnly, CalendarType.Gregorian, DateTimeFieldFriendlyFormatType.Disabled)
      await listEnsureResult.list.items.add({
        "Title": "A new task",
        "Description": "This is the description of my task",
        "Priority": "High",
        "DueDate": "2021-01-01"
      })

    } catch (e) {
      throw e;
    }
  }
}
