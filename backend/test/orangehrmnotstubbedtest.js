const legacysystemhandler = require('../legacysystemhandler');
const orangehrm = require('../routes/orangehrm');
const sinon = require("sinon");
const expect = require('chai').expect;
const {Employee} = require('../classes/Employee');
describe("orangehrm",() => {
    describe("isnotstubbed",function() {
        before(async function() {
            await legacysystemhandler.getorangehrmtoken();
        });
        it("read employee",async function() {
            let req = {
                params: { id: '5' }
            }
            let res = {
                send: sinon.spy()
            }

            await orangehrm.reademployee(req,res);

            let expectedreturn = new Employee("Chantal Banks","5","90133","HR Senior Consultant","HR");

            expect(res.send.calledOnce).to.be.true;
            expect(res.send.firstCall.args[0]).to.deep.equal(expectedreturn);
        });
        it("read all employees",async function() {

            let res = {
                send: sinon.spy()
            }

            await orangehrm.readallemployees(null,res);

            let expectedreturn = [
                new Employee("Sascha Alda","3","98222","External Consultant","IT"),
                new Employee("Chantal Banks","5","90133","HR Senior Consultant","HR"),
                new Employee("John Doe","85","91338",null,"Sales"),
                new Employee("Tom Foster","6","91333","IT-admin","IT"),
                new Employee("Paul Kaye","31","90732","Senior Salesman","Sales"),
                new Employee("Michael Moore","7","98777","CEO","Leader"),
                new Employee("Mary-Ann Sallinger","9","90124","Senior Salesman","Sales"),
                new Employee("Max Peter Schmidt","93","1234",null,null),
                new Employee("Maxu Peteru Schmidtu","94","12346",null,null),
                new Employee("John Steven Smith","2","90123","Senior Salesman","Sales"),
                new Employee("Toni Tomato","84","91337",null,"Sales"),
                new Employee("Admin User","1","60999",null,null),
                new Employee("Demo User","4","60988",null,null)
            ];

            expect(res.send.calledOnce).to.be.true;
            expect(res.send.firstCall.args[0]).to.deep.equal(expectedreturn);

        });
        it("add bonus",async function() {

            let req = {
                params: { id: '4' },
                body: {year: 3000, value: 300}
            }

            let res = {
                send: sinon.spy()
            }

            await orangehrm.addbonussalary(req,res);

            let expectedreturn = "bonus added successfully";

            expect(res.send.calledOnce).to.be.true;
            expect(res.send.firstCall.args[0]).to.equal(expectedreturn);;

        });
    });       
});
