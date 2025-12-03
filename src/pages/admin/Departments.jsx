import React, { useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    Button,
    Card,
    CardBody,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    HStack,
    Text,
    Grid,
    GridItem,
    Progress,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Icon,
    VStack
} from '@chakra-ui/react';
import {
    FiSearch,
    FiPlus,
    FiEdit2,
    FiUsers,
    FiActivity,
    FiCalendar,
    FiDollarSign,
    FiMoreVertical,
} from 'react-icons/fi';

const AdminDepartments = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const departments = [
        {
            id: 1,
            name: 'Cardiology',
            head: 'Dr. Suman Dixit',
            doctors: 8,
            patients: 320,
            appointments: 45,
            revenue: '$125,400',
            occupancy: '85%',
            status: 'active',
        },
        {
            id: 2,
            name: 'Neurology',
            head: 'Dr. Syed',
            doctors: 6,
            patients: 280,
            appointments: 38,
            revenue: '$98,750',
            occupancy: '78%',
            status: 'active',
        },
        {
            id: 3,
            name: 'Orthopedics',
            head: 'Dr. Ashok',
            doctors: 7,
            patients: 410,
            appointments: 52,
            revenue: '$156,800',
            occupancy: '92%',
            status: 'active',
        },
        {
            id: 4,
            name: 'Dermatology',
            head: 'Dr. Surbhi Agnihotri',
            doctors: 5,
            patients: 190,
            appointments: 28,
            revenue: '$87,300',
            occupancy: '65%',
            status: 'active',
        },
        {
            id: 5,
            name: 'Pediatrics',
            head: 'Dr. Ashish Gupta',
            doctors: 6,
            patients: 350,
            appointments: 42,
            revenue: '$112,500',
            occupancy: '80%',
            status: 'active',
        },
        {
            id: 6,
            name: 'Emergency',
            head: 'Dr. Amanda Scott',
            doctors: 10,
            patients: 520,
            appointments: 68,
            revenue: '$210,000',
            occupancy: '95%',
            status: 'active',
        },
    ];

    const filteredDepartments = departments.filter((dept) =>
        dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.head.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getOccupancyColor = (occupancy) => {
        const perc = parseInt(occupancy);
        if (perc >= 90) return 'red';
        if (perc >= 75) return 'green';
        if (perc >= 60) return 'blue';
        return 'gray';
    };

    return (
        <Box>
            <Flex justify="space-between" align="center" mb={6}>
                <Heading size="lg">Departments Management</Heading>
                <Button leftIcon={<FiPlus />} colorScheme="brand">
                    Add Department
                </Button>
            </Flex>

            {/* Filters */}
            <Card mb={6}>
                <CardBody>
                    <HStack spacing={4}>
                        <InputGroup flex="1">
                            <InputLeftElement pointerEvents="none">
                                <FiSearch color="gray.300" />
                            </InputLeftElement>
                            <Input
                                placeholder="Search departments..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </InputGroup>
                    </HStack>
                </CardBody>
            </Card>

            {/* Overall Stats */}
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }} gap={4} mb={6}>
                {[
                    { label: 'Total Departments', value: '12', icon: FiActivity, color: 'blue', change: '+2 this year' },
                    { label: 'Active Doctors', value: '48', icon: FiUsers, color: 'green', change: 'Across all depts' },
                    { label: 'Total Patients', value: '2,070', icon: FiUsers, color: 'purple', change: 'This month' },
                    { label: 'Total Revenue', value: '$790,750', icon: FiDollarSign, color: 'orange', change: '+8.5%' },
                ].map((stat) => (
                    <Card key={stat.label}>
                        <CardBody>
                            <Flex align="center" justify="space-between">
                                <Box>
                                    <Stat>
                                        <StatLabel color="gray.600">{stat.label}</StatLabel>
                                        <StatNumber fontSize="lg">{stat.value}</StatNumber>
                                        <StatHelpText fontSize="xs">
                                            {stat.change}
                                        </StatHelpText>
                                    </Stat>
                                </Box>
                                <Icon as={stat.icon} w={8} h={8} color={`${stat.color}.500`} />
                            </Flex>
                        </CardBody>
                    </Card>
                ))}
            </Grid>

            {/* Departments Table */}
            <Card mb={6}>
                <CardBody>
                    <Table size="sm">
                        <Thead>
                            <Tr>
                                <Th>Department</Th>
                                <Th>Head</Th>
                                <Th>Doctors</Th>
                                <Th>Patients</Th>
                                <Th>Appointments</Th>
                                <Th>Revenue</Th>
                                <Th>Occupancy</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredDepartments.map((dept) => (
                                <Tr key={dept.id}>
                                    <Td>
                                        <Flex align="center">
                                            <Avatar
                                                size="sm"
                                                name={dept.name}
                                                color="white"
                                                bg={`${getOccupancyColor(dept.occupancy)}.500`}
                                                mr={3}
                                            />
                                            <Box>
                                                <Text fontWeight="medium">{dept.name}</Text>
                                                <Text fontSize="xs" color="gray.500">
                                                    ID: DEPT{dept.id.toString().padStart(3, '0')}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Text fontSize="sm">{dept.head}</Text>
                                    </Td>
                                    <Td>
                                        <Flex align="center">
                                            <Icon as={FiUsers} mr={2} color="blue.500" />
                                            {dept.doctors}
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Text fontWeight="medium">{dept.patients}</Text>
                                    </Td>
                                    <Td>
                                        <Flex align="center">
                                            <Icon as={FiCalendar} mr={2} color="green.500" />
                                            {dept.appointments}
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Text fontWeight="medium" color="green.500">
                                            {dept.revenue}
                                        </Text>
                                    </Td>
                                    <Td>
                                        <Flex align="center">
                                            <Progress
                                                value={parseInt(dept.occupancy)}
                                                colorScheme={getOccupancyColor(dept.occupancy)}
                                                size="sm"
                                                flex="1"
                                                mr={2}
                                            />
                                            <Text fontSize="sm" fontWeight="medium">
                                                {dept.occupancy}
                                            </Text>
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <HStack spacing={2}>
                                            <IconButton
                                                icon={<FiEdit2 />}
                                                size="sm"
                                                variant="ghost"
                                                aria-label="Edit"
                                            />
                                            <Menu>
                                                <MenuButton
                                                    as={IconButton}
                                                    icon={<FiMoreVertical />}
                                                    variant="ghost"
                                                    size="sm"
                                                />
                                                <MenuList>
                                                    <MenuItem>View Details</MenuItem>
                                                    <MenuItem>Manage Doctors</MenuItem>
                                                    <MenuItem>Edit Department</MenuItem>
                                                    <MenuItem color="red.500">Delete Department</MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </CardBody>
            </Card>

            {/* Department Performance */}
            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
                <Card>
                    <CardBody>
                        <Heading size="md" mb={4}>Department Performance</Heading>
                        <VStack spacing={4} align="stretch">
                            {departments.slice(0, 4).map((dept) => (
                                <Box key={dept.id}>
                                    <Flex justify="space-between" mb={1}>
                                        <Text fontSize="sm">{dept.name}</Text>
                                        <Text fontSize="sm" fontWeight="medium">{dept.revenue}</Text>
                                    </Flex>
                                    <Progress
                                        value={parseInt(dept.occupancy)}
                                        colorScheme={getOccupancyColor(dept.occupancy)}
                                        size="sm"
                                    />
                                </Box>
                            ))}
                        </VStack>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <Heading size="md" mb={4}>Quick Actions</Heading>
                        <VStack spacing={3} align="stretch">
                            <Button leftIcon={<FiPlus />} colorScheme="brand" size="sm">
                                Add New Department
                            </Button>
                            <Button leftIcon={<FiUsers />} variant="outline" size="sm">
                                Manage Department Heads
                            </Button>
                            <Button leftIcon={<FiDollarSign />} variant="outline" size="sm">
                                Set Revenue Targets
                            </Button>
                            <Button leftIcon={<FiActivity />} variant="outline" size="sm">
                                View Performance Reports
                            </Button>
                        </VStack>
                    </CardBody>
                </Card>
            </Grid>
        </Box>
    );
};

export default AdminDepartments;