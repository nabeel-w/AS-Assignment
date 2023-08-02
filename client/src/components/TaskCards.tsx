import React, { useState, useEffect } from "react";
import axiosInstance from "../api/api";
import { Box, Button, Card, CardContent, Paper, Stack, Typography } from "@mui/material";
import { Check, Clear, Delete } from "@mui/icons-material";

interface Task {
    _id: string,
    task: string,
    desc: string,
    complete:boolean
}

function TaskCards() {
    const token: string = localStorage.getItem("id")
    const [tasks, setTasks] = useState<Task[]>([]);
    const [rerender,setRerender]=useState(false);
    useEffect(() => {
        const data = new URLSearchParams({
            id: token
        });
        axiosInstance.post("api/task/", data)
            .then(res => {
                //console.log(res);
                const task: Array<Task> = res.data.userTask
                if(task==undefined){
                    setTasks([]);
                    return;
                }
                setTasks([...task]);
            })
            .catch(err => { console.log(err) })
    }, [rerender,token])

    function handleComplete(e) {
        const task_id:string=e.target.id;
        const data=new URLSearchParams({
            task_id: task_id,
            id: token
        })
        axiosInstance.patch("api/task/update",data)
        .then(res=>{
            console.log(res);
            setRerender((prevRerender)=>(!prevRerender));
        })
        .catch(err=>{console.log(err)})
    }

    function handleDelete(e){
        const task_id:string=e.target.id;
        const data=new URLSearchParams({
            id: token
        })
        axiosInstance.delete(`api/task/delete/${task_id}`, data)
        .then(res=>{
            console.log(res);
            setRerender((prevRerender)=>(!prevRerender));
        })
        .catch(err=>{console.log(err)})
    }




    if (tasks.length !== 0) {
        return (
            <Box style={{ margin: "5px 0px", width: "100%", height: '88vh', overflow: "auto", display: "flex", flexWrap: "wrap" }} gap={3}>
                {tasks.map(task => {
                    return (
                        <Paper key={task._id} style={{ width: "20%", height: "25vh", padding: "20px", margin: "40px 5px" }} elevation={5}>
                            <Card sx={{ width: "100%", height: "20vh", overflow: "auto" }} elevation={-1} >
                                <CardContent>
                                    <Typography variant="h6" noWrap component="div" sx={task.complete?{ textDecoration: 'line-through' }:{}}>
                                        {task.task}
                                    </Typography>
                                    <Typography sx={{ margin: "10px 0px" }} color="text.secondary">
                                        {task.desc}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Stack direction="row" spacing={2} >
                                <Button variant="outlined" id={task._id} onClick={handleDelete} color="error" startIcon={<Delete />}>
                                    Delete
                                </Button>
                                <Button variant="outlined" color={task.complete?"error":"primary"} id={task._id} onClick={handleComplete} startIcon={task.complete?<Clear />:<Check />}>
                                    {task.complete?"Not Complete":"Completed"}
                                </Button>
                            </Stack>
                        </Paper>
                    )
                })}
            </Box>
        )
    }
    return (
        <Typography variant="h3" noWrap component="div" style={{textAlign:"center", padding: "20px", margin: "40px 5px"}}>Add Some Tasks</Typography>
    )
}

export default TaskCards;