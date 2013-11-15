//这个东西用于出去Dom中空白文本节点，firefox阵营的浏览器会将空白也当成子节点（ie不会）
//这样的话使用节点关系寻找节点就会由于空白节点的无法预知出错，当然我们很少用关系
//来查找元素get*类的函数足够用了，但是万一的话，就用它吧！
function removeSpaceNode(elem) {
    var index;
    for (index = 0; index < elem.childNodes.length; index++) {//dynamic remove should be used elem.childNOdes.length
        var currentNode = elem.childNodes[index];
        if (currentNode.nodeType == 1) {
            removeSpace(currentNode);
        }
        else if (currentNode.nodeType == 3 && (/^\s+$/.test(currentNode.nodeValue))) {
            elem.removeChild(elem.childNodes[index--]);//dynamic remove should reflow index
        }
    }
}