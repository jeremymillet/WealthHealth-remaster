import { useEffect, useState } from 'react';
import { Table, Select, Input, Button, Popconfirm } from 'antd';
const { Option } = Select;
const { Search } = Input;
import {Employee,ColumnType} from '../../types/index'
import './TabEmployees.css'
import { Dayjs } from 'dayjs';
import useFetchDeleteEmployee from '../../hook/useFetchDeleteEmployee';
import useAuthContext from '../../context/hook/useAuthContext';
import useFetchGetEmployees from '../../hook/useFetchGetEmployees';
import { useNavigate } from 'react-router-dom';





function TabEmployees() {
    const navigate =  useNavigate();
    const { data:employeesData,getEmployees,error:errorGetEmployees ,isLoading:isLoadingEmployees } = useFetchGetEmployees();
    const { deleteEmployee, isLoading: isLoadingDeleteEmployees, error: errorDeleteEmployees } = useFetchDeleteEmployee();
    const { isLogin } = useAuthContext();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState('');
    console.log(pageSize);
    console.log(employeesData);
    
    useEffect(() => {
        getEmployees()
    }, []);

    const tableColumns: ColumnType[] = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'FirstName',
        sorter: (a: Employee, b: Employee) => a.firstName.localeCompare(b.firstName),
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'LastName',
        sorter: (a: Employee, b: Employee) => a.lastName.localeCompare(b.lastName),
    },
    {
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'StartDate',
        sorter: (a: Employee, b: Employee) => a.startDate.unix() - b.startDate.unix(),
        render: (value: Dayjs) => {
            return (<p>{value.format("MM/DD/YYYY")}</p>)
        }
    },
    {
        title: 'Department',
        dataIndex: 'department',
        key: 'Department',
        sorter: (a: Employee, b: Employee) => a.department.localeCompare(b.department),
    },
    {
        title: 'Date of Birth',
        dataIndex: 'dateOfBirth',
        key: 'DateOfBirth',
        sorter: (a: Employee, b: Employee) => a.dateOfBirth.unix() - b.dateOfBirth.unix(),
        render: (value: Dayjs) =>  (<p>{value.format("MM/DD/YYYY")}</p>)
    },
    {
        title: 'Street',
        dataIndex: 'street',
        key: 'Street',
        sorter: (a: Employee, b: Employee) => a.street.localeCompare(b.street),
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'City',
        sorter: (a: Employee, b: Employee) => a.city.localeCompare(b.city),
    },
    {
        title: 'State',
        dataIndex: 'state',
        key: 'State',
        sorter: (a: Employee, b: Employee) => a.state.localeCompare(b.state),
    },
    {
        title: 'Zip Code',
        dataIndex: 'zipCode',
        key: 'ZipCode',
        sorter: (a: Employee, b: Employee) => a.zipCode - b.zipCode,
        },];
    if (isLogin) {
        tableColumns.push({
            title: 'Edit',
            key: 'edit',
            render: (record?: Employee) => (
                <Button type="primary" onClick={() => navigate(`/createEmployees/editEmployees/${record?record.id:0}`)}>
                    Edit
                </Button>
            ),
        });
        tableColumns.push({
            title: 'Delete',
            key: 'delete',
            render: (record?: Employee) => (
                <Popconfirm
                    title="Are you sure you want to delete this employee?"
                    onConfirm={async () => {
                    if (record) {
                        await deleteEmployee(record.id);
                        await getEmployees();
                    }
                    }}
                >
                    <Button type="primary">
                        Delete
                    </Button>
                </Popconfirm>
            ),
        });
    }
    
    const handlePageSizeChange = (value: number) => {
        setPageSize(value);
    };

    const handleSearch = (value:string) => {
        setSearchText(value.toLowerCase());
    };

    const filteredEmployees = employeesData.filter(employee =>
        Object.values(employee).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(searchText)
        )
    );

    const sortEmployees = filteredEmployees;

    if (isLoadingEmployees || isLoadingDeleteEmployees) { 
        return <p>Loading...</p>;
    }
    if (errorGetEmployees || errorDeleteEmployees  ) { 
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
                pagination={{
                    current: currentPage, // Page actuelle
                    pageSize: pageSize,    // Taille de page
                    total: employeesData.length, // Nombre total d'éléments
                    onChange: (page) => setCurrentPage(page), // Changer de page
                }}
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
            </div>
        </div>
    )
}

export default TabEmployees


