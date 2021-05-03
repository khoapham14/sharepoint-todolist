import * as React from 'react';
import styles from './CustomButton.module.scss';
import { DefaultButton } from '@fluentui/react';
import PopUpDialog from '../PopUpDialog/PopUpDialog';

interface CustomButtonProps{
  buttonText: string, 
  listID: any, 
  webUrl: any, 
  itemID?: number, 
  itemTitle?: string, 
  itemDesc?: string, 
  itemPrio?: string, 
  itemDue?: string
}


/**
 * A custom button for displaying actions and controlling PopUpDialog.
 * @param props Takes in a string from ItemList to use as button title. Other props are for passing to PopUpDialog
 * @returns A Default MS Button along with conditonally rendering the PopUpDialog
 */
function CustomButton(props: CustomButtonProps) {

  //State to show/hide dialog. 
  const [ hideDialog, setHideDialog ] = React.useState(false);


  // Function to pass as props to Dialog for toggling this.state.hideDialog.
  const handleStateChange = (value : boolean) => { 
    setHideDialog(value);
  }

  return (
    <>
    <DefaultButton className={styles.customButton} onClick={() => setHideDialog(true)}> {props.buttonText} </DefaultButton>

    {/* Show corresponding dialog on button click */}
      {hideDialog ? 
        <PopUpDialog 
          title={props.buttonText} 
          listID={props.listID} 
          webUrl={props.webUrl} 
          itemID={props.itemID} 
          itemTitle={props.itemTitle}
          itemDesc={props.itemDesc}
          itemPrio={props.itemPrio}
          itemDue={props.itemDue}
          handleStateChange={handleStateChange}
          dialogState={hideDialog}
        />  
        : ""
      }
    </>
  );
}

export default CustomButton;