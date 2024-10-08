import { useState } from 'react';
import { Table, Select, Input, Pagination } from 'antd';
const { Option } = Select;
const { Search } = Input;
import {EmployeeFromDBConvert} from '../../types/index'
import './TabEmployees.css'
import { Dayjs } from 'dayjs';
import useFetchGetEmployees from '../../hook/useFetchGetEmployees';



 const tableColumns = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'FirstName',
        sorter: (a: EmployeeFromDBConvert, b: EmployeeFromDBConvert) => a.firstName.localeCompare(b.firstName),
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'LastName',
        sorter: (a: EmployeeFromDBConvert, b: EmployeeFromDBConvert) => a.lastName.localeCompare(b.lastName),
    },
    {
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'StartDate',
        sorter: (a: EmployeeFromDBConvert, b: EmployeeFromDBConvert) => a.startDate.unix() - b.startDate.unix(),
        render: (value: Dayjs) => {
            console.log(value)
            return (<p>{value.format("MM/DD/YYYY")}</p>)
        }
    },
    {
        title: 'Department',
        dataIndex: 'department',
        key: 'Department',
        sorter: (a: EmployeeFromDBConvert, b: EmployeeFromDBConvert) => a.department.localeCompare(b.department),
    },
    {
        title: 'Date of Birth',
        dataIndex: 'dateOfBirth',
        key: 'DateOfBirth',
        sorter: (a: EmployeeFromDBConvert, b: EmployeeFromDBConvert) => a.dateOfBirth.unix() - b.dateOfBirth.unix(),
        render: (value: Dayjs) =>  (<p>{value.format("MM/DD/YYYY")}</p>)
    },
    {
        title: 'Street',
        dataIndex: 'street',
        key: 'Street',
        sorter: (a: EmployeeFromDBConvert, b: EmployeeFromDBConvert) => a.street.localeCompare(b.street),
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'City',
        sorter: (a: EmployeeFromDBConvert, b: EmployeeFromDBConvert) => a.city.localeCompare(b.city),
    },
    {
        title: 'State',
        dataIndex: 'state',
        key: 'State',
        sorter: (a: EmployeeFromDBConvert, b: EmployeeFromDBConvert) => a.state.localeCompare(b.state),
    },
    {
        title: 'Zip Code',
        dataIndex: 'zipCode',
        key: 'ZipCode',
        sorter: (a: EmployeeFromDBConvert, b: EmployeeFromDBConvert) => a.zipCode - b.zipCode,
    },
];

function TabEmployees() {
    const { data : employees, isLoading: isLoadingEmployees, error: errorPostEmployees } = useFetchGetEmployees();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState('');

    const handlePageSizeChange = (value: number) => {
        setPageSize(value);
    };

    const handleSearch = (value:string) => {
        setSearchText(value.toLowerCase());
    };

    const filteredEmployees = employees.filter(employee =>
        Object.values(employee).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(searchText)
        )
    );

    const sortEmployees = filteredEmployees;

    if (isLoadingEmployees) { 
        return <p>Loading...</p>;
    }
    if (errorPostEmployees) { 
        return <p>error</p>;
    }
    
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
                dataSource={sortEmployees}
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
                        sortEmployees.length
                    )} of ${sortEmployees.length} entries`}
                </div>
                <Pagination
                    current={currentPage}
                    total={sortEmployees.length}
                    pageSize={pageSize}
                    onChange={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default TabEmployees