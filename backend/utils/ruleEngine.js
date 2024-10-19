class Node {
  constructor(type, value = null, left = null, right = null) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}
function removeBracketsQuotesSpaces(str) {
  return str.replace(/[()'"]/g, "");
}

function parseRule(ruleString) {
  ruleString = removeBracketsQuotesSpaces(ruleString);
  const tokens = ruleString.split(/\b(AND|OR)\b/);
  let root = null;
  console.log(tokens);

  tokens.forEach((token) => {
    if (token === "AND" || token === "OR") {
      const newNode = new Node("operator", token);
      newNode.left = root;
      root = newNode;
    } else {
      const operandNode = new Node("operand", token.trim());
      if (!root) root = operandNode;
      else root.right = operandNode;
    }
  });

  return root;
}

function evaluateRule(node, data) {
  if (node.type === "operand") {
    const [key, operator, value] = node.value.split(/\s+/);
    const dataValue = data[key];
    console.log("key:", key);
    console.log("operator:", operator);
    console.log("value:", value);

    switch (operator) {
      case ">":
        return dataValue > +value;
      case "<":
        return dataValue < +value;
      case "=":
        return dataValue === value;
      default:
        throw new Error("Invalid operator");
    }
  }

  if (node.type === "operator") {
    if (node.value === "AND") {
      return evaluateRule(node.left, data) && evaluateRule(node.right, data);
    } else if (node.value === "OR") {
      return evaluateRule(node.left, data) || evaluateRule(node.right, data);
    }
  }
}

module.exports = { parseRule, evaluateRule };
