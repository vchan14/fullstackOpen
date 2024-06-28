import {createContext, useContext, useReducer} from "react";

function notificationReducer(state, action) {
  switch (action.type) {
    case 'update':
      return action.payload;
    case 'clear':
      return '';
    default:
      throw new Error('Unknown action type');
  }
}


const notificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, '');

  return (
    <notificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </notificationContext.Provider>
  );
}

export const useNotification = () => {
  const notificationAndDispatch =  useContext(notificationContext);
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch =  useContext(notificationContext);
  return notificationAndDispatch[1]
}

export default notificationContext;