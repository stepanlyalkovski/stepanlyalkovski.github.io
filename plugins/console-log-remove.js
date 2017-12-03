module.exports = function ({ types: t }) {
    return {
        visitor: {
            CallExpression(path) {
                const callee = path.get("callee");
                const obj = callee.get("object");
                const property = callee.get("property");
                if(isConsoleObject(obj) && isLogProperty(property)) {
                    path.remove();
                }


                function isConsoleObject(obj) {
                    return isIdentifier(obj, 'console');
                }

                function isLogProperty(prop) {
                    return isIdentifier(prop, 'log');
                }

                function isIdentifier(node, name) {
                    return node.isIdentifier({name});
                }
            }
        }
    };
};


