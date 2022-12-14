const { getDb } = require("../utils/dbConnect");

module.exports.allTools = async (req,res, next) => {
    try {
        const db = getDb();
        const result = await db.collection('toolsInfo').find().toArray();
        if(!result){
            return res.status(400).res.send({status: false, error: "Something went wrong"});
        }
        res.send({status: true, message: result})
    } catch (error) {
        next(error);
    }
}

module.exports.saveTool = async (req, res, next) => {
    try {
        const db = getDb();
        const newTool = req.body;
        const result = await db.collection('toolsInfo').insertOne(newTool);

        if(!result.insertedId){
            return res.status(400).send({status: false, error: "Something went wrong"})
        }
        res.send({status: true, message: "Tools Added Successfully"});
    } catch (error) {
        next(error);
    }
}

module.exports.toolDetails = (req,res) =>{
    const {id} = req.params;
    const singleTool = tools.find(tool=> tool.id === Number(id))
    res.send(singleTool);
}

module.exports.toolUpdate = (req, res) =>{
    const {id} = req.params;
    const newTool = tools.find(tool=> tool.id === Number(id));
    newTool.name = req.body.name;

    res.send(newTool);
}

module.exports.toolDelete = (req,res) =>{
    const {id} = req.params;
    tools = tools.filter(tool => tool.id !== Number(id));
    res.send("Delete Successful");
}