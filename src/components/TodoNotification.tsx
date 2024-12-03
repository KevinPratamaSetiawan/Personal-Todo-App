import Toast from 'react-bootstrap/Toast';

type TodoNotificationProps = {
    closeNotification: (notifId: number) => void;
    todoId: string;
    notifId: number;
    actionType: number
}

export default function TodoNotification ({closeNotification, todoId, notifId, actionType}: TodoNotificationProps) {
  const notifType = [
    {},{
        action: '1. Task added.',
        actionIcon: 'bg-success add-icon',
        actionName: ' added',
        actionDetail: ''
    },{
        action: '2. Task edited.',
        actionIcon: 'bg-warning edit-icon',
        actionName: ' updated',
        actionDetail: ''
    },{
        action: '3. Task deleted.',
        actionIcon: 'bg-danger del-icon',
        actionName: ' deleted',
        actionDetail: ''
    },{
        action: '4. Schedule completed.',
        actionIcon: 'bg-scheduleColor schedule-icon',
        actionName: ', schedule completed',
        actionDetail: ''
    },{
        action: '5. Schedule uncompleted.',
        actionIcon: 'bg-completeColor complete-icon',
        actionName: ', schedule marked incomplete',
        actionDetail: ''
    },{
        action: '6. Task prioritized.',
        actionIcon: 'bg-priorityColor priority-icon',
        actionName: ' marked as priority',
        actionDetail: ''
    },{
        action: '7. Task unprioritized.',
        actionIcon: 'bg-taskColor task-icon',
        actionName: ' unmarked as priority',
        actionDetail: ''
    },{
        action: '8. Task completed.',
        actionIcon: 'bg-completeColor complete-icon',
        actionName: ' completed',
        actionDetail: ''
    },{
        action: '9. Task uncompleted.',
        actionIcon: 'bg-taskColor task-icon',
        actionName: ' marked incomplete',
        actionDetail: ''
    },{
        action: '10. Sub-Task Completed.',
        actionIcon: 'bg-completeColor subcomplete-icon',
        actionName: ' Sub-Task completed',
        actionDetail: ''
    },{
        action: '11. Sub-Task uncompleted.',
        actionIcon: 'bg-taskColor subtask-icon',
        actionName: ' Sub-Task marked incomplete',
        actionDetail: ''
    },{
      action: '12. GET Data.',
      actionIcon: 'bg-getColor getData-icon',
      actionName: ' data copied',
      actionDetail: ''
    },{
      action: '13. PUT Data.',
      actionIcon: 'bg-putColor putData-icon',
      actionName: ' data updated',
      actionDetail: ''
    },{
      action: '14. DEL Data.',
      actionIcon: 'bg-delColor delData-icon',
      actionName: ' data deleted',
      actionDetail: ''
    },
  ];

    return (
        <Toast 
            onClose={() => closeNotification(notifId)} 
            data-bs-theme="dark"
            className='mb-2'
            key={notifId}
        >
          <Toast.Header>
            <span className={`text-dark fw-3 rounded me-2 ${notifType[actionType].actionIcon}`} ></span>
            <strong className="me-auto">{todoId}{notifType[actionType].actionName}</strong>
          </Toast.Header>
          {/* <Toast.Body>{notifType[actionType].actionDetail}</Toast.Body> */}
        </Toast>
    );
};