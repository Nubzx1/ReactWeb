const bisectiondb = require('../models/bisection-model')
const falsepositiondb = require('../models/falseposition-model')
const newtondb = require('../models/newton-model')
const onepointdb = require('../models/onepoint-model')
const secantdb = require('../models/secant-model')
const cramerdb = require('../models/cramer-model')
const interdb = require('../models/inter-model')
const diffdb = require('../models/diff-model')
const interpodb = require('../models/interpo-model')
const  polyregpodb = require('../models/polyreg-model')
getbisection = async (req, res) => {
    await bisectiondb.find({}, (err, bisections) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bisections.length) {
            return res
                .status(404)
                .json({ success: false, error: `fc not found` })
        }
        return res.status(200).json({ success: true, data: bisections })
    }).catch(err => console.log(err))
}

getfalseposition = async (req, res) => {
    await falsepositiondb.find({}, (err, falsepositions) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!falsepositions.length) {
            return res
                .status(404)
                .json({ success: false, error: `fc not found` })
        }
        return res.status(200).json({ success: true, data: falsepositions })
    }).catch(err => console.log(err))
}

getonepoint = async (req, res) => {
    await onepointdb.find({}, (err, onepoints) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!onepoints.length) {
            return res
                .status(404)
                .json({ success: false, error: `fc not found` })
        }
        return res.status(200).json({ success: true, data: onepoints })
    }).catch(err => console.log(err))
}

getnewton = async (req, res) => {
    await newtondb.find({}, (err, newtons) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!newtons.length) {
            return res
                .status(404)
                .json({ success: false, error: `fc not found` })
        }
        return res.status(200).json({ success: true, data: newtons })
    }).catch(err => console.log(err))
}

getsecant = async (req, res) => {
    await secantdb.find({}, (err, secants) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!secants.length) {
            return res
                .status(404)
                .json({ success: false, error: `fc not found` })
        }
        return res.status(200).json({ success: true, data: secants })
    }).catch(err => console.log(err))
}
getcramer = async (req, res) => {
    await cramerdb.find({}, (err, cramers) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!cramers.length) {
            return res
                .status(404)
                .json({ success: false, error: `fc not found` })
        }
        return res.status(200).json({ success: true, data: cramers })
    }).catch(err => console.log(err))
}
getinter = async (req, res) => {
    await interdb.find({}, (err, inters) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!inters.length) {
            return res
                .status(404)
                .json({ success: false, error: `fc not found` })
        }
        return res.status(200).json({ success: true, data: inters })
    }).catch(err => console.log(err))
}
getdiff = async (req, res) => {
    await diffdb.find({}, (err, diffs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!diffs.length) {
            return res
                .status(404)
                .json({ success: false, error: `fc not found` })
        }
        return res.status(200).json({ success: true, data: diffs })
    }).catch(err => console.log(err))
}
getinterpo = async (req, res) => {
    await interpodb.find({}, (err, interpos) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!interpos.length) {
            return res
                .status(404)
                .json({ success: false, error: `fc not found` })
        }
        return res.status(200).json({ success: true, data: interpos })
    }).catch(err => console.log(err))
}
getpolyreg = async (req, res) => {
    await polyregpodb.find({}, (err, polyregs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!polyregs.length) {
            return res
                .status(404)
                .json({ success: false, error: `fc not found` })
        }
        return res.status(200).json({ success: true, data: polyregs })
    }).catch(err => console.log(err))
}
module.exports = {
    getbisection,
    getfalseposition,
    getonepoint,
    getnewton,
    getsecant,
    getcramer,
    getinter,
    getdiff,
    getinterpo,
    getpolyreg,
}