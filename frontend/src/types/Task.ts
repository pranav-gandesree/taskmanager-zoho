export default interface Task  {
        id: bigint;
        title: string;
        description: string;
        pending: boolean
}

export interface TaskItemProps {
    task: Task;
    onDelete: (id: bigint) => void;
    onEdit: (task: Task) => void;
  }