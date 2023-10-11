const Pet = require('../models/pet.model')

module.exports.createNewPet = (req, res) => {
    Pet.create(req.body)
        .then((newPet) => {
            res.json(newPet)
            console.log(`created new pet:${newPet}`)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}
module.exports.getAllPets = (req, res) => {
    Pet.find().sort({petType: 1})
        .then((allPet) => {
            res.json(allPet)
            console.log('requested Pet')
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}
module.exports.getOnePet = (req, res) => {
    Pet.findOne({_id: req.params.id})
        .then(onePet => {
            res.json(onePet)
        })
        .catch(err => res.status(400).json(err))
}
module.exports.deletePet = (req, res) => {
    Pet.deleteOne({_id: req.params.id})
        .then(result => {
            res.json(result)
        })
        .catch(err => res.status(400).json(err))
}
module.exports.editPet = (req, res) => {
    Pet.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updatePet => {
            res.json(updatePet)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}