import { Employee } from './Employee';
import { Customer } from './Customer';
import { Product } from './Product';
export interface SalesOrder{
    salesorderid: string;
    name: string;
    date: string;
    totalamount: string;
    tax: string;
    totalamountwithtax:string;
    employee:Employee;
    customer:Customer;
    products:[Product];
}