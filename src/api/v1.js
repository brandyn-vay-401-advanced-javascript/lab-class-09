'use strict';

const cwd = process.cwd();

const express = require('express');

const modelFinder = require(`${cwd}/src/middleware/model-finder.js`);

const router = express.Router();

router.param('model', modelFinder.load);

router.get('/api/v1/models', (request, response) => {
  modelFinder.list()
    .then(models => response.status(200).json(models));
});

router.get('/api/v1/:model/schema', (request, response) => {
  response.status(200).json(request.model.jsonSchema());
});

/**
 * This function comment is parsed by doctrine
 * @route GET /api/v1/:model
 * @returns {object} 200 - An object of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/api/v1/:model', handleGetAll);
/**
 * This function comment is parsed by doctrine
 * @route POST /api/v1/:model
 * @returns {object} 200 - An object of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/api/v1/:model', handlePost);
/**
 * This function comment is parsed by doctrine
 * @route GET /api/v1/:model/:id
 * @returns {object} 200 - An object of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/api/v1/:model/:id', handleGetOne);
/**
 * This function comment is parsed by doctrine
 * @route PUT /api/v1/:model/:id
 * @returns {object} 200 - An object of user info
 * @returns {Error}  default - Unexpected error
 */
router.put('/api/v1/:model/:id', handlePut);
/**
 * This function comment is parsed by doctrine
 * @route DELETE /api/v1/:model/:id
 * @returns {object} 200 - An object of user info
 * @returns {Error}  default - Unexpected error
 */
router.delete('/api/v1/:model/:id', handleDelete);

// Route Handlers
function handleGetAll(request,response,next) {
  request.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function handleGetOne(request,response,next) {
  request.model.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

function handlePost(request,response,next) {
  request.model.create(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handlePut(request,response,next) {
  request.model.update(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handleDelete(request,response,next) {
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;
