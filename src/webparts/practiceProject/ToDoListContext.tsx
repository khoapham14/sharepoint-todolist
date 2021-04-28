import * as React from 'react';
import store from './ToDoListStore';


type ToDoListContextValue = {
    todoStore: typeof store;
}

const ToDoContext = React.createContext<ToDoListContextValue>({} as ToDoListContextValue);


const todoStore = store;

export const ToDoListProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) =>{

    return (<ToDoContext.Provider value={{ todoStore }}>
        {children}
    </ToDoContext.Provider>);
}

export const useTodoStore = () => React.useContext(ToDoContext);

