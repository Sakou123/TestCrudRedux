import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props{
    openForm: () => void;
}

export default function NavBar({openForm}: Props) {
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/480px-Android_O_Preview_Logo.png' style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick={openForm} positive content='Create Activity'/>    
                </Menu.Item> 
            </Container>
        </Menu>
    )
}