const express = require('express');
const YAML = require('yaml');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const fsp = require('fs/promises')
const app = express();
const fileName = './Telephones.json';
let file = null

const options = {
    definition: {
    openapi: '3.0.0',
      info: {
        title: 'Telephone book',
        version: '1.0.0',
      }
    },
    apis: ['./server.js']
};

const openapiSpecification = swaggerJsdoc(options);
const doc = new YAML.Document();
doc.contents = openapiSpecification;

app.use(bodyParser.json());

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(openapiSpecification));

app.all('*', async (req, res, next) => {
    file ? fsp.writeFile(fileName, JSON.stringify(file)) : file = JSON.parse(await fsp.readFile(fileName))
    next()
})

/**
 * @openapi
 * /ts:
 *   get:
 *     description: Gets all the telephones and names
 *     responses:
 *       200:
 *         description: Returns a list of all the telephones and names
 */
app.get('/ts', (req, res)=>{
    res.json(file);
});

/**
 * @openapi
 * /ts:
 *   post:
 *     description: Adds a new telephone and name
 *     requestBody:
 *       description: The new telephone and name
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FIO:
 *                 type: string
 *               phone:
 *                 type: string
 *             example:   
 *               FIO: Jessica Smith
 *               phone: 375293798321
 *     responses:
 *       200:
 *         description: Returns created telephone and name
 */
app.post('/ts', (req, res)=>{
    let item = file.find(x => x.FIO == req.body.FIO)
    if(item) 
    {
        res.status(400).send({error: 'Phone already exists'})
    } else 
    {
        file.push({...req.body})
        res.send({...req.body})
    }
});

/**
 * @openapi
 * /ts:
 *   put:
 *     description: Updates telephone and name or adds a new one
 *     requestBody:
 *       description: The new telephone and name
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FIO:
 *                 type: string
 *               phone:
 *                 type: string
 *             example:   
 *               FIO: Jessica Smith
 *               phone: 375293798321
 *     responses:
 *       200:
 *         description: Returns updated telephone and name
 */
app.put('/ts', async (req, res)=>{
    let item = file.find(x => x.FIO == req.body.FIO)
    item ? item.phone = req.body.phone : file.push(req.body)
    res.send({...req.body})
});

/**
 * @openapi
 * /ts:
 *   delete:
 *     description: Deletes telephone and name by FIO and phone
 *     requestBody:
 *       description: The telephone and name that needs to be deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FIO:
 *                 type: string
 *               phone:
 *                 type: string
 *             example:   
 *               FIO: Jessica Smith
 *               phone: 375293798321
 *     responses:
 *       200:
 *         description: Returns 'Entry deleted'
 */
app.delete('/ts', (req, res)=>{
    file = file.filter(user => user.FIO !== req.body.FIO && user.phone !== req.body.phone);
    res.send('Entry deleted')
});

app.listen(3004, async () => await fsp.writeFile('yaml.yaml', YAML.stringify(doc)));