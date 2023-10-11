const PetController = require('../controllers/pet.controller')

module.exports = app => {
    app.get('/api/pets', PetController.getAllPets)
    app.get('/api/pets/:id', PetController.getOnePet)
    app.post('/api/pets', PetController.createNewPet)
    app.put('/api/pets/:id/edit', PetController.editPet)
    app.delete('/api/pets/:id', PetController.deletePet)
}