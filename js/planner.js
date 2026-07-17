// Academic Planner
// Demonstrates: arrays & functions, event handling, DOM manipulation, dynamic content updates

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('task-form');
  var titleInput = document.getElementById('task-title');
  var courseInput = document.getElementById('task-course');
  var dueInput = document.getElementById('task-due');
  var list = document.getElementById('task-list');
  var emptyState = document.getElementById('empty-state');
  var statTotal = document.getElementById('stat-total');
  var statDone = document.getElementById('stat-done');
  var statPending = document.getElementById('stat-pending');

  // In-memory array of task objects — the single source of truth
  var tasks = [
    { id: 1, title: 'Finish COS 106 term project write-up', course: 'COS 106', due: '2026-07-20', done: false },
    { id: 2, title: 'Complete AWS cloud lab exercise', course: 'Cloud Computing', due: '2026-07-18', done: true },
    { id: 3, title: 'Clean biological dataset for analysis', course: 'Bioinformatics', due: '2026-07-22', done: false }
  ];

  var nextId = 4;

  function formatDate(dateStr) {
    if (!dateStr) return 'No due date';
    var d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return dateStr;
    var options = { month: 'short', day: 'numeric', year: 'numeric' };
    return d.toLocaleDateString('en-US', options);
  }

  function updateStats() {
    var total = tasks.length;
    var done = tasks.filter(function (t) { return t.done; }).length;
    statTotal.textContent = total;
    statDone.textContent = done;
    statPending.textContent = total - done;
  }

  function createTaskElement(task) {
    var li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' done' : '');
    li.dataset.id = task.id;

    var check = document.createElement('button');
    check.className = 'task-check';
    check.setAttribute('aria-label', 'Toggle task complete');
    check.addEventListener('click', function () { toggleTask(task.id); });

    var info = document.createElement('div');
    info.className = 'task-info';

    var titleEl = document.createElement('div');
    titleEl.className = 'task-title';
    titleEl.textContent = task.title;

    var metaEl = document.createElement('div');
    metaEl.className = 'task-meta';
    metaEl.textContent = (task.course || 'General') + ' · Due ' + formatDate(task.due);

    info.appendChild(titleEl);
    info.appendChild(metaEl);

    var del = document.createElement('button');
    del.className = 'task-delete';
    del.setAttribute('aria-label', 'Delete task');
    del.textContent = '✕';
    del.addEventListener('click', function () { deleteTask(task.id); });

    li.appendChild(check);
    li.appendChild(info);
    li.appendChild(del);
    return li;
  }

  function render() {
    list.innerHTML = '';

    if (tasks.length === 0) {
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
      var sorted = tasks.slice().sort(function (a, b) {
        if (a.done !== b.done) return a.done ? 1 : -1;
        return (a.due || '').localeCompare(b.due || '');
      });
      sorted.forEach(function (task) {
        list.appendChild(createTaskElement(task));
      });
    }
    updateStats();
  }

  function addTask(title, course, due) {
    tasks.push({ id: nextId++, title: title, course: course, due: due, done: false });
    render();
  }

  function toggleTask(id) {
    var task = tasks.find(function (t) { return t.id === id; });
    if (task) task.done = !task.done;
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter(function (t) { return t.id !== id; });
    render();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var title = titleInput.value.trim();
    if (!title) {
      titleInput.focus();
      return;
    }
    addTask(title, courseInput.value.trim(), dueInput.value);
    form.reset();
    titleInput.focus();
  });

  render();
});
