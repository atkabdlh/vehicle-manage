import React, {Component} from 'react'
import firebase from './firebase'
import './App.css'
import 'antd/dist/antd.css'
import { Form, Input, Button, Select, Table } from "antd"

const { Option } = Select;

const layout = {
    labelCol:{
        span: 5,
    },
    wrapperCol: {
        span: 6,
    },
};

const tableHead = [
    {
        title: 'Vehicle ID',
        dataIndex: 'id',
        sorter: (a, b) => a.type.length - b.type.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Type',
        dataIndex: 'type',
        filters: [
            {
                text: 'Scooter',
                value: 'Scooter',
            },
        ],
        onFilter: (value, record) =>
            record.type.indexOf(value) === 0,
        sorter: (a, b) => a.type.length - b.type.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Lock/Unlock',
        dataIndex: 'lock',
        filters: [
            {
                text: 'Lock',
                value: 'Lock',
            },
            {
                text: 'Unlock',
                value: 'Unlock',
            },
        ],
        onFilter: (value, record) =>
            record.type.indexOf(value) === 0,
        sorter: (a, b) => a.type.length - b.type.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Current Speed',
        dataIndex: 'speed',
    },
    {
        title: 'Battery Level',
        dataIndex: 'battery',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        filters: [
            {
                text: 'PARKING',
                value: 'PARKING',
            },
            {
                text: 'MOVING',
                value: 'MOVING',
            },
            {
                text: 'IDLING',
                value: 'IDLING',
            },
            {
                text: 'TOWING',
                value: 'TOWING',
            },
        ],
        onFilter: (value, record) =>
            record.type.indexOf(value) === 0,
        sorter: (a, b) => a.type.length - b.type.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Location',
        dataIndex: 'location',
    },
    {
        title: 'Last Updated',
        dataIndex: 'updated',
    },
]

class App extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            vehicles: []
        }
        this.showForm = this.showForm.bind(this);
        const vehicleRef = firebase.database().ref('vehicles');
        vehicleRef.on('value', (snapshot) =>{
            let vehicles = snapshot.val();
            let newState = [];
            for(let vehicle in vehicles) {
                newState.push({
                    id: vehicle,
                    type: vehicles[vehicle].type,
                    locked: vehicles[vehicle].locked,
                    speed: vehicles[vehicle].speed,
                    battery: vehicles[vehicle].battery,
                    status: vehicles[vehicle].status,
                    location: vehicles[vehicle].location,
                    updated: vehicles[vehicle].updated
                });
            }
            this.setState({
                vehicles: newState
            });
        });
    }
    showVehicles() {
        console.log(this.state.vehicles);
    }
    showForm() {
        if (this.state.show) {
            console.log('true');
            this.setState({
                show: false
            });
        }
        else {
            console.log('false');
            this.setState({
                show: true
            });
        }
    }

    render() {
    return (
        <div className="App">
            <div id="head">
                <h4>Vehicle Management</h4>
            </div>
            {!this.state.show && (
                <div id="body">
                    <Button type="primary" shape="round" onClick={this.showForm}>+ New Vehicle</Button>
                    <Table columns={tableHead} dataSource={this.state.vehicles}/>
                </div>
            )}
            {this.state.show && (
                <div id="new">
                    <Form {...layout} name="new" initialValues={{remember: true,}}>
                        <Form.Item name="type" label="Type" rules={[{required: true,},]}>
                            <Select defaultValue="Scooter">
                                <Option value="Scooter">Scooter</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="lock" label="Lock/Unlock" rules={[{required: true,},]}>
                            <Select defaultValue="Unlock">
                                <Option value="Unlock">Unlock</Option>
                                <Option value="Lock">Lock</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="speed" label="Current Speed" rules={[{required: true,},]}>
                            <Input suffix="km/h"/>
                        </Form.Item>
                        <Form.Item name="battery" label="Battery Level" rules={[{required: true,},]}>
                            <Input suffix="%"/>
                        </Form.Item>
                        <Form.Item name="status" label="Status" rules={[{required: true,},]}>
                            <Select defaultValue="MOVING">
                                <Option value="MOVING">MOVING</Option>
                                <Option value="PARKING">PARKING</Option>
                                <Option value="IDLING">IDLING</Option>
                                <Option value="TOWING">TOWING</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="location" label="Location" rules={[{required: true,},]}>
                            <Input/>
                        </Form.Item>
                        <div id="buttons">
                            <Button type="primary" onClick={this.showForm}>Cancel</Button>
                            <Button type="primary" onClick={this.showForm}>Submit</Button>
                        </div>
                    </Form>
                </div>
            )}
        </div>
    )
  }
}

export default App
