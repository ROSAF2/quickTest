const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

//Get all members
router.get("/", (req,res) => res.json(members));

//Get Single Member
router.get("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg:`No member with the ID of ${req.params.id}`});
        //res.status(400).send(`No member with the ID of ${req.params.id}`);
    }
});

router.post("/", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    }

    //if newMember.name is null or newMember.email is null then ... 
    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:"Please include a name and email"});
    }

    members.push(newMember);
    res.json(members);
});

//Update member
router.put("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        const updtMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updtMember.name ? updtMember.name : member.name;
                member.email = updtMember.email ? updtMember.email : member.email;
                
                res.json({msg: "Member updated", member: member});
            }
        });

    }else{
        res.status(400).json({msg:`No member with the ID of ${req.params.id}`});
        //res.status(400).send(`No member with the ID of ${req.params.id}`);
    }
});

//Delete Member
router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json({
            msg: "Member deleted", 
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    }else{
        res.status(400).json({msg:`No member with the ID of ${req.params.id}`});
        //res.status(400).send(`No member with the ID of ${req.params.id}`);
    }
});

module.exports = router;