const express = require("express");
const router = express.Router();
const Rule = require("../models/Rule");
const { parseRule, evaluateRule } = require("../utils/ruleEngine");

// Create a new rule and save it as AST in the database
router.post("/create", async (req, res) => {
  const { ruleString } = req.body;

  try {
    const ast = parseRule(ruleString);
    const rule = new Rule({ ruleString, ast });
    await rule.save();
    res.status(201).json({ message: "Rule created", ast });
  } catch (error) {
    res.status(400).json({ error: "Invalid rule format" });
  }
});

// Evaluate a user’s data against a specific rule
router.post("/evaluate/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  // console.log(data);

  try {
    const rule = await Rule.findById(id);
    // console.log(rule);

    const result = evaluateRule(rule.ast, data);
    console.log(result);

    res.json({ result });
  } catch (error) {
    res.status(404).json({ error: "Rule not found" });
  }
});

module.exports = router;
