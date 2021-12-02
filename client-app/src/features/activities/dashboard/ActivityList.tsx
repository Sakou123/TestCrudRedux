import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
    activities: Activity[];
    selectActivity: (id:string) => void
    deleteActivity: (id: string) => void;
    submit: boolean;
}

export default function ActivityList({activities, selectActivity, deleteActivity, submit}: Props){

    const [target, setTarget] = useState('');
    
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return(
        <Segment >
            <Item.Group divided>
                {activities.map(activities => (
                    <Item key={activities.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activities.title}</Item.Header>
                            <Item.Meta>{activities.date}</Item.Meta>
                            <Item.Description>
                                <div>{activities.description}</div>
                                <div>{activities.city},{activities.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(activities.id)} floated='right' content='View' color='blue' />
                                <Button name={activities.id} loading={submit && target === activities.id} onClick={(e) => handleActivityDelete(e, activities.id)} floated='right' content='Delete' color='red' />
                                <Label basic content={activities.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}