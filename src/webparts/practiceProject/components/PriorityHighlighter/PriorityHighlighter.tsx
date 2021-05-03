import * as React from 'react';

import styles from './PriorityHighlighter.module.scss';


/**
 * A component that highlights/labels text for priority levels.
 * @param props Receives a string prop which describes a task priority level from Item List.
 * @returns Nothing
 */
function PriorityHighlighter(props: { priority: string}) {

    // Conditionally add styles to priority text.
    switch(props.priority){
        case "High":
            return(
                <div className={styles.highPrio}>
                    {props.priority}
                </div>
            );
        case "Med":
            return(
                <div className={styles.medPrio}>
                    {props.priority}
                </div>
            );
        case "Low":
            return(
                <div className={styles.lowPrio}>
                    {props.priority}
                </div>
            );
        default:
            break;
    }
}

export default PriorityHighlighter;