var dragSrcEl = null;

function handleDragStart(e) {
  // Target (this) element is the source node.
  this.style.opacity = '0.4';

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', e.target.id);
}
function handleDragOver(e) {
if (e.preventDefault) {
e.preventDefault(); // Necessary. Allows us to drop.
}

e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

return false;
}

function handleDragEnter(e) {
// this / e.target is the current hover target.
this.classList.add('over');
}

function handleDragLeave(e) {
this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
// this / e.target is current target element.

if (e.stopPropagation) {
e.stopPropagation(); // stops the browser from redirecting.
}

// Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
    //get a reference to the element being dragged
    var theData = e.dataTransfer.getData("text/plain");
    //get the element
    var theDraggedElement = document.getElementById(theData);
    console.log (theDraggedElement);
    console.log (e.dataTransfer.getData('text/plain'));
    //add it to the parent of drop element

    if (e.target.children.length > 0){
      console.log ('Has Child Node If yes')
      console.log (e.target.hasChildNodes());
      e.target.appendChild(theDraggedElement);
    } else {
      console.log ('Has Child Node If No')
      e.target.parentNode.appendChild(theDraggedElement);

    }
    console.log('FirstChild');
    console.log( e.target.parentNode.firstChild);
    // Set the source column's HTML to the HTML of the column we dropped on.
    //dragSrcEl.innerHTML = this.innerHTML;
    //this.innerHTML = e.dataTransfer.getData('text/plain');

  }
return false;
}

function handleDragEnd(e) {
// this/e.target is the source node.
this.style.opacity = '1';
console.log('inside drangend');
e.target.classList.remove('over');
e.target.parentNode.classList.remove('over');
[].forEach.call(colsbox, function (col) {
  console.log(col);

});

}


var colsbox = document.querySelectorAll('.source-box');

function addevents(){
var cols = document.querySelectorAll('.source');
console.log (cols);
[].forEach.call(cols, function(col) {
col.addEventListener('dragstart', handleDragStart, false);
//col.addEventListener('dragenter', handleDragEnter, false)
//col.addEventListener('dragover', handleDragOver, false);
//col.addEventListener('dragleave', handleDragLeave, false);
//col.addEventListener('drop', handleDrop, false);
col.addEventListener('dragend', handleDragEnd, false);
});

var colsbox = document.querySelectorAll('.source-box');
console.log (colsbox);
[].forEach.call(colsbox, function(col) {
col.addEventListener('dragenter', handleDragEnter, false)
col.addEventListener('dragover', handleDragOver, false);
col.addEventListener('dragleave', handleDragLeave, false);
col.addEventListener('drop', handleDrop, false);
col.addEventListener('dragend', handleDragEnd, false);
});
}
