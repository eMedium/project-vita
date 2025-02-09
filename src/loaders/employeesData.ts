import { Employee } from '@/store/employeeSlice';
import employeeData from '../data/employee_data.json';
import logger from '../logger/logger';

interface EmployeeDataRaw {
    employees: {
        id: number;
        firstName: string;
        lastName: string;
        birthYear: number;
        salary: number;
        researchSkill: number;
        designSkill: number;
        testingSkill: number;
        managementSkill: number;
    }[];
}

export const loadEmployees = (): Employee[] => {
    const data: EmployeeDataRaw = employeeData;
    const employees: Employee[] = [];

    data.employees.forEach(employeeData => {
        employees.push({
            id: employeeData.id,
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            birthYear: employeeData.birthYear,
            salary: employeeData.salary,
            researchSkill: employeeData.researchSkill,
            designSkill: employeeData.designSkill,
            testingSkill: employeeData.testingSkill,
            managementSkill: employeeData.managementSkill,
            roomId: null, // Default value
            floorId: null, // Default value
            roomType: null // Default value
        });
    });

    logger.info("load employees", employees);
    return employees;
};
