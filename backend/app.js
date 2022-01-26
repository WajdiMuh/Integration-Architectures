const express = require('express');
const app = express();
const performancerecordrouter = require('./routes/performancerecord');
const orangehrmrouter = require('./routes/orangehrm').router;
const opencrxrouter = require('./routes/opencrx');
const bonusremarkrouter = require('./routes/bonusremark');
const legacysystemhandler = require('./legacysystemhandler')
legacysystemhandler.getorangehrmtoken();

app.use('/api/performancerecords',performancerecordrouter);
app.use('/api/orangehrm',orangehrmrouter);
app.use('/api/opencrx',opencrxrouter);
app.use('/api/bonusremark',bonusremarkrouter);


app.listen(8080,() => {
    console.log('server running');
});
