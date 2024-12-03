export type SubTask = {
    id: number;
    content: string;
    completed: boolean;
    listStyle: string;
}

export type todoItem = {
    id: string;
    title: string;
    description: string;
    subTask: [] | SubTask[];
    completed: boolean;
    priority: boolean;
    schedule: boolean;
    scheduleType: string;
    deadlineStartDate: string;
    deadlineEndDate: string;
    deadlineStartTime: string;
    deadlineEndTime:string;
    tags: string[];
}

export type NotificationProp = {
    todoId: string;
    id: number;
    actionType: number;
}