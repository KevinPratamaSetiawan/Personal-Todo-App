export type SubTask = {
    id: number;
    content: string;
    completed: boolean;
    listStyle: string;
    indent: number;
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
    tags: TagProp[];
}

export type NotificationProp = {
    todoId: string;
    id: number;
    actionType: number;
}

export type TagProp = {
    content: string;
    labelColor: string;
}