import { useContext, useState } from 'react';
import { Table, Select, Input, Pagination } from 'antd';
import { UsersContext } from '../../context/UsersContext';
const { Option } = Select;
const { Search } = Input;
import {User} from '../../types/index'
import './TabEmployees.css'
import { Dayjs } from 'dayjs';



 const tableColumns = [
    {
        title: 'First Name',
        dataIndex: 'FirstName',
        key: 'FirstName',
        sorter: (a: User, b: User) => a.FirstName.localeCompare(b.FirstName),
    },
    {
        title: 'Last Name',
        dataIndex: 'LastName',
        key: 'LastName',
        sorter: (a: User, b: User) => a.LastName.localeCompare(b.LastName),
    },
    {
        title: 'Start Date',
        dataIndex: 'StartDate',
        key: 'StartDate',
        sorter: (a: User, b: User) => a.StartDate.unix() - b.StartDate.unix(),
        render: (value: Dayjs) => {
            console.log(value)
            return (<p>{value.format("MM/DD/YYYY")}</p>)
        }
    },
    {
        title: 'Department',
        dataIndex: 'Department',
        key: 'Department',
        sorter: (a: User, b: User) => a.Department.localeCompare(b.Department),
    },
    {
        title: 'Date of Birth',
        dataIndex: 'DateOfBirth',
        key: 'DateOfBirth',
        sorter: (a: User, b: User) => a.DateOfBirth.unix() - b.DateOfBirth.unix(),
        render: (value: Dayjs) =>  (<p>{value.format("MM/DD/YYYY")}</p>)
    },
    {
        title: 'Street',
        dataIndex: 'Street',
        key: 'Street',
        sorter: (a: User, b: User) => a.Street.localeCompare(b.Street),
    },
    {
        title: 'City',
        dataIndex: 'City',
        key: 'City',
        sorter: (a: User, b: User) => a.City.localeCompare(b.City),
    },
    {
        title: 'State',
        dataIndex: 'State',
        key: 'State',
        sorter: (a: User, b: User) => a.State.localeCompare(b.State),
    },
    {
        title: 'Zip Code',
        dataIndex: 'ZipCode',
        key: 'ZipCode',
        sorter: (a: User, b: User) => a.ZipCode - b.ZipCode,
    },
];

function TabEmployees() {
    const usersContext = useContext(UsersContext);
    const { users } = usersContext;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState('');

    const handlePageSizeChange = (value: number) => {
        
        setPageSize(value);
    };

    const handleSearch = (value:string) => {
        setSearchText(value.toLowerCase());
    };

    const filteredUsers = users.filter(user =>
        Object.values(user).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(searchText)
        )
    );

    const sortUsers = filteredUsers;
   

    
    return (
        <div>
            <div className="header-table-container">
                <Select
                defaultValue={10}
                style={{ width: 120 }}
                onChange={handlePageSizeChange}
                >
                    <Option value={10}>10 lignes</Option>
                    <Option value={20}>20 lignes</Option>
                    <Option value={30}>30 lignes</Option>
                    <Option value={40}>40 lignes</Option>
                    <Option value={50}>50 lignes</Option>
                </Select>
                <Search placeholder="Search"  onSearch={handleSearch}/>
            </div>
            <Table
                dataSource={sortUsers}
                columns={tableColumns}
                pagination={false}
                bordered
                rowKey="id"
                locale={{ emptyText: 'No data available in table' }}
            />
            <div className='pagination-container'>
                <div>
                    {`Showing ${(currentPage - 1) * pageSize + 1} to ${Math.min(
                        currentPage * pageSize,
                        sortUsers.length
                    )} of ${sortUsers.length} entries`}
                </div>
                <Pagination
                    current={currentPage}
                    total={sortUsers.length}
                    pageSize={pageSize}
                    onChange={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default TabEmployees