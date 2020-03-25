
const express = require('express')

const RootEquationCtrl = require('../controllers/RootEquation-ctrl')

const router = express.Router()

router.get('/falsepositions', RootEquationCtrl.getfalseposition)
router.get('/bisections',RootEquationCtrl.getbisection)
router.get('/onepoints',RootEquationCtrl.getonepoint)
router.get('/newtons',RootEquationCtrl.getnewton)
router.get('/secants',RootEquationCtrl.getsecant)
router.get('/cramers',RootEquationCtrl.getcramer)
router.get('/inters',RootEquationCtrl.getinter)
router.get('/diffs',RootEquationCtrl.getdiff)
router.get('/interpos',RootEquationCtrl.getinterpo)
router.get('/polyregs',RootEquationCtrl.getpolyreg)
module.exports = router