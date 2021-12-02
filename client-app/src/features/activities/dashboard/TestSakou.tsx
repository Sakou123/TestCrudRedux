import React from 'react';
import { Table, TableBody, TableHeader } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
    activities: Activity[];
}

export default function TableSakou(props: Props) {
    return(
        <Table>
        <TableHeader>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Venue</Table.HeaderCell>
          </Table.Row>
        </TableHeader>
        <TableBody>
          {props.activities.map(activity => (
            <Table.Row>
              <Table.Cell>{activity.title}</Table.Cell>
              <Table.Cell>{activity.date}</Table.Cell>
              <Table.Cell>{activity.description}</Table.Cell>
              <Table.Cell>{activity.city}</Table.Cell>
              <Table.Cell>{activity.venue}</Table.Cell>
            </Table.Row>
          ))}
        </TableBody>
      </Table>
    )
}