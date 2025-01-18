import React, { useState, useEffect } from 'react';
import { getTasks } from '../api/tasks';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks().then(setTasks);
        console.log(tasks)
    }, []);


    return (
        <div>
            <h1>Task List</h1>
            <ul>
               <li>hi</li>
            </ul>
        </div>
    );
};

export default TaskList;
