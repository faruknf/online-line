class Queue {
  constructor(size) {
    this.size = size;
    this.front = -1;
    this.rear = -1;
    // Todo : Use Linked list
    this.users = [];
  }
}

function isFull(queue) {
  // It is circular queue so check for queue.front == queue.rear +1
  if (
    (queue.front === 0 && queue.rear === queue.size - 1) ||
    queue.front === queue.rear + 1
  ) {
    return true;
  }
  return false;
}

function isEmpty(queue) {
  if (queue.front === -1) {
    return true;
  }
  return false;
}

function enqueue(queue, data) {
  if (isFull(queue)) {
    throw new Error('Queue is full');
  } else {
    if (queue.front === -1) {
      queue.front = 0;
    }
    // It is circular queue so ıt can be added the new item to front which is empty
    queue.rear = (queue.rear + 1) % queue.size;
    queue.users[queue.rear] = data;
    return queue.users[queue.rear];
  }
}

function dequeue(queue, data) {
  if (isEmpty(queue)) {
    throw new Error('Queue is empty');
  }
  if (queue.users[queue.rear] === data) {
    // ıt has a element
    if (queue.rear === queue.front) {
      queue.rear = -1;
      queue.front = -1;
    } else {
      queue.rear -= 1;
      if (queue.rear < 0) {
        queue.rear = queue.size - 1;
      }
    }
  } else if (queue.users[queue.front] === data) {
    queue.front = (queue.front + 1) % queue.size;
  } else {
    // if the element is between rear and front

    if (queue.users.indexOf(data) < queue.front) {
      queue.users.splice(queue.users.indexOf(data), 1);
      queue.users.splice(queue.rear, 0, undefined);
    } else {
      queue.users.splice(queue.users.indexOf(data), 1);
      queue.users.push(queue.users.shift());
      queue.users.splice(queue.rear, 0, undefined);
    }

    queue.rear -= 1;
    if (queue.rear < 0) {
      queue.rear = queue.size - 1;
    }
  }
}

function write(queue) {
  for (let i = queue.front; i !== queue.rear; i = (i + 1) % queue.size) {
    console.log(queue.users[i]);
  }
  console.log(queue.users[queue.rear]);
}

const queue = new Queue(5);

module.exports = { queue, dequeue, enqueue, write };
