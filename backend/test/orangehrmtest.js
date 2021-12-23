const legacysystemhandler = require('../legacysystemhandler');
const orangehrm = require('../routes/orangehrm');
const sinon = require("sinon");
const expect = require('chai').expect;
const {Employee} = require('../classes/Employee');
describe("orangehrm request",() => {
    it("orangehrm request not stubbed",async function() {
        await legacysystemhandler.getorangehrmtoken();

        let req = {
            params: { id: '5' }
        }
        let res = {
            send: sinon.spy()
        }

        await orangehrm.reademployee(req,res);

        let expectedreturn = new Employee("Chantal","Banks",5,90133,"HR Senior Consultant","HR");

        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal(expectedreturn);
    });
    describe("orangehrm request stubbed (orangehrm fail)",function() {
        beforeEach(()=>{
            this.reademployee = sinon.stub(orangehrm,'reademployee').callsFake(function(req,res) {
                res.send(new Employee("Chantal","Banks",5,90133,"HR Senior Consultant","HR"));
            });
        });
        afterEach(()=>{
            orangehrm.reademployee.restore();
        });
        it("orangehrm request read employee",async function() {

            let req = {
                params: { id: '5' }
            }
            let res = {
                send: sinon.spy()
            }
            orangehrm.reademployee(req,res);

            let expectedreturn = new Employee("Chantal","Banks",5,90133,"HR Senior Consultant","HR");

            expect(res.send.calledOnce).to.be.true;
            expect(res.send.firstCall.args[0]).to.deep.equal(expectedreturn);

        });
    });        
});
