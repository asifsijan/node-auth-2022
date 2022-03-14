const Test = require("../models/Test");
const asyncHandler = require('express-async-handler');

// function getByName(req, res) {

//     Test.find({ name: req.params.name }, function (err, data) {
//         if (err) console.log(err)
//         res.json(data);
//     });
// };
const getByName = asyncHandler(async (req, res) => {
    const test = await Test.find({ name: req.params.name });
    res.json(test);
});

const getTests = async (req, res) => {
    try {
        const tests = await Test.find({});
        res.json(tests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getTestById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);

        res.json(test);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const postTest = async (req, res) => {
    const newTest = new Test(req.body);
    try {
        const savedTest = await newTest.save();
        res.status(200).json(savedTest);
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateTest = async (req, res) => {
    try {
        const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.json(updatedTest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const removeTest = async (req, res) => {
    try {
        await Test.findByIdAndRemove(req.params.id);
        res.json({ message: "Test Deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


module.exports = {
    getTests,
    getTestById,
    postTest,
    updateTest,
    removeTest,
    getByName,
};
